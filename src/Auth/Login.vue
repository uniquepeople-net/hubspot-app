<template>
	<Dialog v-model:visible="showMessage" :breakpoints="{ '960px': '80vw' }" :style="{ width: '30vw' }" position="top">
            <div class="flex align-items-center flex-column pt-6 px-3">
                <i class="pi pi-check-circle" :style="{fontSize: '5rem', color: 'var(--green-500)' }"></i>
                <h5>Registration Successful!</h5>
                <p :style="{lineHeight: 1.5, textIndent: '1rem'}">
                    Your account is registered under email: <b>{{email}}</b>.
                </p>
            </div>
            <template #footer>
                <div class="flex justify-content-center">
                    <Button label="OK" @click="toggleDialog" class="p-button-text" />
                </div>
            </template>
    </Dialog>

	<AuthWrapper>
		<template v-slot:title>
			<h1 class="auth-title">Log in.</h1>
			<p class="auth-subtitle mb-5">
				Log in with your data that you entered during registration.
			</p>
		</template>

		<template v-slot:body>
			<form action="index.html" @submit.prevent="handleSubmit(!v$.$invalid)" class="p-fluid">
				<div class="form-group position-relative has-icon-left mb-4 p-inputgroup mb-5 col-12">
					<InputIcon icon="pi pi-envelope"></InputIcon>
					<InputText id="email" v-model="v$.email.$model" :class="{'p-invalid':v$.email.$invalid && submitted}" aria-describedby="email-error"
								name="email" placeholder="Email"/>

					<InputError :validator="v$.email" :submitted="submitted" replace="Email"></InputError>
				</div>
				<div class="form-group position-relative has-icon-left mb-4 p-inputgroup mb-5 col-12">
					<InputIcon icon="pi pi-lock"></InputIcon>
					<Password id="password" v-model="v$.password.$model" :class="{'p-invalid':v$.password.$invalid && submitted}" toggleMask
								name="password" placeholder="Password">
					</Password>
	
					<InputError :validator="v$.password" :submitted="submitted" replace="Password"></InputError>
				</div>
				<div class="form-check form-check-lg d-flex align-items-end">
					<input class="form-check-input me-2" type="checkbox" value="" id="flexCheckDefault" />
					<label class="form-check-label text-gray-600" for="flexCheckDefault">
						Keep me logged in
					</label>
				</div>
				<Button type="submit" label="Submit" class="mt-2 submit-btn btn btn-primary btn-block btn-lg shadow-lg mt-5" />
			</form>
			<div class="text-center mt-5 text-lg fs-4">
				<p class="text-gray-600">
					Don't have an account?
					<a href="auth-register.html" class="font-bold">Sign up</a>.
				</p>
				<p>
					<a class="font-bold" href="auth-forgot-password.html">Forgot password?</a>.
				</p>
			</div>
		</template>

	</AuthWrapper>
</template>
 
 
<script>
import { email, required, sameAs, minLength, numeric } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";

import AuthWrapper from '../Auth/AuthWrapper.vue';

export default {
	setup: () => ({ v$: useVuelidate() }),
    data() {
        return {            
            email: '',			
            password: '',
			submitted: false,
            showMessage: false,
        }
    },
    validations() {
        return {
            email: { required, email },
            password: { required,  minLength: minLength(8)},
        }
    },

    methods: {
        handleSubmit(isFormValid) {
            this.submitted = true;

            if (!isFormValid) {
                return;
            }

			axios.post( 'http://localhost:80/api/login', { 
								email: this.email,
								password: this.password,
										  
						}).then(
							response => {
								this.toggleDialog();
								console.log(response.data)
								
							}
						)
        },
        toggleDialog() {
            this.showMessage = !this.showMessage;
        
            if(!this.showMessage) {
                this.resetForm();
            }
        },
        resetForm() {
            this.email = '';
            this.password = '';
            this.submitted = false;
        }
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
.p-togglebutton {
	background-color: #DC2626;
	&:not(.p-disabled):not(.p-highlight):hover {
		background-color: #DC2626;
	}
	&.p-highlight {
		background-color: #16A34A;
		&:hover {
			background-color: #16A34A;
		}
	}
}
.submit-btn {
	max-width: 25rem;
}

</style>