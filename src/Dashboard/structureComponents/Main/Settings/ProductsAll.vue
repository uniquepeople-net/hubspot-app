<template>
	<div>
		<h4 class="mb-4">Products</h4>
		<div class="row" v-if="products">			
			<div class="col-12 col-sm-6 col-xl-4 mb-3 mb-sm-0" v-for="(product, key) in products">
				<Product :product="product"/>
			</div>
		</div>	
	</div>
</template>
 
 
<script>
	import Product from './Product.vue';
	import { mapGetters } from 'vuex';

	export default {
		props: {
			products: Array
		},
		components: { Product }
	}
</script>
 
 
<style lang='scss' scoped>
</style>