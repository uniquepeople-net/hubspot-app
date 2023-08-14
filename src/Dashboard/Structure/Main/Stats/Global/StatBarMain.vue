<template>
	<span class="lh-1 d-flex justify-content-between">
		<span class="text-data center-center">{{ title }}</span>
		<span class="text-gt-bold">{{ value }}</span>
	</span>
</template>
 
 
<script>
	export default {
		props: ['title', 'value'],
		data() {
			return {
			}
		},
		methods: {
 
		},
	}
</script>
 
 
<style lang='scss' scoped>
</style>