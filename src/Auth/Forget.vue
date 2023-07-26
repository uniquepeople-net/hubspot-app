<template>
	<div>	
		<CustomDialog :visible="showMessage" :response="response" @hideDialog="hideDialog"/>

		<AuthWrapper>
			<template v-slot:title>
				<h1 class="auth-title mb-4">{{ $t('message.ForgotPassword') }}</h1>
				<h5 class="text-secondary mb-5">{{ $t('message.ForgotPasswordNotice')}}</h5>
			</template>
	
			<template v-slot:body>
				<form action="index.html" @submit.prevent="handleSubmit(!v$.$invalid)" class="p-fluid">
					<div class="form-group position-relative has-icon-left mb-4 p-inputgroup mb-5 col-12">
						<!-- <InputIcon icon="pi pi-envelope"></InputIcon> -->
						<span class="p-float-label w-100">
							<InputText id="email" v-model="v$.email.$model" :class="{'p-invalid':v$.email.$invalid && submitted}" aria-describedby="email-error"
									name="email" placeholder="Email"/>
							<label for="email">Email</label>
						</span>
	
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
	import { required, email, minLength } from "../plugins/vuelidate-i18n";
	import { useVuelidate } from "@vuelidate/core";
	import AuthWrapper from './AuthWrapper.vue'
	import BackButton from '../Dashboard/global/BackButton.vue'
	import CustomDialog from '../Dashboard/global/CustomDialog.vue'

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
			hideDialog() {
				this.showMessage = false
			},
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
								timer: 5000,
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
		components: { AuthWrapper, BackButton, CustomDialog }
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