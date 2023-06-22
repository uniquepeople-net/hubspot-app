<template>
	<div class="app-card simple-bar">
		<span class="text-data m-0">{{title}}</span>
		<span class="text-value">{{value}}</span>
	</div>
</template>
 
 
<script>
	export default {
		props: {
			title: String,
			value: Number
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
.simple-bar {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: .5rem 1rem;
}
</style>