<template>
	<div>
		<router-view :key="$route.fullPath" v-if="products" :products="products"></router-view>
		<LoadingIcon v-if="!products"/>
	</div>
</template>
 
 
<script>
import { mapGetters } from 'vuex'

export default {
	created() {
		this.$store.dispatch("payments/getProducts");
	},
	computed: {
		...mapGetters({ products: 'payments/products' })
	}
}
</script>
 
 
<style lang='scss' scoped>
</style>