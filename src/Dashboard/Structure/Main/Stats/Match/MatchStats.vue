<template>
	<div>
		<LastGames />
		<LineUps />
		<AdvStats />
	</div>
</template>
 
 
<script>
	import LastGames from "../Global/LastGames.vue"
	import AdvStats from './AdvStats/AdvStats.vue'
	import LineUps from './Lineups/Lineups.vue'

	export default {
		data() {
			return {
			}
		},
		methods: {
 
		},
		components: { LastGames, LineUps, AdvStats }
	}
</script>
 
 
<style lang='scss' scoped>
</style>