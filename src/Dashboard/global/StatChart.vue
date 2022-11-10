<template>
	<div class="chart">
		<Chart type="doughnut" :data="chartData" :options="options" />
		<span class="value">{{ accurate + '/' + inacurate }}</span>
		<Fieldset class="title" :legend="title" :toggleable="true" :collapsed="true">
			<p class="pt-4">asdkjkldsja</p>
		</Fieldset>
	</div>
</template>
 
 
<script>
	export default {
		props: ['accurate', 'inacurate', 'title', 'accColor'],
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
					cutout: '55%'
				}
			}
		}
	}
</script>
 
 
<style lang='scss' scoped>
.chart {
	width: 100%;
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
		top: 80%;
		transform: translateX(-50%);
		border: 0;
		background: transparent;
		:deep(.p-fieldset-legend) {
			border-radius: 100px;
			border: 0;
			margin-bottom: 0;
			position: relative;
			z-index: 25;
			background: #bbbbbb;
			font-weight: 300;
			& a {
				flex-direction: row-reverse;
				justify-content: space-evenly;
				padding: .3rem 1.25rem ;
				color: #f8f9fa;
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
	}
}
</style>