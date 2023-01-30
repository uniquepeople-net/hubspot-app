<template>
	<Dialog v-model:visible="showMessage" :breakpoints="{ '960px': '80vw' }" :style="{ width: '30vw' }" position="top">
		<div class="flex align-items-center flex-column pt-6 px-3">
			<i v-if="response.error" class="pi pi-times-circle" :style="{fontSize: '4rem', color: 'var(--red-400)' }"></i>
			<i v-if="response.message" class="pi pi-check-circle" :style="{fontSize: '4rem', color: 'var(--green-400)' }"></i>
			<h5 v-if="response.message" class="mt-3">{{ response.message }}</h5>
			<h6 v-if="response.error" v-for="(error, index) in response.error" class="mt-3">{{ index + ': ' + error[0].replace('validation.', 'faulty ') }}</h6>
		</div>
		<template #footer>
			<div class="flex justify-content-center">
				<Button label="OK" @click="toggleDialog" class="p-button-text" />
			</div>
		</template>
	</Dialog>

	<AuthWrapper>
		<template v-slot:title>
			<h1 class="auth-title mb-4">Forgot Password</h1>
			<h5 class="text-secondary mb-5">Input your email and we will send you reset password link.</h5>
		</template>

		<template v-slot:body>
			<form action="index.html" @submit.prevent="handleSubmit(!v$.$invalid)" class="p-fluid">
				<div class="form-group position-relative has-icon-left mb-4 p-inputgroup mb-5 col-12">
					<InputIcon icon="pi pi-envelope"></InputIcon>
					<InputText id="email" v-model="v$.email.$model" :class="{'p-invalid':v$.email.$invalid && submitted}" aria-describedby="email-error"
								name="email" placeholder="Email"/>

					<InputError :validator="v$.email" :submitted="submitted" replace="Email"></InputError>
				</div>
				
				<div class="position-relative text-center mt-5">
					<Button type="submit" label="Submit" class=" submit-btn btn btn-primary btn-block btn-lg shadow-lg" />
					<div v-if="loading" class="spinner-grow position-absolute" role="status"></div>
				</div>

			</form>
		</template>

	</AuthWrapper>
</template>
 
 
<script>
	import { email, required } from "@vuelidate/validators";
	import { useVuelidate } from "@vuelidate/core";
	import AuthWrapper from './AuthWrapper.vue'

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
				email: { required, email }
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

				axios.post( reqPassForgetUrl, { email: this.email })
					.then(
						response => {
							this.loading = false
							this.response = response.data										
							this.toggleDialog();					
						}
					).catch( response => {
						this.loading = false
					})
			},
			toggleDialog() {
				this.showMessage = !this.showMessage;
			},
		},
		components: { AuthWrapper }
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