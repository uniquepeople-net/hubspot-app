<template>
	<div id="app">
		{{ message }}
	</div>
	<Chart type="doughnut" :data="chartData" :options="options" />
	<router-view></router-view>
</template>

<script>

export default {
	mounted() {
		/* axios.post('http://localhost:80/api/register', { 
			name: 'user',
			email: 'user@g.sk',
			password: 'password',
		}).then(
			response => {
				console.log(response)				
			}
		) */
	},
	data() {
		return {
			message: 'Vue App',
			chartData: {
				labels: ['Accurate','Non'],
				datasets: [
					{
						data: [15,7],
						backgroundColor: ["#FF6384","#36A2EB"],
						hoverBackgroundColor: ["#FF6384","#36A2EB"]
					}
				]
			},
			options: {
				//responsive: true,
				plugins: {
					legend: {
						labels: {
							color: '#333'
						}
					}
				}
			}
		};
	},
};
</script>

<style lang="scss" scoped>
  #app {
    font-size: 18px;
    font-family: 'Roboto', sans-serif;
    color: rgb(43, 59, 13);
  }
</style>
