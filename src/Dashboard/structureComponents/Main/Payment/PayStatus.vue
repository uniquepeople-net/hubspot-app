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
			var stripeKey = this.stripePubKey;
			const stripePromise = loadStripe(stripeKey)
			
			let clientSecret = window.localStorage.getItem("cs")
			let paymentId = window.localStorage.getItem("pay-id");

			stripePromise.then( response => {
				(async () => {
					
					const {paymentIntent, error} = await response.retrievePaymentIntent(clientSecret);
					if (error) {
						this.status = 'failed'
					} else if (paymentIntent && paymentIntent.status === 'succeeded') {
						this.status = paymentIntent.status
						window.localStorage.removeItem("cs")

					}

					axios.post( this.paymentUpdateUrl + paymentId, { status: this.status }, {
							headers: {
								Authorization: 'Bearer ' + User.getToken()
							}
						}).then( response => {
							console.log(response)							
						})
						
					//axios.post()

				})();
			})
						
		},
		data() {
			return {
				status: 'succeeded'
			}
		},
		methods: {
			
		},
		computed: {
			...mapGetters({ stripePubKey: 'payments/stripePubKey',
							paymentUpdateUrl: 'links/paymentUpdate' }),
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