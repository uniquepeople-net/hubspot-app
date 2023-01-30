<template>

</template>
 
 
<script>
	export default {
		created() {
			User.clearStorage();
			this.$store.commit('user/RESETSTATE')
			this.$store.commit('users/RESETSTATE')
			this.$store.commit('appData/RESETSTATE')
			this.$store.commit('specificUser/RESETSTATE')
			//this.$store.commit('stats/RESETSTATE')
			this.$store.commit('statsData/RESETSTATE')
			this.$store.commit('emails/RESETSTATE')
			this.$store.commit('payments/RESETSTATE')
			this.$store.commit('groups/RESETSTATE')
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