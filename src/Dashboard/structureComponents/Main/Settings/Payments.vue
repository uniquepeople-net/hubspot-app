<template>
	<h4 class="mb-4">Products</h4>
	<div class="row" v-if="products">			
		<div class="col-12 col-sm-6 col-md-4 mb-3 mb-sm-0" v-for="(product, key) in products">
			<Product :product="product"/>
		</div>
	</div>	
</template>
 
 
<script>
	import Product from './Product.vue';
	import { mapGetters } from 'vuex';

	export default {
		created() {
			this.$store.dispatch("payments/getProducts");
		},
		data() {
			return {
			}
		},
		methods: {
 
		},
		computed: {
			...mapGetters({ products: 'payments/products' }),
		},
		components: { Product }
	}
</script>
 
 
<style lang='scss' scoped>
</style>