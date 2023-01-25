<template>
	<Card class="card" v-if="status">
		<template #content>
			<div class="d-flex flex-column align-items-center">
				<i v-if="statusBool" class="pi pi-check-circle" :style="{fontSize: '4rem', color: 'var(--green-400)' }"></i>
	            <i v-if="!statusBool" class="pi pi-times-circle" :style="{fontSize: '4rem', color: 'var(--red-400)' }"></i>
				<h3 class="mt-4">Payment {{ status }}</h3>
			</div>
		</template>
	</Card>
</template>
 
 
<script>
	import { loadStripe } from '@stripe/stripe-js'
	import { mapGetters } from 'vuex'

	export default {
		created(){			
			let clientSecret = window.localStorage.getItem("cs")
			let paymentId = window.localStorage.getItem("pay-id");

			if ( clientSecret ) {
				var stripeKey = this.stripePubKey;
				const stripePromise = loadStripe(stripeKey)

				stripePromise.then( response => {
					(async () => {
						
						const {paymentIntent, error} = await response.retrievePaymentIntent(clientSecret);
						if (error) {
							this.status = 'failed'
						} else if (paymentIntent && paymentIntent.status === 'succeeded') {
							this.status = paymentIntent.status
							window.localStorage.removeItem("cs")

							// Update fee when payment is successful
							axios.post( this.updateFeeUrl + this.user.id, { fee: true }, {
									headers: {
										Authorization: 'Bearer ' + User.getToken()
									}
								}).then( response => {
									this.$store.dispatch("user/getUser");
								})
						}

						// Update payment status in paymets table depending on commited payment
						axios.post( this.paymentUpdateUrl + paymentId, { status: this.status }, {
								headers: {
									Authorization: 'Bearer ' + User.getToken()
								}
							}).then( response => {
								//console.log(response)							
							})

					})();
				})
			} else {					
				this.$router.push({ name: 'wallet-info' })
			}
						
		},
		data() {
			return {
				status: null
			}
		},
		computed: {
			...mapGetters({ stripePubKey: 'payments/stripePubKey',
							user: 'user/user',
							paymentUpdateUrl: 'links/paymentUpdate',
							updateFeeUrl: 'links/updateFee' }),
			statusBool() {
				return this.status == 'succeeded' ? true : false
			}
		},
	}
</script>
 
 
<style lang='scss' scoped>
.card {
	max-width: 768px;
	margin: auto;
}
</style>