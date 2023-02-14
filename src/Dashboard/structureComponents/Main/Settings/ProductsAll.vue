<template>
	<div>
		<h4 class="mb-4">Products</h4>
		<Button label="Add New Product" icon="pi pi-book" class="p-button-raised p-button-info mt-4" @click="addNewProduct"/>
		
		<div class="row g-4 mt-3" v-if="products">			
			<div class="col-12 col-sm-6 col-xl-4 col-xxl-3 mb-3 mb-sm-0" v-for="(product, key) in products">
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
		methods: {
			addNewProduct() {
				this.$router.push({name: 'add-new-product'})			
			}
		},
		components: { Product }
	}
</script>
 
 
<style lang='scss' scoped>
</style>