<template>
	<div>
		<google-pay-button
			:buttonLocale="this.$i18n.locale"
			environment="PRODUCTION"
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
	</div>
</template>
 
 
<script>
	import '@google-pay/button-element';
	import { loadStripe } from '@stripe/stripe-js'

	export default {
		props: {
			product: Object,
			user: Object,
			url: String,
			stripeKey: String
		},
		created() {
			//console.log('created')
			
			const stripeKey = this.stripeKey;
			const stripePromise = loadStripe(stripeKey)
			stripePromise.then( response => {
				this.stripeLoaded = true
				this.stripe = response
			})
		},
 		unmounted() {
			//console.log('script')
			/* const script = document.querySelector('script[src="https://pay.google.com/gp/p/js/pay.js"]');
			
			if (script) {
				script.parentNode.removeChild(script);
			} */
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
						totalPrice: this.product.price,
						currencyCode: 'EUR',
						countryCode: 'SK'
					}
				},
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
						if (result.error) {
							console.log(result.error)							
							// Handle any errors that occurred during payment method creation
						} else {
							var paymentMethod = result.paymentMethod;														
							// Process the payment method or send it to your server for further processing

							let data = {
								returnUrl: window.location.origin + '/' + this.$i18n.locale + '/wallet/pay-status',
								productId: this.product.id,
								priceId: this.product.default_price,
								description: this.product.name,
								userId: this.user.id,
								productName: this.product.name, 
								methodId: paymentMethod.id,
								email: this.user.email,
								varSymbol: this.user.var_symbol,
								stripeToken: token.id,
								result: paymentMethod,
								googlePay: true
								/* amount: this.product.amount_decimal,
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

								const success = response.data.charge.status
								if ( success && success === 'succeeded' ) {
									window.location = window.location.origin + '/' + this.$i18n.locale + '/wallet/pay-status'
								} else {
									Toast.fire({
										icon: 'error',
										timer: 8000,
										title: response.data.charge.status
									})								
									/* this.loading = false
									this.disablePay = false */
								}
							})
							.catch( error => {
								Toast.fire({
									icon: 'error',
									timer: 5000,
									title: "Couldn't connect Pay service"
								})								
								//this.loading = false
								//this.disablePay = false
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
				return (this.product.price.unit_amount / 100).toString()
			}
		},
	}
</script>
 
 
<style lang='scss' scoped>
</style>