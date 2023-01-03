<template>
	<router-view :key="$route.fullPath" v-if="products" :products="products"></router-view>
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