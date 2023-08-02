<template>
	<div>
		<Dialog v-model:visible="showMessage" :breakpoints="{ '960px': '80vw' }" :style="{ width: '30vw' }" position="top">
			<div class="flex align-items-center flex-column pt-6 px-3">
				<i v-if="response.message" class="pi pi-check-circle" :style="{fontSize: '4rem', color: 'var(--green-400)' }"></i>
				<i v-if="response.error" class="pi pi-times-circle" :style="{fontSize: '4rem', color: 'var(--red-400)' }"></i>
				<h5 v-if="response.message" class="mt-3">{{ response.message }}</h5>
				<h6 v-if="response.error" v-for="(error, key) in response.error" class="mt-3">{{ key + ': ' + error[0] }}</h6>
			</div>
			<template #footer>
				<div class="flex justify-content-center">
					<Button label="OK" @click="toggleDialog" class="p-button-text" />
				</div>
			</template>
		</Dialog>
	
		<Card class="card">
			<template #title>
				<div class="card-header d-flex justify-content-between align-items-center">
					<h5>Add New Product</h5>
				</div>
			</template>
			<template #content>
					<div class="card-body">
						<form @submit.prevent="handleSubmit(!v$.$invalid)" class="p-fluid">
	
							<div class="row">
								<div class="inputgroup mb-5 col-12 col-lg-6">
									<InputIcon icon="bi bi-pencil"></InputIcon>
									<InputText id="name" v-model="v$.name.$model" :class="{'p-invalid':v$.name.$invalid && submitted}" 
											name="name" placeholder="Name"/>
								
									<InputError :validator="v$.name" :submitted="submitted" replace="Name"></InputError>
								</div>
			
								<div class="inputgroup mb-5 col-12 col-lg-6">
									<InputIcon icon="bi bi-currency-euro"></InputIcon>
									<InputText id="amount" v-model="v$.amount.$model" :class="{'p-invalid':v$.amount.$invalid && submitted}"
												name="amount" placeholder="Amount with two decimals 99.99"/>
			
									<InputError :validator="v$.amount" :submitted="submitted" replace="Amount"></InputError>
								</div>
	
								<div class="inputgroup mb-5 col-12 col-lg-6">
									<InputIcon icon="bi bi-calendar2-event"></InputIcon>
									<Dropdown v-model="v$.interval.$model" :options="intervals" :class="{'p-invalid':v$.interval.$invalid && submitted}"
											  optionLabel="name" optionValue="id" placeholder="Select an Interval"/>
									
									<InputError :validator="v$.interval" :submitted="submitted" replace="Interval"></InputError>
								</div>

								<div class="inputgroup mb-5 col-12 col-lg-6">
									<InputIcon v-if="!active" icon="bi bi-toggle-off"></InputIcon>
									<InputIcon v-if="active" icon="bi bi-toggle-on"></InputIcon>
									<ToggleButton v-model="active" onLabel="Active" offLabel="Inactive" :class="`${active ? 'bg-success' : 'bg-danger'} p-togglebutton`"/>
								</div>
	
								<div class="inputgroup mb-5 col-12 col-lg-6">
									<InputIcon icon="bi bi-info-circle"></InputIcon>
									<Textarea id="description" v-model="v$.description.$model" :class="{'p-invalid':v$.description.$invalid && submitted}" 
											name="description" placeholder="Description"/>
								
									<InputError :validator="v$.description" :submitted="submitted" replace="Description"></InputError>
								</div>
								
								<div class="col-12 col-lg-6 offset-lg-6">
									<Button type="submit" label="Add Product" class="mt-2 submit-btn btn-black" :loading="loading"/>
								</div>
							</div>
	
						</form>
					</div>
				</template>
		</Card>
	</div>  
</template>
 
 
<script>
	import { mapGetters } from 'vuex';
	import { required, minLength, numeric, helpers } from "@vuelidate/validators";
	import { useVuelidate } from "@vuelidate/core";

	// Custom decimal validation
	const customDecimal = {
		$validator: helpers.regex(/^\d+\.\d{2}$/),
		$message: 'Amount should have 2 numbers after decimal point (ex: 9.99 )'
	}

	export default {
 		setup: () => ({ v$: useVuelidate() }),
		data() {
			return {
				name: '',
				amount: '',
				active: false,
				currency: 'EUR',
				description: '',
				interval: '',
				intervals: [
					{ name: 'one-time', id: 'one_time' }, 
					{ name: 'yearly', id: 'year' }, 
					{ name: 'monthly', id: 'month' }, 
					{ name: 'weekly', id: 'week' }, 
					{ name: 'daily', id: 'day' } 
				],
				submitted: false,
				showMessage: false,
				response: null,
				delete: true,
				loading: false
			}
		},
		validations() {
			return {
				name: { required, minLength: minLength(3) },
				amount: { required, customDecimal },
				description: { required, minLength: minLength(3) },
				interval: { required }
			}
		},
		methods: {
			handleSubmit(isFormValid) {
				this.submitted = true;
				this.loading = true

				if (!isFormValid) {
					return;
				}
				
				let data = {
					name: this.name,
					amount: this.amount,
					active: this.active,
					description: this.description,
					interval: this.interval
				}

				this.addProduct( this.addProductUrl, data );

			},
			toggleDialog() {
				this.showMessage = !this.showMessage;
			},
			async addProduct( url, data ) {
				try {
					await User.refreshedToken();

					await axios.post( url, data,  {
								headers: {
									Authorization: 'Bearer ' + User.getToken()
								}
							}).then( response => {
								this.response = response.data
								this.loading = false								
								this.toggleDialog();
								this.$store.dispatch("payments/getProducts");
							})
				} catch (err) {
					this.loading = false
					Toast.fire({
						icon: 'error',
						timer: 5000,
						title: "Unable to add product"
					})
					throw 'Unable to add product'
				}
			}
		},
		computed: {
			...mapGetters({ addProductUrl: 'links/addProduct' })
		}
	}
</script>
 
 
<style lang='scss' scoped>
.card {
	max-width: 1200px;
}
.inputgroup {
	position: relative;
	display: flex;
	& span.error-msg {
		position: absolute;
		top: 100%;
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
	color: var(--gray-50);
	max-width: 10rem;
}
.submit-btn {
	max-width: 25rem;
}
</style>