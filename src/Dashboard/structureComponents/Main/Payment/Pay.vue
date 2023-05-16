<template>
	<Card class="card" v-if="payProduct">
		<template #title>
			<h5><span class="fw-light">Title: </span>{{ payProduct.name }}</h5>
			<h5><span class="fw-light">Description: </span>{{ payProduct.description }}</h5>
			<Divider />
			<h5 class="text-center text-success">{{ formatPrice(payProduct.price.unit_amount) }}</h5>
			<Divider />
		</template>
		<template #content>
			
			<!-- <GooglePay class="my-5"/> -->

			<StripeElements
				v-if="stripeLoaded"
				:stripe-key="stripePubKey"
				v-slot="{ elements }"
				ref="elms">
				<StripeElement type="card" :elements="elements" :options="cardOptions"
								ref="card" @change="cardChange($event)"/>
			</StripeElements>
		
			<Button type="button" @click="pay" label="Pay" class="mt-5 pay-btn" 
			        iconPos="right" icon="pi pi-search" :disabled="disablePay">
				Pay
				<div v-if="loading" class="spinner-grow" role="status">
				</div>
			</Button>
		</template>
	</Card>
</template>
 
 
<script>
	import { StripeElements, StripeElement } from 'vue-stripe-js'
	import { loadStripe } from '@stripe/stripe-js'
	import { mapGetters } from 'vuex'
	import GooglePay from './GooglePay.vue'

	export default {
		created() {
			//var stripeKey = process.env.STRIPE_PUB_LIVE_KEY;
			var stripeKey = this.stripePubKey;
			const stripePromise = loadStripe(stripeKey)
			stripePromise.then( response => {
				this.stripeLoaded = true
				this.stripe = response

			})
			if ( !this.payProduct ) {
				this.$router.push({ name: 'wallet-info' })
			}			
			
		},
		data() {
			return {
				stripe: null,
				loading: false,
				stripeLoaded: false,
				disablePay: false,
				cardOptions: {
                    hidePostalCode: true,
                    style: {
                        base: {
                            iconColor: '#1D7870',
                            color: '#454D54',
                            fontWeight: '400',
                            fontFamily: 'Inter, Calibri, sans-serif',
                            fontSize: '1.3rem',
                            fontSmoothing: 'antialiased',

                            ':-webkit-autofill': {
                                color: '#7C8B99',
                            },

                            '::placeholder': {
                                color: '#7C8B99',
                            },
                        },
                        invalid: {
                            iconColor: '#FF666C',
                            color: '#FF666C',
                        },
                    },
                },

			}
		},
		methods: {
			cardChange(e) {
				//console.log(e)
			},
			pay() {
				const groupComponent = this.$refs.elms
				const cardComponent = this.$refs.card
				const cardElement = cardComponent.stripeElement

				this.loading = true
				this.disablePay = true

				// Access instance methods, e.g. createToken()
				groupComponent.instance.createToken(cardElement)
					.then( result => {
					// Handle result.error or result.token
						let data = {
							returnUrl: window.location.origin + '/wallet/pay-status',
							productId: this.payProduct.id,
							priceId: this.payProduct.default_price,
							description: this.payProduct.name,
							userId: this.user.id,
							productName: this.payProduct.name, 
							methodId: result.token.card.id,
							/* amount: this.payProduct.amount_decimal,
							stripeToken: result.token.id,
							//billing_details: { name: 'fero' },
							//returnUrl: window.location.href,*/
						}
					

						axios.post( this.paymentUrl , data, {
							headers: {
								'Content-Type': 'application/json',
								Authorization: 'Bearer ' + User.getToken()
							}
						}).then( response => {
								window.localStorage.setItem("cs", response.data.charge.client_secret)
								window.localStorage.setItem("pay-id", response.data.payment_id)

								const action = response.data.charge.next_action;
								if (action && action.type === 'redirect_to_url') {
									window.location = action.redirect_to_url.url;
								}

							})
							.catch( error => {
								Toast.fire({
									icon: 'error',
									timer: 5000,
									title: "Couldn't connect Pay service"
								})								
								this.loading = false
								this.disablePay = false
							})
					}).catch( error => {
						Toast.fire({
							icon: 'error',
							timer: 5000,
							title: "Couldn't connect Pay service"
						})
						this.loading = false
						this.disablePay = false						
					})
			},
			formatPrice(price) {
				return Helpers.formatPrice(price)
			}
		},
		computed: {
			...mapGetters({ paymentUrl: 'links/payment',
							stripePubKey: 'payments/stripePubKey',
							payProduct: 'payments/payProduct',
							user: 'user/user' })
		},
		components: { StripeElements, StripeElement, GooglePay }
	}
</script>
 
 
<style lang='scss' scoped>
.card {
	max-width: 576px;
}
.pay-btn {
	min-width: 300px;
	justify-content: center;
	position: relative;
	.spinner-grow {
		position: absolute;
		right: 1rem;
	}
}
</style>