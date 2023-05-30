<template>
    <div>
		<Dialog v-model:visible="showMessage" :breakpoints="{ '960px': '80vw' }" :style="{ width: '30vw' }" position="top">
			<div class="flex align-items-center flex-column pt-6 px-3">
				<i v-if="response.message" class="pi pi-check-circle" :style="{fontSize: '4rem', color: 'var(--green-400)' }"></i>
				<i v-if="response.error" class="pi pi-times-circle" :style="{fontSize: '4rem', color: 'var(--red-400)' }"></i>
				<h5 v-if="response.message" class="mt-3">{{ response.message }}</h5>
				<h6 v-if="response.error" v-for="(error, index) in response.error" class="mt-3">{{ index + ': ' + error[0].replace('validation.', '') }}</h6>
				<p v-if="response.message" :style="{lineHeight: 1.5}">
					{{ $t('message.Youraccountisregisteredundername') }} <b>{{name}} {{surname}}</b> {{ $t('message.andemail') }} <b>{{email}}</b>.
				</p>
			</div>
			<template #footer>
				<div class="flex justify-content-center">
					<Button label="OK" @click="toggleDialog" class="p-button-text" />
				</div>
			</template>
		</Dialog>

	    <AuthWrapper>
	        <template v-slot:body>
				
						<div class="card-header mb-4">
							<h5>{{ $t('message.Register') }}</h5>
						</div>
					
						<div class="card-body">
							<form @submit.prevent="handleSubmit(!v$.$invalid)" class="p-fluid">
		
								<div class="row">
									<div class="inputgroup mb-5 col-12">
										<InputIcon icon="pi pi-user"></InputIcon>
										<InputText id="name" v-model="v$.name.$model" :class="{'p-invalid':v$.name.$invalid && submitted}" 
												name="name" :placeholder="$t('message.Name')"/>
									
										<InputError :validator="v$.name" :submitted="submitted" replace="Name"></InputError>
									</div>
		
									<div class="inputgroup mb-5 col-12">
										<InputIcon icon="pi pi-user"></InputIcon>
										<InputText id="surname" v-model="v$.surname.$model" :class="{'p-invalid':v$.surname.$invalid && submitted}" 
												name="surname" :placeholder="$t('message.Surname')"/>
									
										<InputError :validator="v$.surname" :submitted="submitted" replace="Surname"></InputError>
									</div>
		
									<div class="inputgroup mb-5 col-12">
										<InputIcon icon="pi pi-envelope"></InputIcon>
										<InputText id="email" v-model="v$.email.$model" :class="{'p-invalid':v$.email.$invalid && submitted}"
													name="email" placeholder="Email"/>
				
										<InputError :validator="v$.email" :submitted="submitted" replace="Email"></InputError>
									</div>
		
									<!-- <div class="inputgroup mb-5 col-12">
										<InputIcon icon="bi bi-telephone"></InputIcon>
										<InputMask id="countryCode" v-model="v$.countryCode.$model" :class="{'p-invalid':v$.countryCode.$invalid && submitted}" 
												name="countryCode" placeholder="+9999" mask="+99?99"/>
										<InputError :validator="v$.countryCode" :submitted="submitted" replace="countryCode"></InputError>
										<InputMask id="phoneNum" v-model="v$.phoneNum.$model" :class="{'p-invalid':v$.phoneNum.$invalid && submitted}" 
												name="phoneNum" placeholder="999 999 999" mask="999999999" autoClear/>
									
										<InputError :validator="v$.phoneNum" :submitted="submitted" replace="Phone number"></InputError>
									</div> -->
		
									<div class="inputgroup mb-5 col-12">
										<InputIcon icon="pi pi-lock"></InputIcon>
										<Password id="password" v-model="v$.password.$model" :class="{'p-invalid':v$.password.$invalid && submitted}" toggleMask
												name="password" :placeholder="$t('message.Password')">
											<template #header>
												<h6>{{$t('message.PickAPassword')}}</h6>
											</template>
											<template #footer="sp">
												{{sp.level}}
												<PasswordSuggestions></PasswordSuggestions>
											</template>
										</Password>
										<!-- <Button label="Generate" @click="generatePswd" class="p-button-secondary"/> --> 
						
										<InputError :validator="v$.password" :submitted="submitted" replace="Password"></InputError>
									</div>

									<div class="inputgroup mb-5 col-12">
										<InputIcon icon="pi pi-lock"></InputIcon>
										<Password id="password_confirmation" v-model="v$.password_confirmation.$model" :class="{'p-invalid':v$.password_confirmation.$invalid && submitted}" toggleMask
												name="password_confirmation" :placeholder="$t('message.ConfirmPassword')">
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
								</div>
		
								<div class="position-relative text-center mt-2">
									<Button type="submit" :label="$t('message.RegisterV')" 
											class=" submit-btn btn btn-primary btn-block btn-lg shadow-lg" :loading="loading"/>
								</div>
		
							</form>
						</div>
					
			</template>  

			<template v-slot:footer>
				<div class="mt-4 center-center">
					<span class="registered-text">{{ $t('message.Alreadyaccount') + '?' }}</span>
					<Button :label="$t('message.LoginV')" 
							severity="secondary" text @click="redirectLogin"/>
				</div>
			</template>
		</AuthWrapper>
    </div>
