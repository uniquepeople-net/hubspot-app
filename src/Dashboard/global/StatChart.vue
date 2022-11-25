<template>
	<div :class="`chart ${dialogStat ? 'dialogStatClass' : ''}`" @click="$emit('getData', [this.title, this.accurate, this.inacurate])">
		<Chart type="doughnut" :data="chartData" :options="options" />
		<span class="value">{{ accurate + '/' + inacurate }}</span>
		<Fieldset class="title" :legend="title" :toggleable="dialogStat ? true : false" 
				  :collapsed="dialogStat ? false : true">
		</Fieldset>
	</div>
</template>
 
 
<script>
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
				type: String
			},
			inaccColor: {
				type: String
			},
			dialogStat: {
				type: Boolean
			}
		},
		emits: ['getData'],
		data() {
			return {
				chartData: {
					//labels: ['Accurate','Inaccurate'],
					datasets: [
						{
							data: [this.accurate, this.inacurate],
							backgroundColor: [this.accColor,this.inaccColor],
							hoverBackgroundColor: [this.accColor,this.inaccColor],
							borderColor: [this.accColor, this.inaccColor]
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
					circumference: '270',
					rotation: '-135',
					cutout: '60%'
				},
			}
		}
	}
</script>

 
<style lang='scss' scoped>
.chart {
	width: 160px;
	max-width: 100%;
	margin: auto;
	position: relative;
	.value, .title {
		position: absolute;
		left: 50%;
	}
	.value {
		top: calc( 45% + 1.5rem );
		transform: translate(-50%, -50%);
		font-size: 1.5rem;
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
}
.dialogStatClass {
	width: 270px !important;
	.title {
		:deep(.p-fieldset-legend) {
			padding: .8rem;
		}
	}
	.value {
		font-size: 2.5rem;
		top: calc( 45% + 2rem );
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
		.value {
			font-size: 2rem;
			top: calc( 45% + 1.75rem );
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
		.value {
			font-size: 2.5rem;
			top: calc( 45% + 2rem );
		}
	}
}
</style>