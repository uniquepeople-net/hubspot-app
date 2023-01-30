<template>
	<Dialog v-if="error" v-model:visible="showMessage" :breakpoints="{ '960px': '80vw' }" :style="{ width: '30vw' }" position="top">
            <div class="flex align-items-center flex-column pt-6 px-3">
                <i class="pi pi-times-circle" :style="{fontSize: '4rem', color: 'var(--red-400)' }"></i>
                <h5 class="mt-3">{{ error }}</h5>

            </div>
            <template #footer>
                <div class="flex justify-content-center">
                    <Button label="OK" @click="toggleDialog" class="p-button-text" />
                </div>
            </template>
    </Dialog>
	

	<AuthWrapper>
		<template v-slot:title>
			<h1 class="auth-title mb-4">Log in</h1>
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
								name="password" placeholder="Password" :feedback="false">
					</Password>
	
					<InputError :validator="v$.password" :submitted="submitted" replace="Password"></InputError>
				</div>
				<!-- <div class="form-check form-check-lg d-flex align-items-end">
					<input class="form-check-input me-2" type="checkbox" value="" id="flexCheckDefault" />
					<label class="form-check-label text-gray-600" for="flexCheckDefault">
						Keep me logged in
					</label>
				</div> -->
				<div class="position-relative text-center mt-5">
					<Button type="submit" label="Submit" class=" submit-btn btn btn-primary btn-block btn-lg shadow-lg" />
					<div v-if="loading" class="spinner-grow position-absolute" role="status"></div>
				</div>
			</form>
			<div class="text-center mt-5 text-lg fs-4">
				<Button label="Forgot password ?" 
						class="font-bold p-button-raised p-button-secondary p-button-text"
						@click="redirectForgot"></Button>
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
			error: null,
			loading: false
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
			this.loading = true

			let apiGwloginUrl = this.$store.getters['links/loginApiGwUrl'];

			axios.post( apiGwloginUrl , { 
							email: this.email,
							password: this.password,										  
			}).then(
				response => {										
					this.toggleDialog();
					this.loading = false
					let data = response.data
					this.error = response.data.message

					if ( data.authorisation ) {
						User.responseAfterLogin(data.authorisation.token)
						Toast.fire({
							icon: 'success',
							title: 'Signed in successfully'
						})
						this.$router.push('/');							
					}
				}
			).catch( error => {
				this.loading = false
				Toast.fire({
					icon: 'error',
					title: 'Something is wrong, try again later'
				})
				this.$router.push({ name: 'login' })
			})
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
        },
		redirectForgot() {
			this.$router.push({name: 'forgot'})
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
/* .p-togglebutton {
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
} */
.submit-btn {
	max-width: 25rem;
}
.spinner-grow {
	top: 0;
	bottom: 0;
	margin: auto;
	margin-left: .5rem;
}
</style>