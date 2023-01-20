<template>
		<Dialog v-model:visible="showMessage" :breakpoints="{ '960px': '80vw' }" :style="{ width: '30vw' }" position="top">
            <div class="flex align-items-center flex-column pt-6 px-3">
                <i v-if="response.message" class="pi pi-check-circle" :style="{fontSize: '4rem', color: 'var(--green-400)' }"></i>
                <i v-if="response.error" class="pi pi-times-circle" :style="{fontSize: '4rem', color: 'var(--red-400)' }"></i>
                <h5 v-if="response.message" class="mt-3">{{ response.message }}</h5>
                <h6 v-if="response.error" v-for="(error, key) in response.error" class="mt-3">
					{{ key + ': ' +  error[0].replace('validation.', '') }}
				</h6>
            </div>
            <template #footer>
                <div class="flex justify-content-center">
                    <Button label="OK" @click="toggleDialog" class="p-button-text" />
                </div>
            </template>
        </Dialog>

		<Card class="card">
			<template #title>
				<div class="card-header">
					<h5>User Data</h5>
					<DeleteItem v-if="admin" :delete="admin" :itemId="id" :itemName="name" 
								item="user" url="/api/users/" redirectRoute="all-users"></DeleteItem>
				</div>
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
								<InputIcon icon="bi bi-house"></InputIcon>
								<InputText id="club" v-model="v$.club.$model" :class="{'p-invalid':v$.club.$invalid && submitted}" 
										   name="club" placeholder="Club"/>
							
								<InputError :validator="v$.club" :submitted="submitted" replace="Club"></InputError>
							</div>
		
							<div class="inputgroup mb-5 col-12">
								<InputIcon icon="pi pi-envelope"></InputIcon>
								<InputText id="email" v-model="v$.email.$model" :class="{'p-invalid':v$.email.$invalid && submitted}" aria-describedby="email-error"
										   name="email" placeholder="Email"/>
		
								<InputError :validator="v$.email" :submitted="submitted" replace="Email"></InputError>
							</div>

							<div class="inputgroup mb-5 col-12" :class="admin && 'col-xl-6'">
								<InputIcon icon="bi bi-telephone"></InputIcon>
								<InputText id="phoneNum" v-model="v$.phoneNum.$model" :class="{'p-invalid':v$.phoneNum.$invalid && submitted}" 
										   name="phoneNum" placeholder="Phone number"/>
							
								<InputError :validator="v$.phoneNum" :submitted="submitted" replace="Phone number"></InputError>
							</div>

							<div class="inputgroup mb-5 col-12 col-xl-6" v-if="admin">
								<InputIcon icon="bi bi-activity"></InputIcon>
								<ToggleButton v-model="active" onLabel="Active member" offLabel="Inactive member" onIcon="pi pi-check" offIcon="pi pi-times" :class="`${active ? 'bg-info' : 'bg-warning'} p-togglebtn-active`"/>
							</div>

							<div class="inputgroup mb-5 col-12 align-items-center" v-if="admin">
								<label for="icon">Member from:&nbsp;</label>
								<Calendar inputId="icon" v-model="memberFrom" :showIcon="true" dateFormat="dd.mm.yy" class="calendar"/>
							</div>
		
							<div class="inputgroup mb-5 col-12 col-xl-6" v-if="admin">
								<InputIcon icon="bi bi-bar-chart-fill"></InputIcon>
								<InputText id="instatId" v-model="v$.instatId.$model" :class="{'p-invalid':v$.instatId.$invalid && submitted}" aria-describedby="email-error"
											name="instatId" placeholder="Stat ID"/>
		
								<InputError :validator="v$.instatId" :submitted="submitted" replace="Instat ID"></InputError>
							</div>
		
							<div class="inputgroup mb-5 col-12 col-xl-6" v-if="admin">
								<InputIcon icon="pi pi-euro"></InputIcon>
								<ToggleButton v-model="paid" onLabel="Paid" offLabel="UnPaid" onIcon="pi pi-check" offIcon="pi pi-times" :class="`${paid ? 'bg-success' : 'bg-danger'} p-togglebtn`"/>
							</div>
		
							<div class="inputgroup mb-5 col-12 col-xl-6" v-if="admin">
								<InputIcon icon="bi bi-person-lines-fill"></InputIcon>
								<Dropdown v-model="role" :options="roles" optionLabel="name" optionValue="id" placeholder="Select a Role"/>
								
								<InputError :validator="v$.role" :submitted="submitted" replace="Role"></InputError>
							</div>

							<div class="inputgroup mb-5 col-12 col-xl-6" v-if="admin">
								<InputIcon icon="bi bi-123"></InputIcon>
								<InputText id="varSymbol" v-model="v$.varSymbol.$model" :class="{'p-invalid':v$.varSymbol.$invalid && submitted}"
											name="varSymbol" placeholder="Var. symbol"/>
		
								<InputError :validator="v$.varSymbol" :submitted="submitted" replace="Var. symbol"></InputError>
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
import DeleteItem from "./DeleteItem.vue";
import Calendar from 'primevue/calendar'

