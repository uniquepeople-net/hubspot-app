<template>
    
        <Dialog v-model:visible="showMessage" :breakpoints="{ '960px': '80vw' }" :style="{ width: '30vw' }" position="top">
            <div class="flex align-items-center flex-column pt-6 px-3">
                <i v-if="response.message" class="pi pi-check-circle" :style="{fontSize: '4rem', color: 'var(--green-400)' }"></i>
                <i v-if="response.error" class="pi pi-times-circle" :style="{fontSize: '4rem', color: 'var(--red-400)' }"></i>
                <h5 v-if="response.message" class="mt-3">{{ response.message }}</h5>
                <h6 v-if="response.error" v-for="error in response.error" class="mt-3">{{ error[0] }}</h6>
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
								<InputIcon icon="pi pi-user"></InputIcon>
								<InputText id="name" v-model="v$.name.$model" :class="{'p-invalid':v$.name.$invalid && submitted}" 
										name="name" placeholder="Name"/>
							
								<InputError :validator="v$.name" :submitted="submitted" replace="Name"></InputError>
							</div>
		
							<div class="inputgroup mb-5 col-12 col-lg-6">
								<InputIcon icon="bi bi-house"></InputIcon>
								<InputText id="club" v-model="v$.club.$model" :class="{'p-invalid':v$.club.$invalid && submitted}" 
										   name="club" placeholder="Club"/>
							
								<InputError :validator="v$.club" :submitted="submitted" replace="Club"></InputError>
							</div>

							<div class="inputgroup mb-5 col-12 col-lg-6">
								<InputIcon icon="pi pi-envelope"></InputIcon>
								<InputText id="email" v-model="v$.email.$model" :class="{'p-invalid':v$.email.$invalid && submitted}" aria-describedby="email-error"
											name="email" placeholder="Email"/>
		
								<InputError :validator="v$.email" :submitted="submitted" replace="Email"></InputError>
							</div>

							<div class="inputgroup mb-5 col-12 col-lg-6">
								<InputIcon icon="bi bi-telephone"></InputIcon>
								<InputText id="phoneNum" v-model="v$.phoneNum.$model" :class="{'p-invalid':v$.phoneNum.$invalid && submitted}" 
										   name="phoneNum" placeholder="phoneNum"/>
							
								<InputError :validator="v$.phoneNum" :submitted="submitted" replace="Phone number"></InputError>
							</div>

							<div class="inputgroup mb-5 col-12 col-lg-6">
								<InputIcon icon="bi bi-activity"></InputIcon>
								<ToggleButton v-model="active" onLabel="Active member" offLabel="Inactive member" onIcon="pi pi-check" offIcon="pi pi-times" :class="`${active ? 'bg-info' : 'bg-warning'} p-togglebtn-active`"/>
							</div>
		
							<div class="inputgroup mb-5 col-12 align-items-center col-lg-6">
								<label for="icon">Member from:&nbsp;</label>
								<Calendar inputId="icon" v-model="memberFrom" :showIcon="true" dateFormat="dd.mm.yy" class="calendar"/>
							</div>

							<div class="inputgroup mb-5 col-12 col-lg-6">
								<InputIcon icon="bi bi-bar-chart-fill"></InputIcon>
								<InputText id="instatId" v-model="v$.instatId.$model" :class="{'p-invalid':v$.instatId.$invalid && submitted}" aria-describedby="email-error"
											name="instatId" placeholder="Instat ID"/>
		
								<InputError :validator="v$.instatId" :submitted="submitted" replace="Instat ID"></InputError>
							</div>
		
							<div class="inputgroup mb-5 col-12 col-lg-6">
								<InputIcon icon="pi pi-euro"></InputIcon>
								<ToggleButton v-model="paid" onLabel="Paid" offLabel="UnPaid" onIcon="pi pi-check" offIcon="pi pi-times" :class="`${paid ? 'bg-success' : 'bg-danger'} p-togglebutton`"/>
							</div>
		
							<div class="inputgroup mb-5 col-12 col-lg-6">
								<InputIcon icon="bi bi-person-lines-fill"></InputIcon>
								<Dropdown v-model="role" :options="roles" optionLabel="name" optionValue="id" placeholder="Select a Role"/>
								
								<InputError :validator="v$.role" :submitted="submitted" replace="Role"></InputError>
							</div>
		
							<div class="inputgroup mb-5 col-12 col-lg-6">
								<InputIcon icon="bi bi-123"></InputIcon>
								<InputText id="varSymbol" v-model="v$.varSymbol.$model" :class="{'p-invalid':v$.varSymbol.$invalid && submitted}"
											name="varSymbol" placeholder="Var. symbol"/>
		
								<InputError :validator="v$.varSymbol" :submitted="submitted" replace="Var. symbol"></InputError>
							</div>

							<div class="inputgroup mb-5 col-12 col-xxl-6">
								<InputIcon icon="pi pi-lock"></InputIcon>
								<Password id="password" v-model="v$.password.$model" :class="{'p-invalid':v$.password.$invalid && submitted}" toggleMask
										name="password" placeholder="Password">
									<template #header>
										<h6>Pick a password</h6>
									</template>
									<template #footer="sp">
										{{sp.level}}
										<PasswordSuggestions></PasswordSuggestions>
									</template>
								</Password>
								<Button label="Generate" @click="generatePswd" class="p-button-secondary"/> 
				
								<InputError :validator="v$.password" :submitted="submitted" replace="Password"></InputError>
							</div>
							
							
								
							

						</div>

						<Button type="submit" label="Submit" class="mt-2 submit-btn" />
					</form>
				</div>
			</template>
		</Card>  
