<template>
    
        <Dialog v-model:visible="showMessage" :breakpoints="{ '960px': '80vw' }" :style="{ width: '30vw' }" position="top">
            <div class="flex align-items-center flex-column pt-6 px-3">
                <i class="pi pi-check-circle" :style="{fontSize: '5rem', color: 'var(--green-500)' }"></i>
                <h5>Registration Successful!</h5>
                <p :style="{lineHeight: 1.5, textIndent: '1rem'}">
                    Your account is registered under name <b>{{name}}</b> and email: <b>{{email}}</b>.
                </p>
            </div>
            <template #footer>
                <div class="flex justify-content-center">
                    <Button label="OK" @click="toggleDialog" class="p-button-text" />
                </div>
            </template>
        </Dialog>

        
		<div class="card">
			<div class="card-header"><h5>Add New User</h5></div>
			<div class="card-body">
				<form @submit.prevent="handleSubmit(!v$.$invalid)" class="p-fluid">

					<div class="row">
						<div class="p-inputgroup mb-5 col-12 col-lg-6">
							<InputIcon icon="pi pi-user"></InputIcon>
							<InputText id="name" v-model="v$.name.$model" :class="{'p-invalid':v$.name.$invalid && submitted}" 
									   name="name" placeholder="Name"/>
						
							<InputError :validator="v$.name" :submitted="submitted" replace="Name"></InputError>
						</div>
	
						<div class="p-inputgroup mb-5 col-12 col-lg-6">
							<InputIcon icon="pi pi-envelope"></InputIcon>
							<InputText id="email" v-model="v$.email.$model" :class="{'p-invalid':v$.email.$invalid && submitted}" aria-describedby="email-error"
										name="email" placeholder="Email"/>
	
							<InputError :validator="v$.email" :submitted="submitted" replace="Email"></InputError>
						</div>
	
						<div class="p-inputgroup mb-5 col-12 col-lg-6">
							<InputIcon icon="bi bi-bar-chart-fill"></InputIcon>
							<InputText id="instatId" v-model="v$.instatId.$model" :class="{'p-invalid':v$.instatId.$invalid && submitted}" aria-describedby="email-error"
										   name="instatId" placeholder="Instat ID"/>
	
							<InputError :validator="v$.instatId" :submitted="submitted" replace="Instat ID"></InputError>
						</div>
	
						<div class="p-inputgroup mb-5 col-12 col-lg-6">
							<InputIcon icon="pi pi-euro"></InputIcon>
							<ToggleButton v-model="paid" onLabel="Paid" offLabel="UnPaid" onIcon="pi pi-check" offIcon="pi pi-times" />
						</div>
	
						<div class="p-inputgroup mb-5 col-12 col-lg-6">
							<Dropdown v-model="role" :options="roles" optionLabel="name" optionValue="id" placeholder="Select a Role" />
							
							<InputError :validator="v$.role" :submitted="submitted" replace="Role"></InputError>
						</div>
	
						<div class="p-inputgroup mb-5 col-12 col-lg-6">
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
			
							<InputError :validator="v$.password" :submitted="submitted" replace="Password"></InputError>
						</div>
	
						<!-- <div class="p-inputgroup mb-5 col-12 col-lg-6">
							<InputIcon icon="pi pi-lock"></InputIcon>
							<Password id="password_confirmation" v-model="v$.password_confirmation.$model" :class="{'p-invalid':v$.password_confirmation.$invalid && submitted}" toggleMask
									  name="password_confirmation" placeholder="password_confirmation">
								<template #header>
									<h6>Pick a password</h6>
								</template>
								<template #footer="sp">
									{{sp.level}}
									<PasswordSuggestions></PasswordSuggestions>
								</template>
							</Password>
			
							<InputError :validator="v$.password_confirmation" :submitted="submitted" replace="Password confirmation"></InputError>
						</div> -->
					</div>

					<Button type="submit" label="Submit" class="mt-2 submit-btn" />
				</form>
			</div>
		</div>
       
    
</template>

<script>
import { email, required, sameAs, minLength, numeric } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import axios from 'axios';


import PasswordSuggestions from "../../../global/PasswordSuggestions.vue";
import InputIcon from '../../../global/InputIcon.vue';
import InputError from '../../../global/InputError.vue';

export default {
    setup: () => ({ v$: useVuelidate() }),
    data() {
        return {
            name: '',
            email: '',
			instatId: '',
            password: '',
            //password_confirmation: '',
            //accept: null,
            submitted: false,
            showMessage: false,
			paid: false,
			role: '',
			roles: [{ name: 'User', id: 3 }, { name: 'Editor', id: 2 }, { name: 'Admin', id:1 } ],
			response: null
        }
    },
    //countryService: null,
    validations() {
        return {
            name: { required, minLength: minLength(3) },
            email: { required, email },
			instatId: { numeric },
			role: { required },
            password: { required,  minLength: minLength(8)},
            //password_confirmation: { required, sameAsPassword: sameAs(this.password) },
            //accept: { required }
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
				password: this.password,
			}

			this.$store.dispatch("users/registerUser", data).then( res => console.log(res))					
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
            this.password = '';
            //this.password_confirmation = '';
            //this.accept = null;
            this.submitted = false;
        }
    },
	watch: {
		response: function (data) {
			console.log(data)
			
		},
	},
	components: { PasswordSuggestions, InputIcon, InputError }
}
</script>

<style lang="scss" scoped>
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