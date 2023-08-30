<template>
	<div>
		<google-pay-button
			:buttonLocale="this.$i18n.locale"
			environment='TEST'
			button-type="pay"
			v-bind:paymentRequest.prop="{
				apiVersion: 2,
				apiVersionMinor: 0,
				allowedPaymentMethods: [
					{
						type: 'CARD',
						parameters: {
							allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
							allowedCardNetworks: ['AMEX', 'VISA', 'MASTERCARD']
						},
						tokenizationSpecification: {
							type: 'PAYMENT_GATEWAY',
							parameters: {
								'gateway': 'stripe',
								'stripe:version': '2018-10-31',
								'stripe:publishableKey': stripeKey
							}
						}
					}
				],
				merchantInfo: {
					merchantId: 'BCR2DN4TUKTLNN3V',
					merchantName: 'Únia futbalových profesionálov',
				},
				transactionInfo: {
					totalPriceStatus: 'FINAL',
					totalPriceLabel: 'Total',
					totalPrice: amount,
					currencyCode: 'EUR',
					countryCode: 'SK'
				}
			}"
			v-on:loadpaymentdata="onLoadPaymentData"
			v-on:error="onError"
			v-on:readytopaychange="onReadyToPayChange"
			v-on:click="onClick">
		</google-pay-button>

		<LoadingModal :loading="loading"/>
	</div>
</template>
 
 
<script>
	import { loadStripe } from '@stripe/stripe-js'
	import '@google-pay/button-element';
	import LoadingModal from '../../../global/LoadingModal.vue';

	export default {
	components: { LoadingModal },
		props: {
			product: Object,
			user: Object,
			url: String,
			stripeKey: String
		},
		created() {
			const stripeKey = this.stripeKey;
			const stripePromise = loadStripe(stripeKey)
			stripePromise.then( response => {
				this.stripeLoaded = true
				this.stripe = response
			})
		},
  		data() {
			return {
				stripe: null,
				stripeLoaded: false,
				amount: this.amountString(),
				existingPaymentMethodRequired: false,
				buttonColor: 'default',
				buttonType: 'buy',
				paymentRequest: {
					apiVersion: 2,
					apiVersionMinor: 0,
					allowedPaymentMethods: [
						{
						type: 'CARD',
						parameters: {
							allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
							allowedCardNetworks: ['MASTERCARD', 'VISA'],
						},
						tokenizationSpecification: {
							type: 'PAYMENT_GATEWAY',
							parameters: {
								gateway: 'example',
								gatewayMerchantId: 'exampleGatewayMerchantId',
							},
						},
						},
					],
					merchantInfo: {
						merchantId: 'BCR2DN4TUKTLNN3V',
						merchantName: 'Únia futbalových profesionálov',
					},
					transactionInfo: {
						totalPriceStatus: 'FINAL',
						totalPriceLabel: 'Total',
						totalPrice: this.product[0].price,
						currencyCode: 'EUR',
						countryCode: 'SK'
					}
				},
				loading: false
			}
		},
		methods: {
			async onLoadPaymentData(event) {
				//console.log('load payment data', event.detail.paymentMethodData);
				
				let token =  JSON.parse(event.detail.paymentMethodData.tokenizationData.token)
				
				// Create a payment method in Stripe using the Google Pay token
				this.stripe.createPaymentMethod({				
						type: 'card',
						card: {
							token:token.id
						}					
					}).then((result) => {
						
						this.loading = true

						console.log(this.loading)
						

						if (result.error) {
							// Handle any errors that occurred during payment method creation
						} else {
							var paymentMethod = result.paymentMethod;														
							// Process the payment method or send it to your server for further processing

							let data = {
								returnUrl: window.location.origin + '/' + this.$i18n.locale + '/wallet/pay-status',
								productId: this.product[0].id,
								priceId: this.product[0].default_price,
								description: this.product[0].name,
								userId: this.user.id,
								productName: this.product[0].name, 
								methodId: paymentMethod.id,
								email: this.user.email,
								varSymbol: this.user.var_symbol,
								stripeToken: token.id,
								result: paymentMethod,
								googlePay: true,
								membership_id: this.product[0].metadata.membership_id,
								interval: this.product[0].price.recurring ? this.product[0].price.recurring.interval : null,
								customer_id: this.user.stripe_customer_id,
								upgradeSubscriptionId: this.product[1] && 'id' in this.product[1] ? this.product[1].id : null
								/* amount: this.product[0].amount_decimal,
								//billing_details: { name: 'fero' },
								//returnUrl: window.location.href,*/
							}

							
							
							axios.post( this.url , data, {
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

								this.loading = false

								const success = response.data.charge.status
								if ( success && success === 'succeeded' ) {
									window.location = window.location.origin + '/' + this.$i18n.locale + '/wallet/pay-status'
								} else {
									Toast.fire({
										icon: 'error',
										timer: 8000,
										title: response.data.charge.status
									})								
								}
							})
							.catch( error => {
								Toast.fire({
									icon: 'error',
									timer: 5000,
									title: "Couldn't connect Pay service"
								})								
								this.loading = false
							})
						}
				});

				
			},
			onError: event => {
				//console.error('error', event.error);
			},
			onPaymentDataAuthorized: paymentData => {
				//console.log('payment authorized', paymentData);
				return {
					transactionState: 'SUCCESS',
				};
			},
			onReadyToPayChange: event => {
				//console.log('ready to pay change', event.detail);
			},
			onClick: () => {
				//console.log('click');
			},
			onClickPreventDefault: event => {
				//console.log('prevent default');
				event.preventDefault();
			},
			amountString() {
				return (this.product[0].price.unit_amount / 100).toString()
			}
		},
	}
</script>
 
 
<style lang='scss' scoped>
</style>