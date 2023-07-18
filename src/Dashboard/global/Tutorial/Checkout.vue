<template>
	<div class="full-screen position-relative">
		<BackButton title="Checkout" route="notifictions"/>
		<Checkout class="mt-5"/>
	</div>
</template>
 
 
<script>
	import Checkout from '../../structureComponents/Main/Payment/Checkout.vue'
import BackButton from '../BackButton.vue'

	export default {
		data() {
			return {
			}
		},
		methods: {
 
		},
		components: { Checkout, BackButton }
	}
</script>
 
 
<style lang='scss' scoped>
.full-screen {
	justify-content: start;
	align-items: unset;
}
</style>