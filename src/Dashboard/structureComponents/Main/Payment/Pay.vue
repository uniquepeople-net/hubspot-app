<template>
	<Card class="card mx-auto app-card" v-if="payProduct">
		<!-- <template #title>
		</template> -->
		<template #content>
			
			<PaymentMethods @choosedMethod="choosedMethod"/>

			<Divider />

			<div v-if="method && method === 'google'" class="d-flex justify-content-center">
				<GooglePay class="my-4" :product="payProduct[0]" :user="user" 
							:url="googlePaymentUrl" :stripeKey="stripePubKey"
							/>
			</div>

			<div v-if="method && method === 'card'">
				<div>
					<StripeElements
						v-if="stripeLoaded"
						:stripe-key="stripePubKey"
						v-slot="{ elements }"
						ref="elms">
						<StripeElement type="card" :elements="elements" :options="cardOptions"
										ref="card" @change="cardChange($event)"/>
					</StripeElements>
				</div>
			
				<div class="d-flex justify-content-center">
					<Button type="button" @click="pay" :label="buttonLabel()" class="mt-5 pay-btn btn-black" 
					        iconPos="right" :disabled="disablePay" :loading="loading">
					</Button>
				</div>
			</div>
		</template>
	</Card>
</template>
 
 
<script>
	import { StripeElements, StripeElement } from 'vue-stripe-js'
	import { loadStripe } from '@stripe/stripe-js'
	import { mapGetters } from 'vuex'
	import GooglePay from './GooglePay.vue'
	import PaymentMethods from './PaymentMethods.vue'

	export default {
		props: {
			payProduct: Array
		},
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
				//stripeKey: process.env.STRIPE_PUB_LIVE_KEY,
				stripe: null,
				loading: false,
				stripeLoaded: false,
				disablePay: false,
				method: null,
				cardOptions: {
                    hidePostalCode: true,
                    style: {
                        base: {
                            iconColor: '#1D7870',
                            color: '#454D54',
                            fontWeight: '400',
                            fontFamily: 'Inter, Calibri, sans-serif',
                            fontSize: '18px',
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
			choosedMethod(e) {
				this.method = e
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
							returnUrl: window.location.origin + '/' + this.$i18n.locale + '/wallet/pay-status',
							productId: this.payProduct[0].id,
							priceId: this.payProduct[0].default_price,
							description: this.payProduct[0].name,
							userId: this.user.id,
							productName: this.payProduct[0].name, 
							methodId: result.token.card.id,
							email: this.user.email,
							varSymbol: this.user.var_symbol,
							stripeToken: result.token.id,
							result: result.token
							/* amount: this.payProduct[0].amount_decimal,
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

								const success = response.data.charge.status
								if ( success && success === 'succeeded' ) {
									window.location = window.location.origin + '/' + this.$i18n.locale + '/wallet/pay-status'
								} else {
									Toast.fire({
										icon: 'warning',
										timer: 8000,
										title: response.data.charge.status
									})								
									this.loading = false
									this.disablePay = false
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
			},
			buttonLabel() {
				if ( this.payProduct.length ) {
					let price = this.formatPrice(this.payProduct[0].price.unit_amount)
					let interval = this.payProduct[0].price.recurring.interval === 'month' ? this.$i18n.t("message.month") : this.$i18n.t("message.year")
					
					return this.$i18n.t("message.PAY") + ' ' + price + '/' + interval
				} else return this.$i18n.t("message.PAY")
			},
		},
		computed: {
			...mapGetters({ paymentUrl: 'links/payment',
							googlePaymentUrl: 'links/googlePayment',
							stripePubKey: 'payments/stripePubKey',
							/* payProduct: 'payments/payProduct', */
							user: 'user/user' })
		},
		components: { StripeElements, StripeElement, GooglePay, PaymentMethods }
	}
</script>
 
 
<style lang='scss' scoped>
.card {
	max-width: 576px;
	background: var(--main-white);
	:deep(.p-card-content) {
		padding: 0;
	}
}
.pay-btn {
	min-width: 200px;
	max-width: 200px;
	justify-content: center;
	position: relative;
	.spinner-grow {
		position: absolute;
		right: 1rem;
	}
}
</style>