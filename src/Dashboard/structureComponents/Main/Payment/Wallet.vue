<template>
	
	<router-view></router-view>
	
</template>
 
 
<script>
	export default {
		created() {
			this.$store.dispatch("payments/getProducts");
		}
	}
</script>
 
 
<style lang='scss' scoped>
</style>