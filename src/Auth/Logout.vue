<template>

</template>
 
 
<script>
	export default {
		created() {
			User.clearStorage();
			this.$store.commit('user/RESETSTATE')
			Toast.fire({
				icon: 'success',
				title: 'Logout successfully'
			})
			this.$router.push({ name: 'login' })
		}
	}
</script>
 
 
<style lang='scss' scoped>

</style>