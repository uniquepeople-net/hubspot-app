<template>

</template>
 
 
<script>
	export default {
		created() {
			User.clearStorage();
			this.$store.commit('user/RESETSTATE')
			this.$store.commit('users/RESETSTATE')
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