<template>
	<div class="login flex-column">
		<h5 class="mb-5">Hubspot app</h5>
		<GoogleLogin :callback="callback" prompt class="google-oauth"/>
	</div>
</template>
 
 
<script>
import { mapGetters } from 'vuex'
import { decodeCredential } from 'vue3-google-login'

export default {
    methods: {
		callback(response) {
			const userData = decodeCredential(response.credential)

			let authorized = User.responseAfterLogin(response.credential, this.googleUrl )

			if ( authorized ) {
				this.$router.push({ name: 'dashboard' })
			}			
		}
    },
	computed: {
		...mapGetters({ googleUrl: 'login/googleUrl' })
	},
}
</script>
 
 
<style lang='scss' scoped>
.login {
	width: 100vw;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>