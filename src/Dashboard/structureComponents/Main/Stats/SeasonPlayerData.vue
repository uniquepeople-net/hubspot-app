<template>
	<div class="mt-3 p-2 p-card bg-light">
		<small class="d-block">{{$t('message.Matches') + ': ' +  data.appearances }}</small>
		<small class="d-block">{{$t('message.Minutesplayed') + ': ' +  data.minutesPlayed }}</small>
		<small class="d-block">{{$t('message.Goals') + ': ' +  data.goal }}</small>
		<small class="d-block">{{$t('message.Yellowcards') + ': ' +  data.yellowCard }}</small>
		<small class="d-block">{{$t('message.Redcards') + ': ' +  data.redCards }}</small>
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