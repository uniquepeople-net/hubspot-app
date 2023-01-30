<template>
	<div>
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
				<div class="card-header d-flex justify-content-between align-items-center">
					<h5><span class="fw-light">Product:</span> {{product.name}}</h5>
					<DeleteItem v-if="delete" :delete="delete" :itemId="id" 
								:itemName="name" item="product" url="/api/products/"
								redirectRoute="products" :callback="'payments/getProducts'"/>
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
									<InputText id="amount" v-model="v$.amount.$model" :class="{'p-invalid':v$.amount.$invalid && submitted}" aria-describedby="amount-error"
												name="amount" placeholder="Amount (example: 9.99)"/>
			
									<InputError :validator="v$.amount" :submitted="submitted" replace="Amount"></InputError>
								</div>
	
								<div class="inputgroup mb-5 col-12 col-lg-6">
									<InputIcon icon="bi bi-calendar2-event"></InputIcon>
									<Dropdown v-model="interval" :options="intervals" optionLabel="name" optionValue="id" placeholder="Select an Interval"/>
									
									<InputError :validator="v$.interval" :submitted="submitted" replace="interval"></InputError>
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
									<Button type="submit" label="Update" class="mt-2 submit-btn" />
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
	import { required, minLength, numeric, decimal, helpers } from "@vuelidate/validators";
	import { useVuelidate } from "@vuelidate/core";
	import DeleteItem from '../Users/DeleteItem.vue';

	// Custom decimal validation
	const customDecimal = {
		$validator: helpers.regex(/^\d+\.\d{2}$/),
		$message: 'Amount should have 2 numbers after decimal point (ex: 9.99 )'
	}
	
	export default {
		props: {
			products: Array
		},
		mounted() {
			this.name = this.product.name	
			this.amount = this.product.amount_decimal
			this.active = Boolean(this.product.active)	
			this.description = this.product.description
			this.interval = this.product.interval.id

			var regexp = /^\d+\.\d{2}$/;
			console.log("'0.7' returns " + regexp.test('0.75'));
		},
 		setup: () => ({ v$: useVuelidate() }),
		data() {
			return {
				id: parseInt(this.$route.params.product_id),
				name: '',
				amount: '',
				active: false,
				currency: 'EUR',
				description: '',
				interval: '',
				intervals: [{ name: 'one-time', id: 1 }, { name: 'yearly', id: 2 }, { name: 'monthly', id: 3 } ],
				submitted: false,
				showMessage: false,
				response: null,
				delete: true
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

				if (!isFormValid) {
					return;
				}
				
				let data = {
					name: this.name,
					amount: this.amount,
					active: this.active,
					description: this.description,
					interval: this.interval,
					id: this.product.id 
				}

				this.updateProduct( this.editProductUrl, data );

			},
			toggleDialog() {
				this.showMessage = !this.showMessage;
			},
			async updateProduct( url, data ) {
				try {
					await User.refreshedToken();

					await axios.post( url + data.id, data,  {
								headers: {
									Authorization: 'Bearer ' + User.getToken()
								}
							}).then( response => {
								this.response = response.data
								this.product.name = data.name
								this.product.amount_decimal = data.amount
								this.product.active = data.active
								this.product.description = data.description
								this.product.interval.name = this.intervals.filter( i => i.id === data.interval )[0].name
								this.toggleDialog();
							})
				} catch (err) {
					Toast.fire({
						icon: 'error',
						timer: 5000,
						title: "Unable to update product"
					})
					throw 'Unable to update product'
				}
			}
		},
		computed: {
			...mapGetters({ editProductUrl: 'links/editProduct' }),
			product() {
				return this.products.filter( prod => prod.id === this.id )[0]
			}
		},
		components: { DeleteItem }
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