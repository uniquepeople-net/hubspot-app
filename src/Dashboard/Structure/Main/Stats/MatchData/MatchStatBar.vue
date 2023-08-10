<template>
	<div class="mt-4 stat-wrapper">
		<div class="bar-dark" :style="`width: ${calculateValue(values.team1, false)}%; ${values.team2 === 0 ? 'border-top-right-radius:inherit;' : ''}`">
		</div>
		<div class="bar-black" :style="`width: ${calculateValue(values.team2, false)}%; ${values.team1 === 0 ? 'border-top-left-radius:inherit;' : ''}`">
		</div>
		<div class="d-flex justify-content-between align-items-center w-100 p-2">
			<span class="value-num ms-3">
				{{ values.team1 }}<span v-if="percentage">%</span>
			</span>
			<h6 class="title mb-0">{{ title }}</h6>
			<span class="value-num me-3">
				{{ values.team2 }}<span v-if="percentage">%</span>
			</span>
		</div>
	</div>
</template>
 
 
<script>
	import ProgressBar from 'primevue/progressbar';

	export default {
		props: {
			title: String,
			values: Object,
			percentage: Boolean
		},
		data() {
			return {
			}
		},
		methods: {
			calculateValue(team, num = true) {
				let team1Value = this.values.team1
				let team2Value = this.values.team2
				let value = team / ((team1Value + team2Value) / 100)

				return value
			},
			bgClass( team1, team2 ) {
				return (team1 > team2 || team1 === team2) ? 'bar-black' : 'bar-dark'
			}
		},
		components: { ProgressBar },
	}
</script>
 
 
<style lang='scss' scoped>
@import '../../../../../scss/_mixins.scss';

.stat-wrapper {
	background: var(--card-bg);
	border-radius: var(--btn-border-radius);
	box-shadow: var(--card-shadow) 1.95px 1.95px 0px;
	display: flex;
	flex-wrap: wrap;
	color: var(--main-dark);
	.bar-dark, .bar-black {
		height: 7px;
		display: inline-block;
	}
	.bar-dark {
		border-top-left-radius: inherit;
		background: var(--stat-chart-bg);
	}
	.bar-black	{
		background: var(--main-dark);
		border-top-right-radius: inherit;
	}
	.title {
		font-size: 1rem;
		font-weight: 500;
	}
	.value-num {
		font-size: 24px;
		font-weight: 600;
	}
}

@media(min-width: 576px) {
	.title {
		font-size: remsize(24);
	}
}
</style>