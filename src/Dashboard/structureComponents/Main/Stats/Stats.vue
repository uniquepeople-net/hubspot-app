<template>

	<router-view></router-view>

</template>
 
 
<script>
	import { mapGetters } from 'vuex';
	
	export default {
		created() {
			this.$store.dispatch('stats/getPlayerCareer', this.user.instat_id )
			this.$store.dispatch('stats/getPlayerMatches', this.user.instat_id )
		},
		computed: {
			...mapGetters({ user: 'user/user' }),
		}
	}
</script>
 
 
<style lang='scss' scoped>

</style>