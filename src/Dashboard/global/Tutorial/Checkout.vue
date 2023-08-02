<template>
	<div class="checkout-wrapper position-relative m-auto">
		<div class="checkout-tab center-center flex-column">
			<BackButton title="Checkout" route="tutorial"/>
			<Checkout class="mt-5"/>
		</div>
	</div>
</template>
 
 
<script>
	import { mapGetters } from 'vuex'
	import Checkout from '../../structureComponents/Main/Payment/Checkout.vue'
	import BackButton from '../BackButton.vue'

	export default {
		created() {
			if ( this.user.fee ) {
				this.$router.push({ name: 'my-board' })
			}
		},
		data() {
			return {
			}
		},
		methods: {
			
		},
		computed: {
			...mapGetters({ user: 'user/user' })
		},
		components: { Checkout, BackButton }
	}
</script>
 
 
<style lang='scss' scoped>
.checkout-wrapper {
	width: 100vw;
	height: 100vh;
	display: flex;
	flex-direction: column;
	//justify-content: center;
	align-items: center;
	.checkout-tab {
		padding: 1rem;
		max-width: 576px;
	}
	.back-button {
		position: absolute;
		top: 1.5rem;
		left: 1.5rem;
	}
}
.full-screen {
	justify-content: start;
	align-items: unset;
}
</style>