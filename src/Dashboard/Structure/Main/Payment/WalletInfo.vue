<template>
	
		<FeeInfo :user="user" class="mb-4"/>
		
		<!-- <div class="row g-4 mb-4" v-if="products">			
			<div class="col-12 col-sm-6 col-xl-4 mb-3 mb-sm-0" 
				 v-for="(product, key) in products.filter(prod => prod.active === true)">
				
				<Product :product="product" :pay="true" @product="getProduct($event)"/>		
			</div>
		</div> -->
		
		<!-- <LoadingIcon v-if="!products"/> -->
</template>
 
 
<script>
	import { mapGetters } from 'vuex'
	import FeeInfo from './FeeInfo.vue'
	import Product from '../Settings/Product.vue';

	export default {
		created() {
			this.$store.dispatch("payments/getProducts");
		},
		data() {
			return {
			}
		},
		methods: {
			getProduct(data) {
				this.$store.dispatch("payments/setPayProduct", data)
				this.$router.push({name: 'wallet-pay'})				
			}
		},
		computed: {
			...mapGetters({ products: 'payments/products',
							user: 'user/user' })
		},
		components: { FeeInfo, Product },
	}
</script>
 
 
<style lang='scss' scoped>
</style>