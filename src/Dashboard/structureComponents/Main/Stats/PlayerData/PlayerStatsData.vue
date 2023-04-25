<template>
	<div>
		<MatchCard :displayMatchStats="false"/>
	</div>
</template>
 
 
<script>
	import { mapGetters } from 'vuex';
	import MatchCard from '../../../../global/MatchCard.vue'

	export default {
		props: ['id', 'matchId'],
		data() {
			return {
			}
		},
		methods: {
 
		},
		computed: {
			...mapGetters({ match: 'stats/matchDetails' }),
		},
		components: { MatchCard }
	}
</script>
 
 
<style lang='scss' scoped>
</style>