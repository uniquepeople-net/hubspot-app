<template>
	<div v-if="show">
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
				show: false
			}
		},
		computed: {
			...mapGetters({ user: 'user/user' }),
		},
		watch: {
			user: function (data) {
				if ( data.role_id ) {
					this.show = true
				}
			},
		},
		components: { NavHeader, Sidebar }
	}
</script>
 
 
<style lang='scss' scoped>

</style>
