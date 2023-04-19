<template>
	<div>
		<div v-for="scorer in scorers" :class="`scorer-wrap justify-content-${position === 'left' ? 'start' : 'end'}`">
			<img v-if="position === 'left'" v-for="goal in Number(scorer.goals)  + Number(scorer.ownGoals)" class="soccer-ball" src="../../../../../assets/images/football.png" alt="">
			<span class="scorer-name mx-1">{{scorer.player.shortName}}</span>
			<img v-if="position === 'right'" v-for="goal in Number(scorer.goals)  + Number(scorer.ownGoals)" class="soccer-ball" src="../../../../../assets/images/football.png" alt="">
		</div>
	</div>
</template>
 
 
<script>
	export default {
		props: {
			scorers: Array,
			position: String
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
.soccer-ball {
	width: 15px;
}
.scorer-wrap {
	display: flex;
	align-items: center;
	flex-wrap: wrap;
}
@media( min-width: 576px ) {
	.scorer-name {
		font-size: 1.1rem;
	}
}
</style>