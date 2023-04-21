<template>
	<div>
		<PlayerStatsChart v-if="match" :match="match"/>
	</div>
</template>
 
 
<script>
	import PlayerStatsChart from './PlayerStatsChart.vue'

	export default {
		props: ['id', 'matchId'],
		created() {
			this.$store.dispatch('stats/getPalyerStats', { id: this.id, matchId: this.matchId } )
		},
		data() {
			return {
			}
		},
		methods: {
 
		},
		components: { PlayerStatsChart }
	}
</script>
 
 
<style lang='scss' scoped>
</style>