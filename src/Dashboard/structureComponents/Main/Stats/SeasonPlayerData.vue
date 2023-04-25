<template>
	<div class="mt-3 p-2 p-card bg-light">
		<small class="d-block">Matches: {{ data.appearances }}</small>
		<small class="d-block">Minutes played: {{ data.minutesPlayed }}</small>
		<small class="d-block">Goals: {{ data.goal }}</small>
		<small class="d-block">Yellow cards: {{ data.yellowCard }}</small>
		<small class="d-block">Red cards: {{ data.redCards }}</small>
	</div>
</template>
 
 
<script>
	export default {
		props: {
			data: Object
		},
		data() {
			return {
			}
		},
		methods: {
 
		},
	}
</script>
 
 
<style lang='scss' scoped>
</style>