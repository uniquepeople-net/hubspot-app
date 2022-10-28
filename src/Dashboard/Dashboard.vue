<template>
	<div v-if="user.role_id">
		<!-- <Sidebar /> -->
		
		<Sidebar />

		<div id="main">
			<NavHeader />	
			<router-view></router-view>
		</div>
	</div>
</template>
 
 
<script>
	
	import { mapGetters } from 'vuex'; 

	import Sidebar from './structureComponents/Sidebar/Sidebar.vue'
	import NavHeader from './structureComponents/NavHeader/NavHeader.vue';


	export default {
		created() {
			if (!User.loggedIn()) {
				this.$router.push({ name: 'login' })				
			}
			this.$store.dispatch("user/getUser");
		},
		data() {
			return{
				
			}
		},
		computed: {
			...mapGetters({ user: 'user/user' }),
		},
		watch: {
			user: function (data) {},
		},
		components: { NavHeader, Sidebar }
	}
</script>
 
 
<style lang='scss' scoped>

</style>
