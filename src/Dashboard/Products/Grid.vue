<template>
	<div>
		grid
	</div>
</template>
 
 
<script>
import { mapGetters } from 'vuex'

export default {
	created() {
		this.$store.dispatch('products/getProducts', '?limit=10&archived=false' )
	},
	data() {
		return {
		}
	},
	methods: {

	},
	computed: {
		...mapGetters({ products: 'products/list' })
	}
}
</script>
 
 
<style lang='scss' scoped>
</style>