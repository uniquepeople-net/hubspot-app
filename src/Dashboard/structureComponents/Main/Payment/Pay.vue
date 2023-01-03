<template>
	<StripeElements
		v-if="stripeLoaded"
		:stripe-key="stripePubKey"
		v-slot="{ elements }"
		ref="elms">
		<StripeElement type="card" :elements="elements" :options="cardOptions"
						ref="card" @change="cardChange($event)"/>
	</StripeElements>

	<Button type="button" @click="pay" label="Pay" class="mt-2 pay-btn" iconPos="right" icon="pi pi-search">
		Pay
		<div v-if="loading" class="spinner-grow" role="status">
		</div>
	</Button>
</template>
 
 
<script>
	import { StripeElements, StripeElement } from 'vue-stripe-js'
	import { loadStripe } from '@stripe/stripe-js'
	import { mapGetters } from 'vuex'

	export default {
		props: [ 'stripeLoaded', 'stripePubKey' ],
		data() {
			return {
				loading: false,
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

				this.loading = true;
				// Access instance methods, e.g. createToken()
				groupComponent.instance.createToken(cardElement)
					.then( result => {
					// Handle result.error or result.token
						console.log(result)

						let data = {
							amount: 950, // amount should be sent in cents (700 === 7.00 eur)
							stripeToken: result.token.id,
							billing_details: { name: 'fero' },
							card: result.token.card.id 
						}

						axios.post( this.paymentUrl , data, {
							headers: {
								'Content-Type': 'application/json',
								Authorization: 'Bearer ' + User.getToken()
							}
						})
							.then( response => {
								console.log(response)
								var action = response.data[0].next_action;
								if (action && action.type === 'redirect_to_url') {
									window.location = action.redirect_to_url.url;
								}
								this.loading = false
							})
							.catch( error => {
								console.log(error)
								
								this.loading = false
							} )
					})
			}
		},
		computed: {
			...mapGetters({ paymentUrl: 'links/payment' })
		},
		components: { StripeElements, StripeElement }
	}
</script>
 
 
<style lang='scss' scoped>
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