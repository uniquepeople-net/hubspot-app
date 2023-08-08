<template>
	<div>
		<div v-for="scorer in scorers" :class="`scorer-wrap justify-content-${position === 'left' ? 'start' : 'end'}`">
			<Football v-if="position === 'left'" v-for="goal in Number(scorer.goals)  + Number(scorer.ownGoals)" class="soccer-ball" />
			<span class="scorer-name mx-1">{{scorer.player.shortName}}</span>
			<Football v-if="position === 'right'" v-for="goal in Number(scorer.goals)  + Number(scorer.ownGoals)" class="soccer-ball" />
		</div>
	</div>
</template>
 
 
<script>
	import Football from '../Vectors/Football.vue'
	export default {
		components: { Football },
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