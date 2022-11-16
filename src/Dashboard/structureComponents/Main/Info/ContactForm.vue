<template>
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

					<div>
						<Button type="submit" label="Send Email" class="mt-2 submit-btn" :disabled="disabledBtn"/>
						<div v-if="spinner" class="spinner-grow" style="width: 3rem; height: 3rem;" role="status"></div>
						<p v-if="emailResponse">{{ emailResponse }}</p>
						
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
				spinner: false
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

				//this.registerUser( this.registersApiGwUrl, data )
				
				//console.log(data)

				this.$store.dispatch("emails/sendEmail", data);

				/* axios.post( 'http://localhost:80/api/send-form-email', data)
					.then( response => console.log(response)) */
				
				//this.resetForm();

							
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
				console.log()
				if ( data ) {
					this.disabledBtn = false
					this.spinner = false
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
	.select-rec {
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
}
</style>