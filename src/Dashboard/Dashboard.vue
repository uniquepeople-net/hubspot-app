<template>
	dashboard
</template>
 
 
<script>
	export default {
		created() {
			if (!User.loggedIn()) {
				this.$router.push({ name: 'login' })				
			}
			this.$store.dispatch("user/getUser");	
		},
		data() {
			return {
			}
		},
		methods: {
 
		},
	}
</script>
 
 
<style lang='scss' scoped>



</style>