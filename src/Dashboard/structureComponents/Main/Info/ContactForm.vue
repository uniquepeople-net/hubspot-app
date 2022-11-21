<template>

	<Dialog v-model:visible="showMessage" :breakpoints="{ '960px': '80vw' }" :style="{ width: '30vw' }" position="top">
		<div class="flex align-items-center flex-column pt-6 px-3">
			<i v-if="emailResponse" class="pi pi-check-circle" :style="{fontSize: '4rem', color: 'var(--green-400)' }"></i>	
			<h5 v-if="emailResponse" class="mt-3">{{ emailResponse }}</h5>
		</div>
		<template #footer>
			<div class="flex justify-content-center">
				<Button label="OK" @click="toggleDialog" class="p-button-text" />
			</div>
		</template>
	</Dialog>

	<Card class="card">
		<template #content>
			<div class="card-body">
				<form @submit.prevent="handleSubmit(!v$.$invalid)" class="p-fluid">

					<div class="row">
						<div class="inputgroup mb-5 col-12">
							<InputIcon icon="pi pi-user"></InputIcon>
							<InputText id="name" name="name" :placeholder="user.name" disabled/>
						</div>
	
						<div class="inputgroup mb-5 col-12">
							<InputIcon icon="pi pi-envelope"></InputIcon>
							<InputText id="email" name="email" :placeholder="user.email" disabled/>
						</div>

						<div class="mb-5 col-12">
							<Textarea :autoResize="true" rows="5" cols="30" v-model="v$.textArea.$model" 
									  :class="{'p-invalid':v$.textArea.$invalid && submitted}"/>
							<InputError :validator="v$.textArea" :submitted="submitted" replace="Text"></InputError>
						</div>

						<div class="select-rec mb-5 col-12">
							<h5 class="me-3">To: </h5>
							<Dropdown v-model="v$.selectedRecipient.$model" :options="recipients" :class="{'p-invalid':v$.selectedRecipient.$invalid && submitted}"
									  optionLabel="name" optionValue="code" placeholder="Select a Recipient" />
							<InputError :validator="v$.selectedRecipient" :submitted="submitted" replace="Recipient"></InputError>
						</div>
					</div>

					<div class="send-email">
						<Button type="submit" label="Send Email" class="mt-2 submit-btn" :disabled="disabledBtn"/>
						<div v-if="spinner" class="spinner-grow" style="width: 3rem; height: 3rem;" role="status"></div>						
					</div>

				</form>
			</div>
		</template>
	</Card>
</template>
 
 
<script>
	import { required, minLength } from "@vuelidate/validators";
	import { useVuelidate } from "@vuelidate/core";
	import { mapGetters } from 'vuex'; 

	export default {
		setup: () => ({ v$: useVuelidate() }),
		data() {
			return {
				textArea: '',
				selectedRecipient: null,
				recipients: [
					{name: 'UFP advisor', code: 'Miroslav.Viazanko@uniquepeople.net'},
					{name: 'UFP Law advise', code: 'viazanko@pobox.sk'},
					{name: 'Technical Support', code: 'viazanko.uniquepeople@gmail.com'},
				],
				submitted: false,
				disabledBtn: false,
				spinner: false,
				showMessage: false
			}
		},
		validations() {
			return {
				textArea: { required, minLength: minLength(3) },
				selectedRecipient: { required }
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
					name: this.user.name,
					text: this.textArea,
					email: this.user.email,
					recipient: this.selectedRecipient
				}

				this.$store.dispatch("emails/sendEmail", data);
				
				
			},
			toggleDialog() {
				this.showMessage = !this.showMessage;
			
				if(!this.showMessage) {
					this.resetForm();
				}
			},
			resetForm() {
				this.textArea = '';
				this.selectedRecipient = null;
			},
		},
		computed: {
			...mapGetters({ user: 'user/user',
							emailResponse: 'emails/response' }),
		},
		watch: {
			emailResponse: function(data) {
				if ( data ) {
					this.disabledBtn = false
					this.spinner = false
					this.toggleDialog()
				}
			}
		}
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
	.submit-btn {
		background-color: var(--green-600);
		border: 1px solid var(--green-700);
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