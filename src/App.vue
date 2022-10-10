<template>
  <div id="app">
    {{ message }}
  </div>
</template>

<script>
export default {
	mounted() {
		axios.post('http://localhost:80/api/register', { 
			name: 'chmulo',
			email: 'chmulo@g.sk',
			password: 'password',
		}).then(
			response => {
				console.log(response)				
			}
		)
	},
	data() {
		return {
		message: 'Hello World!',
		};
	},
};
</script>

<style lang="scss" scoped>
  #app {
    font-size: 18px;
    font-family: 'Roboto', sans-serif;
    color: blue;
	& div {
		font-size: 2rem;
	}
  }
</style>
