<template>
	<div>
		<MatchCard :displayMatchStats="false"/>
	</div>
</template>
 
 
<script>
	import MatchCard from '../Global/MatchCard.vue'

	export default {
		props: ['id', 'matchId'],
		data() {
			return {
			}
		},
		methods: {
 
		},
		
		components: { MatchCard }
	}
</script>
 
 
<style lang='scss' scoped>
</style>