<template>
	<div>
		<Checkout class="checkout-page"/>
	</div>
</template>
 
 
<script>
	import Checkout from './Checkout.vue'
	export default {
		data() {
			return {
				}
		},
		methods: {
			
		},
		components: { Checkout },
	}
</script>
 
 
<style lang='scss' scoped>
.checkout-page {
	max-width: 576px;
	margin: auto;
}
</style>