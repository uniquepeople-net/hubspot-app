<template>
	<div>
		<CustomDialog :visible="showMessage" :response="response" @hideDialog="hideDialog"/>
	
		<AuthWrapper>
			<template v-slot:title>
				<h1 class="auth-title mb-5">{{ $t('message.UpdatePassword')}}</h1>
			</template>
	
			<template v-slot:body>
				<form action="index.html" @submit.prevent="handleSubmit(!v$.$invalid)" class="p-fluid">
					<div class="inputgroup position-relative has-icon-left mb-4 p-inputgroup mb-5 col-12">
						<!-- <InputIcon icon="pi pi-envelope"></InputIcon> -->
						<span class="p-float-label w-100">
							<InputText id="email" v-model="v$.email.$model" :class="{'p-invalid':v$.email.$invalid && submitted}" aria-describedby="email-error"
										name="email" placeholder="Email"/>
							<label for="email">Email</label>
						</span>
	
						<InputError :validator="v$.email" :submitted="submitted" replace="Email"></InputError>
					</div>
					<div class="inputgroup mb-5 col-12 col-lg-6">
						<!-- <InputIcon icon="pi pi-lock"></InputIcon> -->
						<span class="p-float-label w-100">
							<Password id="password" v-model="v$.password.$model" :class="{'p-invalid':v$.password.$invalid && submitted}" toggleMask
									name="password" :placeholder="$t('message.NewPassword')">
								<template #header>
									<h6>{{ $t('message.PickAPassword') }}</h6>
								</template>
								<template #footer="sp">
									{{sp.level}}
									<PasswordSuggestions></PasswordSuggestions>
								</template>
							</Password>
							<label for="password">{{$t('message.Newe') + ' ' + $t('message.Password')}}</label>						
						</span>
		
						<InputError :validator="v$.password" :submitted="submitted" replace="New Password"></InputError>
					</div>
						
					<div class="inputgroup mb-5 col-12 col-lg-6">
						<!-- <InputIcon icon="pi pi-lock"></InputIcon> -->
						<span class="p-float-label w-100">
							<Password id="password_confirmation" v-model="v$.password_confirmation.$model" :class="{'p-invalid':v$.password_confirmation.$invalid && submitted}" toggleMask
									name="password_confirmation" :placeholder="$t('message.ConfirmNewPassword')">
								<template #header>
									<h6>{{$t('message.PickAPassword')}}</h6>
								</template>
								<template #footer="sp">
									{{sp.level}}
									<PasswordSuggestions></PasswordSuggestions>
								</template>
							</Password>
							<label for="password_confirmation">{{$t('message.Confirm') + ' ' + $t('message.Newe')  + ' ' + $t('message.Password')}}</label>
						</span>
		
						<InputError :validator="v$.password_confirmation" :submitted="submitted" replace="Password Confirmation"></InputError>
					</div>
					
					<div class="position-relative text-center mt-5">
						<Button type="submit" :label="$t('message.Update') + ' ' +  $t('message.password')" :loading="loading" class="submit-btn btn btn-primary btn-block btn-lg shadow-lg btn-black" />
						<!-- <div v-if="loading" class="spinner-grow position-absolute" role="status"></div> -->
					</div>
				</form>
				
			</template>
	
		</AuthWrapper>
	</div>
</template>
 
 
<script>
//import { sameAs } from "@vuelidate/validators";
import { sameAs, required, email, minLength } from "../plugins/vuelidate-i18n";
import { useVuelidate } from "@vuelidate/core";
import CustomDialog from '../Dashboard/global/CustomDialog.vue';
import AuthWrapper from '../Auth/AuthWrapper.vue';

export default {
	setup: () => ({ v$: useVuelidate() }),
    data() {
        return {            
            email: this.$route.query.email,			
            password: '',
			password_confirmation: '',
			passwordToken: this.$route.query.token,
			submitted: false,
            showMessage: false,
			response: null,
			loading: false
        }
    },
    validations() {
        return {
            email: { required, email },
           	password: { required,  minLength: minLength(8)},
			password_confirmation: { required,  minLength: minLength(8), sameAs: sameAs(this.password)},
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

			let updatePasswordUrl = this.$store.getters['links/updatePassword'];

			let data = {
				email: this.email,
				password: this.password,
				password_confirmation: this.password_confirmation,
				passwordToken: this.passwordToken
			}

			axios.post( updatePasswordUrl , data )
				.then(
					response => {
						this.response = response.data																
						this.toggleDialog();
						this.loading = false
					}
				).catch( error => {
					console.log(error)
					this.toggleDialog();
					this.response = error.response.data
					this.loading = false
					Toast.fire({
						icon: 'error',
						title: 'Something is wrong, try again later'
					})
				})
        },
        toggleDialog() {
            this.showMessage = !this.showMessage;
        },
		dialogBtn() {
			this.showMessage = !this.showMessage;
			if ( this.response.message ) {
				this.$router.push({ name: 'login' })
			}
		}
    },
	components: { AuthWrapper, CustomDialog }
}
</script>
 
 
<style lang='scss' scoped>
.inputgroup {
	position: relative;
	display: flex;
	width: 100%;
	& span.error-msg {
		position: absolute;
		bottom: -60%;
	}
}
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