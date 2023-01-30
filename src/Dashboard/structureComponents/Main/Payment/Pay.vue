<template>
	<Card class="card">
		<template #content>
			<p>4000 0025 0000 3155</p>
			<p>4000 0027 6000 3184</p>
			<p>4000 0082 6000 3178</p>
			<p>4000 0038 0000 0446</p>

			<p>4242 4242 4242 4242</p>	
			<p>2223 0031 2200 3222</p>	
			<StripeElements
				v-if="stripeLoaded"
				:stripe-key="stripePubKey"
				v-slot="{ elements }"
				ref="elms">
				<StripeElement type="card" :elements="elements" :options="cardOptions"
								ref="card" @change="cardChange($event)"/>
			</StripeElements>
		
			<Button type="button" @click="pay" label="Pay" class="mt-4 pay-btn" 
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

	export default {
		created() {
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
                            fontSize: '16px',
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
							amount: this.payProduct.amount_decimal,
							stripeToken: result.token.id,
							//billing_details: { name: 'fero' },
							userId: this.user.id,
							card: result.token.card.id,
							//returnUrl: window.location.href,
							returnUrl: window.location.origin + '/wallet/pay-status',
							productId: this.payProduct.id,
							description: this.payProduct.description,
							productName: this.payProduct.name
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
							} )
					}).catch( error => {
						Toast.fire({
							icon: 'error',
							timer: 5000,
							title: "Couldn't connect Pay service"
						})
						this.loading = false
						this.disablePay = false						
					})

					

			}
		},
		computed: {
			...mapGetters({ paymentUrl: 'links/payment',
							stripePubKey: 'payments/stripePubKey',
							payProduct: 'payments/payProduct',
							user: 'user/user' })
		},
		components: { StripeElements, StripeElement }
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