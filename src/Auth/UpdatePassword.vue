<template>
	<Dialog v-model:visible="showMessage" :breakpoints="{ '960px': '80vw' }" :style="{ width: '30vw' }" position="top">
		<div class="flex align-items-center flex-column pt-6 px-3">
			<i v-if="response.error" class="pi pi-times-circle" :style="{fontSize: '4rem', color: 'var(--red-400)' }"></i>
			<i v-if="response.message" class="pi pi-check-circle" :style="{fontSize: '4rem', color: 'var(--green-400)' }"></i>
			<h5 v-if="response.message" class="mt-3">{{ response.message }}</h5>
			<h6 v-if="response.error" class="mt-3">{{ response.error}}</h6>
		</div>
		<template #footer>
			<div class="flex justify-content-center">
				<Button label="OK" @click="dialogBtn" class="p-button-text" />
			</div>
		</template>
	</Dialog>
	

	<AuthWrapper>
		<template v-slot:title>
			<h1 class="auth-title mb-4">{{ $t('message.UpdatePassword')}}</h1>
		</template>

		<template v-slot:body>
			<form action="index.html" @submit.prevent="handleSubmit(!v$.$invalid)" class="p-fluid">
				<div class="inputgroup position-relative has-icon-left mb-4 p-inputgroup mb-5 col-12">
					<InputIcon icon="pi pi-envelope"></InputIcon>
					<InputText id="email" v-model="v$.email.$model" :class="{'p-invalid':v$.email.$invalid && submitted}" aria-describedby="email-error"
								name="email" placeholder="Email"/>

					<InputError :validator="v$.email" :submitted="submitted" replace="Email"></InputError>
				</div>
				<div class="inputgroup mb-5 col-12 col-lg-6">
					<InputIcon icon="pi pi-lock"></InputIcon>
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
	
					<InputError :validator="v$.password" :submitted="submitted" replace="New Password"></InputError>
				</div>
					
				<div class="inputgroup mb-5 col-12 col-lg-6">
					<InputIcon icon="pi pi-lock"></InputIcon>
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
	
					<InputError :validator="v$.password_confirmation" :submitted="submitted" replace="Password Confirmation"></InputError>
				</div>
				
				<div class="position-relative text-center mt-5">
					<Button type="submit" :label="$t('message.Update') + ' ' +  $t('message.password')" :loading="loading" class=" submit-btn btn btn-primary btn-block btn-lg shadow-lg" />
					<!-- <div v-if="loading" class="spinner-grow position-absolute" role="status"></div> -->
				</div>
			</form>
			
		</template>

	</AuthWrapper>
</template>
 
 
<script>
//import { sameAs } from "@vuelidate/validators";
import { sameAs, required, email, minLength } from "../plugins/vuelidate-i18n";
import { useVuelidate } from "@vuelidate/core";

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
	components: { AuthWrapper }
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
	:deep(.p-inputtext), :deep(.p-dropdown) {
		border-radius: 0 6px 6px 0;
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