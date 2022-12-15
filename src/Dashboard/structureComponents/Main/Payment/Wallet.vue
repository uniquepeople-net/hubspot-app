<template>
	
	<PayStripe :stripeLoaded="stripeLoaded" :stripePubKey="stripePubKey"/>

	
</template>
 
 
<script>
	import PayStripe from './PayStripe.vue'
	import { loadStripe } from '@stripe/stripe-js'
	import { mapGetters } from 'vuex'

	export default {
		created() {
			var stripeKey = this.stripePubKey;
			const stripePromise = loadStripe(stripeKey)
			stripePromise.then( response => {
				this.stripeLoaded = true
			})
		},
		data() {
			return {
				loading: false,
				stripeLoaded: false,
			}
		},
		computed: {
			...mapGetters({ stripePubKey: 'payments/stripePubKey' })
		},
		components: { PayStripe }
	}
</script>
 
 
<style lang='scss' scoped>
</style>