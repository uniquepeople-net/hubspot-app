<template>
	<div class="d-flex">
		<div><slot name="vector"></slot></div>
		<div class="d-inline-block ms-2">
			<span>{{ value }}</span>
			<p class="text-sm-notice">{{ description }}</p>
		</div>
	</div>
</template>
 
 
<script>
	export default {
		props: [ 'value', 'description' ],
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