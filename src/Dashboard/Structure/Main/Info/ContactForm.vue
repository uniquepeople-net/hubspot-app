<template>
	<div>
		<Dialog v-model:visible="showMessage" :breakpoints="{ '960px': '80vw' }" :style="{ width: '30vw' }" position="top">
			<div class="flex align-items-center flex-column pt-6 px-3">
				<i v-if="emailResponse.message" class="pi pi-check-circle" :style="{fontSize: '4rem', color: 'var(--green-400)' }"></i>	
				<i v-if="emailResponse.error" class="pi pi-times-circle" :style="{fontSize: '4rem', color: 'var(--red-400)' }"></i>	
				<h5 v-if="emailResponse.error" v-for="error in emailResponse.error" class="mt-3">{{ error[0] }}</h5>
				<h5 v-if="emailResponse.message" class="mt-3">{{ emailResponse.message }}</h5>
			</div>
			<template #footer>
				<div class="flex justify-content-center">
					<Button label="OK" @click="toggleDialog" class="p-button-text" />
				</div>
			</template>
		</Dialog>
	
		<Card class="card m-auto">
			<template #content>
				<div class="card-body">
					<form @submit.prevent="handleSubmit(!v$.$invalid)" class="p-fluid">
	
						<div class="row">
							<div class="inputgroup mb-5 col-12" v-if="!anonymous">
								<InputText id="name" name="name" :placeholder="user.name + ' ' + user.surname" disabled/>
							</div>
		
							<div class="inputgroup mb-5 col-12" v-if="!anonymous">
								<InputText id="email" name="email" :placeholder="user.email" disabled/>
							</div>
	
							<div class="mb-5 col-12">
								<Textarea :autoResize="true" rows="5" cols="30" v-model="v$.textArea.$model" 
										  :class="{'p-invalid':v$.textArea.$invalid && submitted}" :placeholder="$t('message.Insertmessage')"/>
								<InputError :validator="v$.textArea" :submitted="submitted" replace="Text"></InputError>
							</div>
	
							<div class="select-rec mb-4 col-12" v-if="recipients">
								<h5 class="me-3">{{ $t('message.To') + ':' }}</h5>
								<Dropdown v-model="v$.selectedRecipient.$model" :options="recipients" :class="{'p-invalid':v$.selectedRecipient.$invalid && submitted}"
										  optionLabel="title" optionValue="email" :placeholder="$t('message.SelectRecipient')" />
								<InputError :validator="v$.selectedRecipient" :submitted="submitted" replace="Recipient"></InputError>
							</div>
						</div>

						<div class="mb-3 d-flex align-items-center cf-checkbox">
							<Checkbox v-model="anonymous" id="anonymous"  name="anonymous" :binary="true" :value="$t('message.SendAnonymously')"/>
							<label for="anonymous" class="ms-2">{{ $t('message.SendAnonymously') }}</label>
						</div>
						<p class="text-sm-notice">{{ $t('message.AnonymousNotice') }}</p>

						<div class="send-email">
							<Button type="submit" :label="$t('message.SendEmail')" class="mt-2 submit-btn btn-black" 
									:disabled="disabledBtn" :loading="spinner"/>
						</div>
	
					</form>
				</div>
			</template>
		</Card>
	</div>
</template>
 
 
<script>
	//import { required, email, minLength, maxLength } from "@vuelidate/validators";
	import { required, email, minLength, maxLength } from "../../../../plugins/vuelidate-i18n";
	import { useVuelidate } from "@vuelidate/core";
	import { mapGetters } from 'vuex'; 
	import Checkbox from 'primevue/checkbox';

	export default {
		created() {
			this.$store.dispatch("emailsSet/getEmailsSet");
		},
		setup: () => ({ v$: useVuelidate() }),
		data() {
			return {
				textArea: '',
				selectedRecipient: null,
				submitted: false,
				disabledBtn: false,
				spinner: false,
				showMessage: false,
				anonymous: false
			}
		},
		validations() {
			return {
				textArea: { required, minLength: minLength(3), maxLength: maxLength(1000) },
				selectedRecipient: { required, email }
			}
		},
		methods: {
			handleSubmit(isFormValid) {
				this.submitted = true;
				
				if (!isFormValid) {
					return;
				}

				this.disabledBtn = true;
				this.spinner = true;

				let data = {
					name: this.anonymous ? 'Anonymous' : this.user.name + ' ' + this.user.surname,
					body: this.textArea,
					email: this.anonymous ? null : this.user.email,
					fromUserId: this.anonymous ? null : this.user.id,
					recipient: this.selectedRecipient,
					recipientData: this.getName()
				}

				this.$store.dispatch("emails/sendEmail", data);				
			},
			toggleDialog() {
				this.showMessage = !this.showMessage;
			
				if(!this.showMessage) {
					this.resetForm();
					this.submitted = false;
				}
			},
			resetForm() {
				this.textArea = '';
				this.selectedRecipient = null;
			},
			getName() {
				let selected = this.recipients.filter( rec => rec.email === this.selectedRecipient )
				return selected[0]
			},
		},
		computed: {
			...mapGetters({ user: 'user/user',
							emailResponse: 'emails/response',
							emails: 'emailsSet/emails' }),
			recipients() {
				return this.emails ? this.emails.filter( r => r.contact === true) : []
			}
		},
		watch: {
			emailResponse: function(data) {
				if ( data ) {
					this.disabledBtn = false
					this.spinner = false
					this.toggleDialog()
				}
			}
		},
		components: { Checkbox }
	}
</script>
 
 
<style lang='scss' scoped>
.card {
	max-width: 768px;
	.inputgroup {
		display: flex;
		:deep(.p-inputtext), :deep(.p-dropdown) {
			border-radius: 0 6px 6px 0;
		}
	}
	::slotted(.select-rec) {
		display: flex;
		align-items: center;
		position: relative;
		:deep(.p-dropdown) {
			width: 100%;
		}
		:deep(.p-error) {
			position: absolute;
			bottom: -50%;
		}
	}
	:deep(.p-checkbox-box.p-highlight), :deep(.p-checkbox-box.p-highlight):hover {
			background: var(--main-dark);
			border-color: var(--main-dark);
	}
	:deep(.p-checkbox-box):hover, :deep(.p-checkbox-focused), :deep(.p-focus) {
		border-color: var(--main-dark);
		box-shadow: var(--card-shadow) 0px 3px 3px; 
	}
	
	.send-email {
		position: relative;
		.spinner-grow {
			position: absolute;
			right: 1rem;
			bottom: 1px;
		}
	}
}
</style>