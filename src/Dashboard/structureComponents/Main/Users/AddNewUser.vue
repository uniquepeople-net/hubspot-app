<template>
    
        <Dialog v-model:visible="showMessage" :breakpoints="{ '960px': '80vw' }" :style="{ width: '30vw' }" position="top">
            <div class="flex align-items-center flex-column pt-6 px-3">
                <i v-if="response.message" class="pi pi-check-circle" :style="{fontSize: '4rem', color: 'var(--green-400)' }"></i>
                <i v-if="response.error" class="pi pi-times-circle" :style="{fontSize: '4rem', color: 'var(--red-400)' }"></i>
                <h5 v-if="response.message" class="mt-3">{{ response.message }}</h5>
                <h6 v-if="response.error" v-for="(error, index) in response.error" class="mt-3">{{ index + ': ' + error[0].replace('validation.', '') }}</h6>
                <p v-if="response.message" :style="{lineHeight: 1.5}">
                    Your account is registered under name <b>{{name}}</b> and email: <b>{{email}}</b>.
                </p>
            </div>
            <template #footer>
                <div class="flex justify-content-center">
                    <Button label="OK" @click="toggleDialog" class="p-button-text" />
                </div>
            </template>
        </Dialog>
        
		<Card class="card">
			<template #title>
				<div class="card-header"><h5>Add New User</h5></div>
			</template>
			<template #content>
				<div class="card-body">
					<form @submit.prevent="handleSubmit(!v$.$invalid)" class="p-fluid">

						<div class="row">
							<div class="inputgroup mb-5 col-12 col-lg-6">
								<!-- <InputIcon icon="pi pi-user"></InputIcon> -->
								<span class="p-float-label w-100">
									<InputText id="name" v-model="v$.name.$model" :class="{'p-invalid':v$.name.$invalid && submitted}" 
											name="name" :placeholder="$t('message.Name')"/>
									<label for="name">{{$t('message.Name')}}</label>
								</span>
							
								<InputError :validator="v$.name" :submitted="submitted" replace="Name"></InputError>
							</div>

							<div class="inputgroup mb-5 col-12 col-lg-6">
								<!-- <InputIcon icon="pi pi-user"></InputIcon> -->
								<span class="p-float-label w-100">
									<InputText id="surname" v-model="v$.surname.$model" :class="{'p-invalid':v$.surname.$invalid && submitted}" 
											name="surname" :placeholder="$t('message.Surname')"/>
									<label for="surname">{{$t('message.Surname')}}</label>
								</span>
							
								<InputError :validator="v$.surname" :submitted="submitted" replace="Surname"></InputError>
							</div>
		
							<div class="inputgroup mb-5 col-12 col-lg-6">
								<!-- <InputIcon icon="bi bi-house"></InputIcon> -->
								<span class="p-float-label w-100">
									<InputText id="club" v-model="v$.club.$model" :class="{'p-invalid':v$.club.$invalid && submitted}" 
											   name="club" :placeholder="$t('message.Club')"/>
									<label for="club">{{$t('message.Club')}}</label>
								</span>
							
								<InputError :validator="v$.club" :submitted="submitted" replace="Club"></InputError>
							</div>

							<div class="inputgroup mb-5 col-12 col-lg-6">
								<!-- <InputIcon icon="pi pi-envelope"></InputIcon> -->
								<span class="p-float-label w-100">
									<InputText id="email" v-model="v$.email.$model" :class="{'p-invalid':v$.email.$invalid && submitted}"
												name="email" placeholder="Email"/>
									<label for="email">Email</label>
								</span>
		
								<InputError :validator="v$.email" :submitted="submitted" replace="Email"></InputError>
							</div>

							<div class="inputgroup mb-5 col-12 col-lg-6">
								<!-- <InputIcon icon="bi bi-telephone"></InputIcon> -->
								<span class="p-float-label me-2">
									<InputMask id="countryCode" v-model="v$.countryCode.$model" :class="{'p-invalid':v$.countryCode.$invalid && submitted}" 
											   name="countryCode" placeholder="+9999" mask="+99?99"/>
									<label for="countryCode">{{ $t('message.Code') }}</label>
								</span>
								<InputError :validator="v$.countryCode" :submitted="submitted" replace="countryCode"></InputError>
								<span class="p-float-label w-100">
									<InputMask id="phoneNum" v-model="v$.phoneNum.$model" :class="{'p-invalid':v$.phoneNum.$invalid && submitted}" 
											   name="phoneNum" placeholder="999 999 999" mask="999999999" autoClear/>
									<label for="phoneNum">{{ $t('message.Phonenumber') }}</label>
								</span>
							
								<InputError :validator="v$.phoneNum" :submitted="submitted" replace="Phone number"></InputError>
							</div>

							<div class="inputgroup mb-5 col-12 col-lg-6 justify-content-center">
								<!-- <InputIcon icon="bi bi-activity"></InputIcon> -->
								<ToggleButton v-model="active" :onLabel="$t('message.Active') + ' ' + $t('message.member')" 
											  :offLabel="$t('message.Inactive') + ' ' + $t('message.member')" 
											  onIcon="pi pi-check" offIcon="pi pi-times" 
											  :class="`${active ? 'bg-info' : 'bg-warning'} p-togglebtn-active btn-border-radius`"/>
							</div>
		
							<div class="inputgroup mb-5 col-12 col-lg-6 align-items-center">
								<label for="icon">{{ $t('message.MemberFrom') + ': '}}</label>
								<Calendar inputId="icon" v-model="memberFrom" :showIcon="false" dateFormat="dd.mm.yy" 
										  class="calendar" :placeholder="$t('message.Date')"/>
								<InputError :validator="v$.memberFrom" :submitted="submitted" replace="Member from date"></InputError>
							</div>

							<div class="inputgroup mb-5 col-12 col-lg-6">
								<!-- <InputIcon icon="bi bi-bar-chart-fill"></InputIcon> -->
								<span class="p-float-label w-100">
									<InputText id="instatId" v-model="v$.instatId.$model" :class="{'p-invalid':v$.instatId.$invalid && submitted}" 
												name="instatId" placeholder="Stat ID"/>
									<label for="instatId">Stat ID</label>
								</span>
		
								<InputError :validator="v$.instatId" :submitted="submitted" replace="Instat ID"></InputError>
							</div>
		
							<div class="inputgroup mb-5 col-12 col-lg-6 justify-content-center">
								<!-- <InputIcon icon="pi pi-euro"></InputIcon> -->
								<ToggleButton v-model="paid" :onLabel="$t('message.Paid')" :offLabel="$t('message.Unpaid')" onIcon="pi pi-check" offIcon="pi pi-times" :class="`${paid ? 'bg-success' : 'bg-danger'} p-togglebutton btn-border-radius`"/>
							</div>
		
							<div class="inputgroup mb-5 col-12 col-lg-6">
								<!-- <InputIcon icon="bi bi-person-lines-fill"></InputIcon> -->
								<Dropdown v-model="role" :options="roles" optionLabel="name" optionValue="id" :placeholder="$t('message.SelectaRole')"/>
								
								<InputError :validator="v$.role" :submitted="submitted" replace="Role"></InputError>
							</div>
		
							<!-- <div class="inputgroup mb-5 col-12 col-lg-6">
								<InputIcon icon="bi bi-123"></InputIcon>
								<InputText id="varSymbol" v-model="v$.varSymbol.$model" :class="{'p-invalid':v$.varSymbol.$invalid && submitted}"
											name="varSymbol" placeholder="Var. symbol"/>
		
								<InputError :validator="v$.varSymbol" :submitted="submitted" replace="Var. symbol"></InputError>
							</div> -->

							<div class="inputgroup mb-5 col-12 col-xxl-6">
								<!-- <InputIcon icon="pi pi-lock"></InputIcon> -->
								<span class="p-float-label w-100">
									<Password id="password" v-model="v$.password.$model" :class="{'p-invalid':v$.password.$invalid && submitted}" toggleMask
											name="password" :placeholder="$t('message.Password')">
										<template #header>
											<h6>Pick a password</h6>
										</template>
										<template #footer="sp">
											{{sp.level}}
											<PasswordSuggestions></PasswordSuggestions>
										</template>
									</Password>
									<label for="dropdown">{{$t('message.Password')}}</label>
								</span>
								<Button :label="$t('message.Generate')" @click="generatePswd" class="p-button-secondary btn-border-radius generate-btn"/> 
				
								<InputError :validator="v$.password" :submitted="submitted" replace="Password"></InputError>
							</div>
						</div>

						<div class="position-relative text-center mt-2">
							<Button type="submit" :label="$t('message.Submit')" class=" submit-btn btn btn-primary btn-block btn-lg shadow-lg btn-black" />
							<div v-if="loading" class="spinner-grow position-absolute" role="status"></div>
						</div>

					</form>
				</div>
			</template>
		</Card>  
