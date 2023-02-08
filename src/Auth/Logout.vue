<template>

</template>
 
 
<script>
	import { mapGetters } from 'vuex'

	export default {
		created() {

			axios.post( this.logoutLInk , null, {
						headers: {
							Authorization: 'Bearer ' + User.getToken()
						}
					}).then( response => {
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
							title: response.data.message
						})
						this.$router.push({ name: 'login' })
					})
					.catch( error => {
						if ( error.response.status >= 400 && error.response.status < 500 ) {
							Toast.fire({
								icon: 'error',
								timer: 5000,
								title: error.response.data.message
							}) 
						} else {
							Toast.fire({
								icon: 'error',
								timer: 5000,
								title: 'Server error, try again later'
							}) 
						}
						this.$router.push('my-board');
					})
		},
		methods: {
			toggleDialog() {
				this.showMessage = !this.showMessage;
			},
		},
 		computed: {
			...mapGetters({ logoutLInk: 'links/logoutApiGwUrl' }),
		},

	}
</script>
 
 
<style lang='scss' scoped>

</style>