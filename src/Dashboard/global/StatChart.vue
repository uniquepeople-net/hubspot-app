<template>
	<div :class="`chart ${dialogStat ? 'dialogStatClass' : ''}`" @click="$emit('getData', [this.title, this.accurate, this.inacurate])">
		<Chart type="doughnut" :data="chartData" :options="options" />
		<span class="value text-data text-center">
			{{ title }}
			<span>{{percentage ? ' (%)' : ''}}</span>
		</span>
		<!-- <span class="icons">
			<i class="bi bi-check2 mx-sm-1"></i>
			<i class="bi bi-x mx-sm-1"></i>
		</span> -->
		<!-- <Fieldset class="title" :legend="title" :toggleable="dialogStat ? true : false" 
				  :collapsed="dialogStat ? false : true">
		</Fieldset> -->
		<GridCard :circle="true" class="circle-grid w-100 h-100" bgSize="4rem"/>
	</div>
</template>
 
 
<script>
	import GridCard from './GridCard.vue'

	export default {
		props: {
			accurate: {
				default: 0
			}, 
			inacurate: {
				default: 0
			}, 
			title: {
				type: String
			},
			accColor: {
				type: String,
				default: '#3370EC'
			},
			inaccColor: {
				type: String,
				default: '#2a2a2a'
			},
			dialogStat: {
				type: Boolean
			},
			percentage: {
				type: Boolean
			}
		},
		emits: [ 'getData' ],
		data() {
			return {
				chartData: {
					//labels: ['Accurate','Inaccurate'],
					datasets: [
						{
							data: [this.accurate, .5, this.inacurate, .5],
							backgroundColor: [this.accColor, 'transparent', this.inaccColor, 'transparent'],
							hoverBackgroundColor: [this.accColor, 'transparent', this.inaccColor, 'transparent'],
							borderColor: [this.accColor, 'transparent', this.inaccColor, 'transparent'],
							borderWidth: 0, // Add space between segments
						}
					]
				},
				responsive: true,
				options: {
					plugins: {
						legend: {
							labels: {
								color: '#333', 
							}
						}
					},
					circumference: '360',
					rotation: '180',
					cutout: '85%',
					layout: {
						padding: -10
					}
				},
			}
		},
		components: { GridCard }
	}
</script>

 
<style lang='scss' scoped>
.chart {
	width: 160px;
	max-width: 100%;
	margin: auto;
	position: relative;
	.value, .title, .icons {
		position: absolute;
		z-index: 20;
		left: 50%;
	}
	.value {
		top: 50%;
		transform: translate(-50%, -50%);
	}
	.icons {
		top: 38%;
		transform: translateX(-50%);
		font-size: 1.3rem;
		.bi-check2 {
			color: var(--green-600);
		}
		.bi-x {
			color: var(--red-700);
		}
	}
	.title {
		width: 100%;
		top: 78%;
		transform: translateX(-50%);
		border: 0;
		background: transparent;
		:deep(.p-fieldset-legend) {
			border-radius: 8px;
			border: 1px solid v-bind('accColor');
			margin-bottom: 0;
			position: relative;
			z-index: 25;
			font-weight: 300;
			padding: .3rem;
			& a {
				flex-direction: row-reverse;
				justify-content: space-evenly;
				padding: .3rem 1.25rem ;
			}
		}
		:deep(.p-fieldset-legend a:focus) {
			box-shadow: none;
		}
		:deep(.p-toggleable-content) {
			background: #f8f9fa;
			position: absolute;
			top: 50%;
			z-index: 5;
			width: 100%;
		}
		:deep(.p-fieldset-content) {
			padding: .25rem;
			padding-top: 0;
		}
	}
	:deep(.p-chart) {
		z-index: 10;
	}
	.circle-grid {
		position: absolute;
		z-index: 5;
		top: 0;
		border-radius: 50%;
		box-shadow: unset;
	}
}
.dialogStatClass {
	width: 270px !important;
	.title {
		:deep(.p-fieldset-legend) {
			padding: .8rem;
		}
	}
}

@media ( min-width: 576px) {
	.chart {
		width: 220px;
		.title {
			:deep(.p-fieldset-legend) {
				padding: .5rem;
			}
		}
		.icons {
			font-size: 1.5rem;
		}
	}
}

@media ( min-width: 1400px) {
	.chart {
		width: 270px;
		.title {
			:deep(.p-fieldset-legend) {
				padding: .8rem;
			}
		}
	}
}
</style>