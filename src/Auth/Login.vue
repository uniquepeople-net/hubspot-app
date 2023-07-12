<template>
	<div>
		<CustomDialog :visible="showMessage" :response="response" @hideDialog="hideDialog"/>
	
		<AuthWrapper>
			<template v-slot:title>
				<h1 class="auth-title mb-5">{{ $t('message.Login') }}</h1>
			</template>
	
			<template v-slot:body>
				<form @submit.prevent="handleSubmit(!v$.$invalid)" class="p-fluid">
					<div class="row">
						<div class="mb-4 p-inputgroup mb-5 col-12">
							<span class="p-float-label w-100">
								<InputText id="email" v-model="v$.email.$model" :class="{'p-invalid':v$.email.$invalid && submitted}" aria-describedby="email-error"
											name="email" placeholder="Email"/>
			
								<label for="email">Email</label>
							</span>
							<InputError :validator="v$.email" :submitted="submitted" replace="Email"></InputError>
						</div>
						<div class="mb-4 p-inputgroup mb-5 col-12">
							<span class="p-float-label w-100">
								<Password id="password" v-model="v$.password.$model" :class="{'p-invalid':v$.password.$invalid && submitted}" toggleMask
											name="password" :placeholder="$t('message.Password')" :feedback="false">
								</Password>
								<label for="password">{{$t('message.Password')}}</label>
							</span>
			
							<InputError :validator="v$.password" :submitted="submitted" :replace="$t('message.Password')"></InputError>
						</div>
					</div>
					<div class="position-relative text-center mt-5">
						<Button type="submit" :label="$t('message.LoginV')" class="submit-btn btn btn-primary btn-block btn-lg btn-border" :loading="loading"/>
					</div>
				</form>
				<div class="mt-4 center-center flex-column">
					<span class="registered-text mb-3">{{ $t('message.Notregistered') + '?' }}</span>
					<Button :label="$t('message.Create') + ' ' +  $t('message.Account')" 
							@click="redirectRegister" class="btn-black"/>
				</div>
			</template>
	
			<template v-slot:footer>
				<div class="text-center mt-5 text-lg fs-4">
					<Button :label="$t('message.ForgotPassword') + ' ?'" 
							class="font-bold p-button-raised p-button-secondary p-button-text"
							@click="redirectForgot"></Button>
				</div>
			</template>	
		</AuthWrapper>
	</div>
</template>
 
 
<script>
import { sameAs, numeric } from "@vuelidate/validators";
import { required, email, minLength } from "../plugins/vuelidate-i18n";
import { useVuelidate } from "@vuelidate/core";
import CustomDialog from '../Dashboard/global/CustomDialog.vue'
import AuthWrapper from '../Auth/AuthWrapper.vue';

export default {
	setup: () => ({ v$: useVuelidate() }),
    data() {
        return {            
            email: '',			
            password: '',
			submitted: false,
            showMessage: false,
			response: {},
			loading: false
        }
    },
    validations() {
        return {
            email: { required, email },
            password: { required, minLength: minLength(8)},
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

			let apiGwloginUrl = this.$store.getters['links/loginApiGwUrl'];

			axios.post( apiGwloginUrl , { 
							email: this.email,
							password: this.password,										  
				}).then(
					response => {									
						this.toggleDialog();
						this.loading = false
						let data = response.data
						this.response = data

						if ( data.authorisation ) {
							User.responseAfterLogin(data.authorisation.token)
							Toast.fire({
								icon: 'success',
								title: 'Signed in successfully'
							})
							//this.$router.go(-1)
							this.$router.push('/');							
						}
					}
				).catch( error => {
					this.loading = false
					if ( error.response.status >= 400 && error.response.status < 500 ) {
						this.toggleDialog();
						let data = error.response.data
						this.response = data
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
            this.showMessage = !this.showMessage;
        
            if(!this.showMessage) {
                //this.resetForm();
            }
        },
        resetForm() {
            this.email = '';
            this.password = '';
            this.submitted = false;
        },
		redirectForgot() {
			this.$router.push({name: 'forgot'})
		},
		redirectRegister() {
			this.$router.push({name: 'register'})
		}
    },
	components: { AuthWrapper, CustomDialog }
}
</script>
 
 
<style lang='scss' scoped>
.p-inputgroup {
	position: relative;
	& span.error-msg {
		position: absolute;
		top: 100%;
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
.spinner-grow {
	top: 0;
	bottom: 0;
	margin: auto;
	margin-left: .5rem;
}
.registered-text {
	font-size: .8rem;
}

</style>