</template>

<script>
import { numeric, helpers } from "@vuelidate/validators";
import { required, email, minLength, sameAs } from "../plugins/vuelidate-i18n";
import { useVuelidate } from "@vuelidate/core";
import axios from 'axios';
import { mapGetters } from 'vuex';
import Calendar from 'primevue/calendar';
import InputMask from 'primevue/inputmask'
import AuthWrapper from './AuthWrapper.vue';

// Custom country code validation
const customCountryCode = {
	$validator: helpers.regex(/^([0|\+[0-9]{1,5})/),
	$message: 'Country code should be in format +99x'
}

export default {
    setup: () => ({ v$: useVuelidate() }),
	mounted() {
		let regexp = /^([0|\+[0-9]{1,5})/
	},
    data() {
        return {
            name: '',
            surname: '',
            email: '@',
			/* countryCode: '',
			phoneNum: '', */
            password: '',
			password_confirmation: '',
            submitted: false,
            showMessage: false,
			response: null,
			loading: false
        }
    },
    validations() {
        return {
            name: { required, minLength: minLength(2) },
            surname: { required, minLength: minLength(2) },
            email: {  required, email },
			//countryCode: { customCountryCode },
			//phoneNum: { numeric },
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

			let data = {
				name: this.name,
				surname: this.surname,
				email: this.email,
				//countryCode: this.countryCode,
				//phoneNum: this.phoneNum,
				password: this.password,
				password_confirmation: this.password_confirmation
			}

			this.registerUser( this.registersApiGwUrl, data )			
        },
        toggleDialog() {
            this.showMessage = !this.showMessage;
        
            if ( this.response && this.response.status === 'success') {
				//this.resetForm()				
			}
        },
        resetForm() {
            this.name = ''
            this.surname = ''
            this.email = ''
			this.instat_id = ''
			this.countryCode = ''
			this.phoneNum = ''
			//this.varSymbol = ''
			this.memberFrom = ''
			this.club = ''
			this.role = ''
			this.fee = false
			this.active = true
            this.password = ''
            this.submitted = false
        },
		async registerUser(url, data) {

			const user = await axios.post( url, data, {
				headers: {
					Authorization: 'Bearer ' + User.getToken()
				}
			}).then(
				resp => {
					this.response = resp.data
					this.toggleDialog()
					this.loading = false
				}				
			).catch( error => {
				Toast.fire({
					icon: 'error',
					timer: 4000,
					title: "Unable to register user"
				})
				this.loading = false
			})
		},
		redirectLogin() {
			this.$router.push({ name: 'login' })
		}
    },
	computed: {
		...mapGetters({ registersApiGwUrl: 'links/registerNewApiGwUrl' }),
	},
	components: { Calendar, InputMask, AuthWrapper }
}
</script>


<style lang="scss" scoped>
.inputgroup {
	position: relative;
	display: flex;
	& span.error-msg {
		position: absolute;
		bottom: -60%;
	}
	& > .p-button {
		border-radius: 0 4px 4px 0;
	} 
	:deep(.p-dropdown) {
		width: 100%;
	}
	:deep(.p-inputtext):not(#countryCode), :deep(.p-dropdown) {
		border-radius: 0 6px 6px 0;
	}
}
.p-togglebutton {
	max-width: 12rem;
}
.submit-btn {
	max-width: 25rem;
}
.p-button-secondary {
	max-width: 6rem !important;
}
.registered-text {
	font-size: .8rem;
}
#countryCode {
	max-width: 6rem;
}
</style>