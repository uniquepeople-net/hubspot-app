<template>
	<div>
		<google-pay-button
			environment="TEST"
			button-type="buy"
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
							gateway: 'example',
							gatewayMerchantId: 'exampleGatewayMerchantId'
						}
						}
					}
				],
				merchantInfo: {
					merchantId: 'BCR2DN4T7LRLJQSS',
					merchantName: 'UFP',
				},
				transactionInfo: {
					totalPriceStatus: 'FINAL',
					totalPriceLabel: 'Total',
					totalPrice: '1.00',
					currencyCode: 'EUR',
					countryCode: 'SK'
				}
			}"
			v-on:loadpaymentdata="onLoadPaymentData"
			v-on:error="onError"
			v-on:readytopaychange="onReadyToPayChange">
		</google-pay-button>
	</div>
</template>
 
 
<script>
	import '@google-pay/button-element';

	export default {
		data() {
			return {
				amount: '1.00',
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
						merchantId: '12345678901234567890',
						merchantName: 'Demo Merchant',
					},
					transactionInfo: {
						totalPriceStatus: 'FINAL',
						totalPriceLabel: 'Total',
						totalPrice: '1.00',
						currencyCode: 'EUR',
						countryCode: 'SK'
					}
				},
			}
		},
		methods: {
			onLoadPaymentData: event => {
				console.log('load payment data', event.detail);
			},
			onError: event => {
				console.error('error', event.error);
			},
			onPaymentDataAuthorized: paymentData => {
				console.log('payment authorized', paymentData);
				return {
					transactionState: 'SUCCESS',
				};
			},
			onReadyToPayChange: event => {
				//console.log('ready to pay change', event.detail);
			},
			onClick: () => {
				console.log('click');
			},
			onClickPreventDefault: event => {
				console.log('prevent default');
				event.preventDefault();
			},
		},
	}
</script>
 
 
<style lang='scss' scoped>
</style>