</template>

<script>
import { email, required, sameAs, minLength, numeric } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import axios from 'axios';
import { mapGetters } from 'vuex';
import Calendar from 'primevue/calendar';

export default {
    setup: () => ({ v$: useVuelidate() }),
    data() {
        return {
            name: '',
            email: '',
			phoneNum: '',
			club: '',
			memberFrom: '',
			varSymbol: '',
			active: true,
			instatId: '',
            password: '',
            submitted: false,
            showMessage: false,
			paid: false,
			role: '',
			roles: [{ name: 'User', id: 3 }, { name: 'Editor', id: 2 }, { name: 'Admin', id:1 } ],
			response: null
        }
    },
    validations() {
        return {
            name: { required, minLength: minLength(3) },
            email: { required, email },
			phoneNum: { numeric },
			club: { minLength: minLength(3) },
			instatId: { numeric },
			role: { required },
            password: { required,  minLength: minLength(8)},
			varSymbol: { numeric },
        }
    },
    methods: {
        handleSubmit(isFormValid) {
            this.submitted = true;

            if (!isFormValid) {
                return;
            }

			let data = {
				name: this.name,
				email: this.email,
				instat_id:this.instatId,
				role: this.role,
				fee: this.paid,	
				phoneNum: this.phoneNum,
				club: this.club,
				active: this.active,
				memberFrom: this.memberFrom,
				varSymbol: this.varSymbol,
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
            this.name = '';
            this.email = '';
			this.instat_id = '';
			this.phoneNum = '';
			this.varSymbol = '';
			this.memberFrom = '';
			this.club = '';
			this.role = '';
			this.fee = false;
			this.active = true;
            this.password = '';
            this.submitted = false;
        },
		async registerUser(url, data) {
			try {
				await User.refreshedToken();

				const user = await axios.post( url, data, {
					headers: {
						Authorization: 'Bearer ' + User.getToken()
					}
				}).then(
					resp => {
						this.response = resp.data
						//this.resetForm()
						this.toggleDialog()
					}				
				)

			} catch (err) {
				throw 'Unable to register user'
			}
		},
		generatePswd() {
			const string = "abcdefghijklmnopqrstuvwxyz";
			const numeric = "0123456789";
			const punctuation = "!@#$%^&*()_+~`|}{[]:;?><,./-=";
			const length = 16

			let character = "";
			let password = "";
			while (password.length < length) {
				const entity1 = Math.ceil(
				string.length * Math.random() * Math.random()
				);
				const entity2 = Math.ceil(
				numeric.length * Math.random() * Math.random()
				);
				const entity3 = Math.ceil(
				punctuation.length * Math.random() * Math.random()
				);
				let hold = string.charAt(entity1);
				hold = password.length % 2 === 0 ? hold.toUpperCase() : hold;
				character += hold;
				character += numeric.charAt(entity2);
				character += punctuation.charAt(entity3);
				password = character;
			}
			password = password
				.split("")
				.sort(() => {
				return 0.5 - Math.random();
				})
				.join("");
			this.password = password.substr(0, length);
		}
    },
	computed: {
		...mapGetters({ registersApiGwUrl: 'links/registerApiGwUrl' }),
	},
	components: { Calendar }
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
	:deep(.p-inputtext), :deep(.p-dropdown) {
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
		border-radius: 6px 0 0 6px;
	}
}
</style>