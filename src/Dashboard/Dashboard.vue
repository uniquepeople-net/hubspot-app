<template>
	<Sidebar></Sidebar>
</template>
 
 
<script>
	import Sidebar from '../Dashboard/structureComponents/Sidebar/Sidebar.vue'
	// Import admin template js script file
	import { app } from '../../assets/js/app';


	export default {
		created() {
			if (!User.loggedIn()) {
				this.$router.push({ name: 'login' })				
			}
			this.$store.dispatch("user/getUser");	
		},
		mounted() {
			app()
		},
		components: { Sidebar }
	}
</script>
 
 
<style lang='scss' scoped>



</style>
