<template>
	<div>
		<LastGames />
		<LineUps />
	</div>
</template>
 
 
<script>
	import LastGames from "../Global/LastGames.vue"
	import LineUps from './Lineups/Lineups.vue'

	export default {
		data() {
			return {
			}
		},
		methods: {
 
		},
		components: { LastGames, LineUps }
	}
</script>
 
 
<style lang='scss' scoped>
</style>