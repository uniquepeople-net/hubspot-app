<template>
	<div v-if="userRoleId">
		<!-- <Sidebar /> -->
		
		<Sidebar />

		<div id="main">
			<NavHeader />	
		</div>
	</div>
</template>
 
 
<script>
	// Import compiled admin template js script file
	import { app } from '../../assets/js/app';
	
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
			...mapGetters({ userRoleId: 'user/userRole' }),
		},
		watch: {
			userRoleId: function (data) {},
		},
		components: { NavHeader, Sidebar }
	}
</script>
 
 
<style lang='scss' scoped>

</style>