</template>

<script>
import { email, required, sameAs, minLength, numeric, helpers } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import axios from 'axios';
import { mapGetters } from 'vuex';
import Calendar from 'primevue/calendar';
import InputMask from 'primevue/inputmask'

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
			countryCode: '',
			phoneNum: '',
			club: '',
			memberFrom: '',
			//varSymbol: '',
			active: true,
			instatId: '',
            password: '',
            submitted: false,
            showMessage: false,
			paid: false,
			role: '',
			roles: [{ name: 'User', id: 3 }, { name: 'Editor', id: 2 }, { name: 'Admin', id: 1 } ],
			response: null,
			loading: false
        }
    },
    validations() {
        return {
            name: { required, minLength: minLength(2) },
            surname: { required, minLength: minLength(2) },
            email: {  required, email },
			countryCode: { customCountryCode },
			phoneNum: { numeric },
			club: { minLength: minLength(3) },
			instatId: { numeric },
			role: { required },
            password: { required,  minLength: minLength(8)},
			//varSymbol: { numeric, required },
			memberFrom: { required },
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
				instat_id:this.instatId,
				role: this.role,
				fee: this.paid,	
				countryCode: this.countryCode,
				phoneNum: this.phoneNum,
				club: this.club,
				active: this.active,
				memberFrom: this.memberFrom,
				//varSymbol: this.varSymbol,
				password: this.password,
			}

			this.registerUser( this.registersApiGwUrl, data )			
        },
        toggleDialog() {
            this.showMessage = !this.showMessage;
        
            if(!this.showMessage) {
                //this.resetForm();
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
			await User.refreshedToken();

			const user = await axios.post( url, data, {
				headers: {
					Authorization: 'Bearer ' + User.getToken()
				}
			}).then(
				resp => {
					this.response = resp.data
					this.toggleDialog()
					this.loading = false
					//this.resetForm()				
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
		generatePswd() {
			this.password = Helpers.generatePasswd(12)
		}
    },
	computed: {
		...mapGetters({ registersApiGwUrl: 'links/registerApiGwUrl' }),
	},
	components: { Calendar, InputMask }
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
	:deep(.p-dropdown) {
		width: 100%;
	}
}
.p-togglebutton {
	max-width: 12rem;
}
.submit-btn {
	max-width: 25rem;
}
.p-button-secondary {
	max-width: 7rem !important;
}
.p-togglebtn-active {
	max-width: 12rem;
}
:deep(.p-calendar) {
	flex: 1;
	max-width: 576px;
}
.calendar {	
	:deep(.p-button) {
		color: #6c757d;
		background: #e9ecef;
	}
	:deep(.p-inputtext) {
		//border-radius: 6px 0 0 6px;
	}
}
.generate-btn {
	width: 10rem;
    min-width: unset;
}
.spinner-grow {
	top: 0;
	bottom: 0;
	margin: auto;
	margin-left: .5rem;
}
#countryCode {
	max-width: 8rem;
}
.p-float-label {
	& label {
		opacity: .5;
	}
	input:focus ~ label, input.p-filled ~ label {
		opacity: 1;
	}
}
</style>