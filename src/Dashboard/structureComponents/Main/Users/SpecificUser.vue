<template>
	user : {{ id }}
</template>
 
 
<script>
	export default {
		created() {

			console.log(this.id)
			

			axios.get( 'http://localhost:80/api/users/' + this.id , {
				headers: {
					Authorization: 'Bearer ' + User.getToken()
				}
			} ).then(
				response => console.log(response)				
			)
		},
		data() {
			return {
				id: this.$route.params.user_id
			}
		},
		methods: {
 
		},
	}
</script>
 
 
<style lang='scss' scoped>
</style>