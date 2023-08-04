<template>
	<div>
		<BackButton :title="$t('message.Payment')" class="mb-4" route="my-board"/>
		<Card class="card" v-if="status">
			<template #content>
				<div class="d-flex flex-column align-items-center">
					<i v-if="statusBool" class="pi pi-check-circle" :style="{fontSize: '4rem', color: 'var(--green-400)' }"></i>
		            <i v-if="!statusBool" class="pi pi-times-circle" :style="{fontSize: '4rem', color: 'var(--red-400)' }"></i>
					<h3 class="mt-4">Payment {{ status }}</h3>
				</div>
			</template>
		</Card>
	</div>
</template>
 
 
<script>
	import { loadStripe } from '@stripe/stripe-js'
	import { mapGetters } from 'vuex'
	import BackButton from '../../../global/BackButton.vue'

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
							this.id = paymentIntent.id
							window.localStorage.removeItem("cs")

							// Update fee when payment is successful
							axios.post( this.updateFeeUrl + this.user.id, { fee: true, id: this.id }, {
									headers: {
										Authorization: 'Bearer ' + User.getToken()
									}
								}).then( response => {
									this.$store.dispatch("user/getUser");
								}).catch( error => {
									Toast.fire({
										icon: 'error',
										timer: 5000,
										title: "Couldn't update your fee status"
									})
								})
						}

						// Update payment status in paymets table depending on commited payment
						axios.post( this.paymentUpdateUrl + paymentId, { status: this.status }, {
								headers: {
									Authorization: 'Bearer ' + User.getToken()
								}
							}).then( response => {
								//console.log(response)							
							}).catch( error => {
								Toast.fire({
									icon: 'error',
									timer: 5000,
									title: "Couldn't update Payment status"
								})
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
		components: { BackButton }
	}
</script>
 
 
<style lang='scss' scoped>
.card {
	max-width: 768px;
	margin: auto;
}
</style>