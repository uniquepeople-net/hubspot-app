<template>
	<svg class="back-button" @click="redirectBack" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M21 12H3M3 12L11.5 3.5M3 12L11.5 20.5" stroke="#8C8C8C" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
	</svg>
</template>
 
 
<script>
	export default {
		props: ['route'],
		data() {
			return {
			}
		},
		methods: {
			redirectBack() {
				this.$router.push({ name: this.route })
			}
		},
	}
</script>
 
 
<style lang='scss' scoped>
.back-button {
	cursor: pointer;
}
</style>