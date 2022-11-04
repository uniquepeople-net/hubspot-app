<template>
	<Card class="card">
		<template #title>
			<div class="card-header"><h5>Change Password</h5></div>
		</template>
		<template #content>
			<div class="card-body">
				<form @submit.prevent="handleSubmit(!v$.$invalid)" class="p-fluid">
				
					<div class="inputgroup mb-5 col-12 col-lg-6">
						<InputIcon icon="pi pi-lock"></InputIcon>
						<Password id="old_password" v-model="v$.old_password.$model" :class="{'p-invalid':v$.old_password.$invalid && submitted}" toggleMask
								name="old_password" placeholder="Old Password" :feedback="false">
						</Password>
		
						<InputError :validator="v$.old_password" :submitted="submitted" replace="Old Password"></InputError>
					</div>
						
					<div class="inputgroup mb-5 col-12 col-lg-6">
						<InputIcon icon="pi pi-lock"></InputIcon>
						<Password id="new_password" v-model="v$.new_password.$model" :class="{'p-invalid':v$.new_password.$invalid && submitted}" toggleMask
								name="new_password" placeholder="New Password">
							<template #header>
								<h6>Pick a password</h6>
							</template>
							<template #footer="sp">
								{{sp.level}}
								<PasswordSuggestions></PasswordSuggestions>
							</template>
						</Password>
		
						<InputError :validator="v$.new_password" :submitted="submitted" replace="New Password"></InputError>
					</div>
					
					<div class="inputgroup mb-5 col-12 col-lg-6">
						<InputIcon icon="pi pi-lock"></InputIcon>
						<Password id="password_confirmation" v-model="v$.password_confirmation.$model" :class="{'p-invalid':v$.password_confirmation.$invalid && submitted}" toggleMask
								name="password_confirmation" placeholder="Confirm New Password">
							<template #header>
								<h6>Pick a password</h6>
							</template>
							<template #footer="sp">
								{{sp.level}}
								<PasswordSuggestions></PasswordSuggestions>
							</template>
						</Password>
		
						<InputError :validator="v$.password_confirmation" :submitted="submitted" replace="Password Confirmation"></InputError>
					</div>
				
					<Button type="submit" label="Change Password" class="mt-2 submit-btn" />

				</form>
			</div>
		</template>
	</Card>
</template>
 
 
<script>
	import { required, sameAs, minLength } from "@vuelidate/validators";
	import { useVuelidate } from "@vuelidate/core";

	export default {
		setup: () => ({ v$: useVuelidate() }),
		data() {
			return {
				old_password: '',
				new_password: '',
				password_confirmation: '',
				submitted: false,
				id:  this.$route.params.user_id
			}
		},
		validations() {
			return {
				old_password: { required,  minLength: minLength(8)},
				new_password: { required,  minLength: minLength(8)},
				password_confirmation: { required,  minLength: minLength(8), sameAs: sameAs(this.new_password)},
			}
		},
		methods: {
			 handleSubmit(isFormValid) {
				this.submitted = true;

				if (!isFormValid) {
					return;
				}

				let data = {
					old_password: this.old_password,
					new_password: this.new_password,
					password_confirmation: this.password_confirmation,
				}

				axios.post( 'http://localhost:80/users/update-password/' + this.id, data, {
					headers: {
						Authorization: 'Bearer ' + User.getToken()
				}}  ).then( response =>
					console.log(response)					
				)

				//this.registerUser( this.registersApiGwUrl, data )
				

				//this.$store.dispatch("users/registerUser", data).then( res => console.log(res))					
			},
		},
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
</style>