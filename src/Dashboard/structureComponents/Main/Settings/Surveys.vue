<template>
	<div>
		<!-- <router-view :key="$route.fullPath" v-if="surveys" :products="surveys"></router-view> -->
		<router-view :key="$route.fullPath"></router-view>
		<LoadingIcon v-if="!surveys"/>
	</div>
</template>
 
 
<script>
import { mapGetters } from 'vuex'

export default {
	created() {
		//this.$store.dispatch("payments/getProducts");
	},
	computed: {
		//...mapGetters({ products: 'payments/products' })
	}
}
</script>
 
 
<style lang='scss' scoped>
</style>