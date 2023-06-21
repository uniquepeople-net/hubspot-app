<template>
	<div :class="`player-stat-bar ${small && 'small-type'}`">
		<h6 class="title mb-3">{{title + ' (' + completeData + ')'}}</h6>
		<div>
			<div class="player-stat-bar--chart bar-dark" 
				 :style="`width: ${calculateValue(data1, false)}%; ${data2 === 0 ? 'border-radius:9px 9px 9px 9px;' : ''}`"></div>
			<div class="player-stat-bar--chart bar-black" 
				 :style="`width: ${calculateValue(data2, false)}%; ${data1 === 0 ? 'border-radius:9px 9px 9px 9px;' : ''}`"></div>
		</div>
		<div :class="'player-stat-bar--card flex-' + direction">
			<div :class="`app-card ${direction === 'row' ? 'me-1' : 'mb-2'}`">
				<span class="card-title">
					<slot name="icon1"></slot>
					<span>{{ successText ? successText : $t('message.Successful') }}</span>
				</span>
				<span class="value">{{ data1 }}</span>
			</div>
			<div :class="`app-card ${direction === 'row' ? 'ms-1' : ''}`">
				<span class="card-title">
					<slot name="icon2"></slot>
					<span>{{ failedText ? failedText :  $t('message.Failed') }}</span>
				</span>
				<span class="value">{{ data2 }}</span>
			</div>
		</div>
	</div>
</template>
 
 
<script>
	export default {
		props: {
			title: String,
			data1: Number,
			data2: Number,
			completeData: Number,
			direction: String,
			successText: String,
			failedText: String,
			small: Boolean
		},
		data() {
			return {
			}
		},
		methods: {
			calculateValue(team, num = true) {
				let team1Value = this.data1
				let team2Value = this.data2
				let value = team / ((team1Value + team2Value) / 100)

				return value
			},
		},
	}
</script>
 
 
<style lang='scss' scoped>
@import "../../../../../scss/_mixins.scss";

.player-stat-bar {
	color: var(--main-dark);
	margin: 1rem 0;
	.title {
		font-size: rem(20);
		font-weight: 600;
	}
	&--card {
		display: flex;
		.app-card {
			width: 100%;
			padding: .3rem 1rem;
		}
		& .card-title {
			display: flex;
			align-items: center;
			span {
				margin-left: 1rem;
				font-weight: 500;
			}
		}
		.value {
			font-size: rem(32);
			font-weight: 600;
		}
	}
	&--chart {
		display: inline-block;
		height: rem(20);
	}
	.bar-dark {
		border-radius: 9px 0 0 9px;
		background: var(--stat-chart-bg);
	}
	.bar-black	{
		background: var(--main-dark);
		border-radius: 0 9px 9px 0;
	}
}
.small-type {
	.title {
		font-size: rem(14);
	}
	& .card-title {
		span {
			font-size: rem(12);
		}
	}
	.value {
		font-size: rem(23.5);
	}
	.player-stat-bar--chart {
		height: rem(14);
	}
}
</style>