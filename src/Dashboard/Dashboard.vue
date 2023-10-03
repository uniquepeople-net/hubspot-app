<template>
	<div class="dashboard">

		<Grid />
		
	</div>
</template>
 
<script>	
	import { mapGetters } from 'vuex'; 
	import Grid from './Products/Grid.vue';

	export default {
		created() {	
			if(!User.loggedIn(this.googleUrl)) {
				this.$router.push({ name: 'login' })
			}
		},
		data() {
			return{
				show: true, 
			}
		},
		computed: {
			...mapGetters({ googleUrl: 'login/googleUrl' })
		},
		components: { Grid }
	}

</script>
 
 
<style lang='scss' scoped>
.dashboard {
	//background-color: var(--bg-color);
	min-height: 100vh;
}

</style>
