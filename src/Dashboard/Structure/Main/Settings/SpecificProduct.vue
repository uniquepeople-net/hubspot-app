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

					<!-- Stripe Products not possible to delete through API  -->
					
					<!-- <DeleteItem v-if="delete" :delete="delete" :itemId="id" 
								:itemName="name" item="product" url="/api/product/"
								redirectRoute="products" :callback="'payments/getProducts'"/> -->
				</div>
			</template>
			<template #content>
					<div class="card-body">
						<form @submit.prevent="handleSubmit(!v$.$invalid)" class="p-fluid">
	
							<div class="row">

								<div class="inputgroup mb-5 col-12 col-lg-6">
									<InputText id="interval" v-model="v$.interval.$model"  disabled
												name="interval" />
									<InputError :validator="v$.interval" :submitted="submitted" replace="interval"></InputError>
								</div>

								<div class="inputgroup mb-5 col-12 col-lg-6">

									<InputText id="interval" v-model="v$.membership.$model"  disabled
												name="interval" />
									
									<InputError :validator="v$.membership" :submitted="submitted" replace="membership"></InputError>
								</div>

								<div class="inputgroup mb-5 col-12 col-lg-6">
									<InputText id="amount" v-model="v$.amount.$model" :class="{'p-invalid':v$.amount.$invalid && submitted}" disabled
												name="amount" placeholder="Amount (example: 9.99)"/>
			
									<InputError :validator="v$.amount" :submitted="submitted" replace="Amount"></InputError>
								</div>

								<div class="inputgroup mb-5 col-12 col-lg-6">
									<InputText id="name" v-model="v$.name.$model" :class="{'p-invalid':v$.name.$invalid && submitted}" 
											name="name" placeholder="Name"/>
								
									<InputError :validator="v$.name" :submitted="submitted" replace="Name"></InputError>
								</div>
			

								<div class="inputgroup mb-5 col-12 col-lg-6">
									<ToggleButton v-model="active" onLabel="Active" offLabel="Inactive" :class="`${active ? 'bg-success' : 'bg-danger'} p-togglebutton`"/>
								</div>
	
								<div class="inputgroup mb-5 col-12 col-lg-6">
									<Textarea id="description" v-model="v$.description.$model" :class="{'p-invalid':v$.description.$invalid && submitted}" 
											name="description" placeholder="Description"/>
								
									<InputError :validator="v$.description" :submitted="submitted" replace="Description"></InputError>
								</div>
								
								<div class="col-12 col-lg-6 offset-lg-6">
									<Button type="submit" label="Update" class="mt-2 submit-btn btn-black" :loading="loading"/>
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
			this.amount = (this.product.price.unit_amount/100).toFixed(2)
			this.active = Boolean(this.product.active)	
			this.description = this.product.description
			this.interval = this.product.price.recurring ? this.product.price.recurring.interval : this.product.price.type
			this.membership = this.product.metadata ? this.product.metadata.membership_name : ''
		},
 		setup: () => ({ v$: useVuelidate() }),
		data() {
			return {
				id: this.$route.params.product_id,
				name: '',
				amount: '',
				active: false,
				currency: 'EUR',
				description: '',
				interval: '',
				membership: '',
				intervals: [{ name: 'one-time', id: 'one_time' }, { name: 'yearly', id: 'year' }, { name: 'monthly', id: 'month' }, { name: 'weekly', id: 'week' } ],
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
				interval: { required },
				membership: { required }
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
					amount: this.amount,
					active: this.active,
					description: this.description,
					interval: this.interval,
					id: this.product.id,
					price_id: this.product.default_price
				}

				this.updateProduct( this.editProductUrl, data );

			},
			toggleDialog() {
				this.showMessage = !this.showMessage;
			},
			async updateProduct( url, data ) {
				
				await User.refreshedToken();

				await axios.post( url + data.id, data,  {
							headers: {
								Authorization: 'Bearer ' + User.getToken()
							}
						}).then( response => {
							this.response = response.data
							this.product.name = data.name
							this.product.active = data.active
							this.product.description = data.description
							this.toggleDialog();
							this.loading = false
						}).catch( error =>  {
							this.loading = false
							Toast.fire({
								icon: 'error',
								timer: 5000,
								title: "Unable to update product"
							})
						})
			},
			formatPrice(price) {
				return Helpers.formatPrice(price)
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
}
.p-togglebutton {
	color: var(--gray-50);
	max-width: 10rem;
	max-height: 3rem;
	border-radius: var(--btn-border-radius) !important;
}

</style>