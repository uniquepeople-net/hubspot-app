<template>
	<div>
		<Dialog v-model:visible="showMessage" :breakpoints="{ '960px': '80vw' }" :style="{ width: '30vw' }" position="top">
			<div class="flex align-items-center flex-column pt-6 px-3">
				<i v-if="response.error" class="pi pi-times-circle" :style="{fontSize: '4rem', color: 'var(--red-400)' }"></i>
				<i v-if="response.message" class="pi pi-check-circle" :style="{fontSize: '4rem', color: 'var(--green-400)' }"></i>
				<h5 v-if="response.message" class="mt-3">{{ response.message }}</h5>
				<h6 v-if="response.error" v-for="(error, index) in response.error" class="mt-3">
					{{ error[0].replace('validation.', 'faulty ') }}
				</h6>
			</div>
			<template #footer>
				<div class="flex justify-content-center">
					<Button label="OK" @click="toggleDialog" class="font-bold p-button-raised p-button-secondary p-button-text" />
				</div>
			</template>
		</Dialog>
	
		

		<AuthWrapper>
			<template v-slot:title>
				<h1 class="auth-title mb-4">{{ $t('message.ForgotPassword') }}</h1>
				<h5 class="text-secondary mb-5">{{ $t('message.ForgotPasswordNotice')}}</h5>
			</template>
	
			<template v-slot:body>
				<form action="index.html" @submit.prevent="handleSubmit(!v$.$invalid)" class="p-fluid">
					<div class="form-group position-relative has-icon-left mb-4 p-inputgroup mb-5 col-12">
						<!-- <InputIcon icon="pi pi-envelope"></InputIcon> -->
						<InputText id="email" v-model="v$.email.$model" :class="{'p-invalid':v$.email.$invalid && submitted}" aria-describedby="email-error"
									name="email" placeholder="Email"/>
	
						<InputError :validator="v$.email" :submitted="submitted" replace="Email"></InputError>
					</div>
					
					<div class="position-relative text-center mt-5">
						<Button type="submit" :label="$t('message.Submit')" :loading="loading" class="submit-btn btn btn-primary btn-block btn-lg btn-black" />
					</div>
				</form>
			</template>
		</AuthWrapper>
	</div>
</template>
 
 
<script>
	//import { email, required, helpers } from "@vuelidate/validators";
	import { required, email, minLength } from "../plugins/vuelidate-i18n";
	import { useVuelidate } from "@vuelidate/core";
	import AuthWrapper from './AuthWrapper.vue'
	import BackButton from '../Dashboard/global/BackButton.vue';

	export default {
		setup: () => ({ v$: useVuelidate() }),
		data() {
			return {
				email: '',
				submitted: false,
				showMessage: false,
				loading: false,
				response: null
			}
		},
		validations() {
			return {
				email: { 
					required/* : helpers.withMessage( this.$t('message.EmailRequired'), required ), */ ,
					email/* : helpers.withMessage( this.$t('message.EmailNotValid'), email ) */
				}
			}
		},
		methods: {
			handleSubmit(isFormValid) {
				this.submitted = true;

				if (!isFormValid) {
					return;
				}

				this.loading = true

				let reqPassForgetUrl = this.$store.getters['links/reqPassForget'];

				let data = {
					email: this.email, 
					url: window.location.origin + '/' + this.$i18n.locale
				}

				axios.post( reqPassForgetUrl, data )
					.then( response => {
							this.loading = false
							this.response = response.data										
							this.toggleDialog();					
					})
					.catch( error => {						
						this.loading = false
						
						if ( error.response.status >= 400 && error.response.status < 500 ) {
							this.response = error.response.data
							this.toggleDialog();
						} else {
							Toast.fire({
								icon: 'error',
								timer: 7000,
								title: 'Server error, try again later'
							}) 
						}
					})
			},
			toggleDialog() {
				//this.$router.go(-1);	
				this.showMessage = !this.showMessage;
			},
		},
		components: { AuthWrapper, BackButton }
	}
</script>
 
 
<style lang='scss' scoped>
.p-inputgroup {
	position: relative;
	& span.error-msg {
		position: absolute;
		bottom: -60%;
	}
	& > .p-button {
		border-radius: 0 4px 4px 0;
	} 
}
.spinner-grow {
	top: 0;
	bottom: 0;
	margin: auto;
	margin-left: .5rem;
}
</style>