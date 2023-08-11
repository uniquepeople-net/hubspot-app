<template>
	<div>
		<PlayerInfo class="mt-3"/>
		<Divider class="my-4 divider-light"/>
		<LastGames />
	</div>
</template>
 
 
<script>
	import LastGames from './LastGames.vue'
	import PlayerInfo from './PlayerInfo.vue'
	
	export default {
		data() {
			return {
				}
		},
		methods: {
			
		},
		components: { PlayerInfo, LastGames }
	}
</script>
 
<style lang='scss' scoped>
</style>