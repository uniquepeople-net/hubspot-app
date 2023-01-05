<template>
	pay status
	pi_3MMuuDCf79OEZcUi0MMLkFcH_secret_j0kudTJZqAuJ8G3mofoiEsVRz
</template>
 
 
<script>
	import { loadStripe } from '@stripe/stripe-js'
	import { mapGetters } from 'vuex'

	export default {
		created(){
			var stripeKey = this.stripePubKey;
			const stripePromise = loadStripe(stripeKey)
			stripePromise.then( response => {
				

				(async () => {
					const {paymentIntent, error} = await response.retrievePaymentIntent('pi_3MMuuDCf79OEZcUi0MMLkFcH_secret_j0kudTJZqAuJ8G3mofoiEsVRz');
					if (error) {
						console.log(error)
						
					} else if (paymentIntent && paymentIntent.status === 'succeeded') {
						// Handle successful payment here
						console.log(paymentIntent)
						
					}
				})();

			})
			
			

			
		},
		data() {
			return {
			}
		},
		methods: {
 
		},
		computed: {
			...mapGetters({ stripePubKey: 'payments/stripePubKey' })
		},
	}
</script>
 
 
<style lang='scss' scoped>
</style>