export default {
    setup: () => ({ v$: useVuelidate() }),
	props: ['userData', 'userUrl', 'admin', 'myProfile'],
    data() {
        return {
            name: this.userData.name,
            email: this.userData.email,
			phoneNum: this.userData.tel_number,
			club: this.userData.club,
			memberFrom: this.userData.member_from,
			varSymbol: this.userData.var_symbol,
			instatId: this.userData.instat_id,
            submitted: false,
            showMessage: false,
			paid: this.userData.fee,
			active: this.userData.active_member,
			role: this.userData.role_id,
			roles: [{ name: 'User', id: 3 }, { name: 'Editor', id: 2 }, { name: 'Admin', id:1 } ],
			response: null,
			id: this.$route.params.user_id ? this.$route.params.user_id : this.userData.id,
        }
    },
    validations() {
        return {
            name: { required, minLength: minLength(3) },
            email: { required, email },
			phoneNum: { numeric },
			club: { minLength: minLength(3) },
			instatId: { numeric },
			varSymbol: { numeric },
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
				phoneNum: this.phoneNum,
				club: this.club,
				active: this.active,
				memberFrom: this.memberFrom,
				varSymbol: this.varSymbol
			}
			
			this.updateUser( this.userUrl, this.id, data )	
        },
        toggleDialog() {
            this.showMessage = !this.showMessage;
        },
		async updateUser(url, id, data) {
			try {
				await User.refreshedToken();

				let updateUrl = this.myProfile ? url : url + id;

				const user = await axios.post( updateUrl, data, {
					headers: {
						Authorization: 'Bearer ' + User.getToken()
					}
				}).then(
					resp => {
						this.response = resp.data
						this.toggleDialog();
						if ( !this.$route.params.user_id ) {
							this.$store.dispatch("user/getUser");
						} else {
							this.$store.dispatch("specificUser/getSpecificUser", this.id);
						}
					}				
				)
			} catch (err) {
				throw 'Unable to update user'
			}
		},
    },
	watch: {
		userData: function(data) {
			if (data.name) {
				this.name = data.name
				this.email = data.email
				this.phoneNum = data.tel_number
				this.club = data.club
				this.instatId = data.instat_id
				this.paid = data.fee
				this.role = data.role_id
				this.active = data.active_member
				this.memberFrom = data.member_from
				this.varSymbol = data.var_symbol 
			}
		}
	},
	components: { DeleteItem, Calendar }
}
</script>


<style lang="scss" scoped>
.card {
	margin: auto;
	:deep(.card-header) {	
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
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
.p-togglebtn {
	max-width: 12rem;
	color: #ffffff !important;
	.p-button-icon-left {
		color: #ffffff;
	}
	
}
.p-togglebtn-active {
	max-width: 12rem;
}
.p-togglebutton.p-button:not(.p-disabled):not(.p-highlight):hover {
		background: inherit;
		color: inherit;
	}
.submit-btn {
	max-width: 100%;
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