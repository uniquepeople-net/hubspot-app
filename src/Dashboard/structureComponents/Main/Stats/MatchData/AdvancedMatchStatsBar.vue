<template>
	<div class="row g-1 mt-2">
		<h6 class="title mb-0">{{title}}</h6>
		<div :class="`col-6 bar-left ${bgClass(values.team1, values.team2)} }`">
			<ProgressBar :value="calculateValue(values.team1)"> {{ values.team1 }} </ProgressBar>
		</div>
		<div :class="`col-6 bar-right ${bgClass(values.team2, values.team1)}`">
			<ProgressBar :value="calculateValue(values.team2)">{{ values.team2 }}</ProgressBar>
		</div>
	</div>
</template>
 
 
<script>
	import ProgressBar from 'primevue/progressbar';

	export default {
		props: {
			title: String,
			values: Object
		},
		data() {
			return {
			}
		},
		methods: {
			calculateValue(team) {
				let team1Value = this.values.team1
				let team2Value = this.values.team2

				return team / ((team1Value + team2Value) / 100)
			},
			bgClass( team1, team2 ) {
				return (team1 > team2 || team1 === team2) ? 'bar-light' : 'bar-dark'
			}
		},
		components: { ProgressBar },
	}
</script>
 
 
<style lang='scss' scoped>
.bar-dark {
	:deep(.p-progressbar-value) {
		background: var(--bluegray-500);
	}
}
.bar-light	{
	:deep(.p-progressbar-value) {
		background: var(--bluegray-700);
	}
}
.bar-left {
	:deep(.p-progressbar-value) {
		right: 0;
		justify-content: end;
		.p-progressbar-label {
			font-weight: 600;
			margin-right: .5rem;
		}
	}
}
.bar-right {
	:deep(.p-progressbar-value) {
		justify-content: start;
		.p-progressbar-label {
			font-weight: 600;
			margin-left: .5rem;
		}
	}
}
.title {
	font-size: .8rem;
	text-align: center;
}
:deep(.p-progressbar) {
	border-radius: 100px;
}
@media(min-width: 576px) {
	.title {
		font-size: 1.1rem;
	}
}
</style>