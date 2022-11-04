<template>
		<Dialog v-model:visible="showMessage" :breakpoints="{ '960px': '80vw' }" :style="{ width: '30vw' }" position="top">
            <div class="flex align-items-center flex-column pt-6 px-3">
                <i v-if="response.message" class="pi pi-check-circle" :style="{fontSize: '4rem', color: 'var(--green-400)' }"></i>
                <i v-if="response.error" class="pi pi-times-circle" :style="{fontSize: '4rem', color: 'var(--red-400)' }"></i>
                <h5 v-if="response.message" class="mt-3">{{ response.message }}</h5>
                <h6 v-if="response.error" v-for="error in response.error" class="mt-3">{{ error[0] }}</h6>
            </div>
            <template #footer>
                <div class="flex justify-content-center">
                    <Button label="OK" @click="toggleDialog" class="p-button-text" />
                </div>
            </template>
        </Dialog>

        
		<Card class="card">
			<template #title>
				<div class="card-header"><h5>User Data</h5></div>
			</template>
			<template #content>
				<div class="card-body">
					<form @submit.prevent="handleSubmit(!v$.$invalid)" class="p-fluid">

						<div class="row">
							<div class="inputgroup mb-5 col-12">
								<InputIcon icon="pi pi-user"></InputIcon>
								<InputText id="name" v-model="v$.name.$model" :class="{'p-invalid':v$.name.$invalid && submitted}" 
										name="name" placeholder="Name"/>
							
								<InputError :validator="v$.name" :submitted="submitted" replace="Name"></InputError>
							</div>
		
							<div class="inputgroup mb-5 col-12">
								<InputIcon icon="pi pi-envelope"></InputIcon>
								<InputText id="email" v-model="v$.email.$model" :class="{'p-invalid':v$.email.$invalid && submitted}" aria-describedby="email-error"
											name="email" placeholder="Email"/>
		
								<InputError :validator="v$.email" :submitted="submitted" replace="Email"></InputError>
							</div>
		
							<div class="inputgroup mb-5 col-12">
								<InputIcon icon="bi bi-bar-chart-fill"></InputIcon>
								<InputText id="instatId" v-model="v$.instatId.$model" :class="{'p-invalid':v$.instatId.$invalid && submitted}" aria-describedby="email-error"
											name="instatId" placeholder="Instat ID"/>
		
								<InputError :validator="v$.instatId" :submitted="submitted" replace="Instat ID"></InputError>
							</div>
		
							<div class="inputgroup mb-5 col-12">
								<InputIcon icon="pi pi-euro"></InputIcon>
								<ToggleButton v-model="paid" onLabel="Paid" offLabel="UnPaid" onIcon="pi pi-check" offIcon="pi pi-times" :class="paid ? 'p-highlight' : ''"/>
							</div>
		
							<div class="inputgroup mb-5 col-12">
								<InputIcon icon="bi bi-person-lines-fill"></InputIcon>
								<Dropdown v-model="role" :options="roles" optionLabel="name" optionValue="id" placeholder="Select a Role"/>
								
								<InputError :validator="v$.role" :submitted="submitted" replace="Role"></InputError>
							</div>
							
						</div>

						<Button type="submit" label="Update" class="mt-2 submit-btn" />
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

import InputIcon from '../../../global/InputIcon.vue';
import InputError from '../../../global/InputError.vue';

export default {
    setup: () => ({ v$: useVuelidate() }),
    data() {
        return {
            name: '',
            email: '',
			instatId: '',
            submitted: false,
            showMessage: false,
			paid: false,
			role: '',
			roles: [{ name: 'User', id: 3 }, { name: 'Editor', id: 2 }, { name: 'Admin', id:1 } ],
			response: null,
			id: this.$route.params.user_id
        }
    },
    validations() {
        return {
            name: { required, minLength: minLength(3) },
            email: { required, email },
			instatId: { numeric },
			role: { required },
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
			}

			this.updateUser( this.specificUserUrl, data )	
        },
        toggleDialog() {
            this.showMessage = !this.showMessage;
        
            if(!this.showMessage) {
                //this.resetForm();
            }
        },
		async updateUser(url, data) {
			try {
				await User.refreshedToken();

				const user = await axios.post( url + this.id, data, {
					headers: {
						Authorization: 'Bearer ' + User.getToken()
					}
				}).then(
					resp => {
						console.log(resp)
						this.response = resp.data
						this.toggleDialog();
					}				
				)

			} catch (err) {
				throw 'Unable to update user'
			}
		}
    },
	computed: {
		...mapGetters({ specificUserUrl: 'links/specificUser',
						specificUser: 'specificUser/user' }),
	},
	watch: {
		specificUser: function(data) {
			if (data.name) {
				this.name = data.name
				this.email = data.email
				this.instatId = data.instat_id
				//this.password
				this.paid = data.fee
				this.role = data.role_id
			}
		}
	},
	components: { /* PasswordSuggestions, */ InputIcon, InputError }
}
</script>


<style lang="scss" scoped>
.card {
	margin: auto;
	//max-width: 576px;
}
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
	background-color: #DC2626;
	width: fit-content;
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
	max-width: 100%;
}
</style>