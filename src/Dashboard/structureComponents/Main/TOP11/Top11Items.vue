<template>
	<div>
		<div v-for="item in items">
			{{item.season.season}}
		</div>		
	</div>
</template>
 
 
<script>
	export default {
		props: {
			items: Array
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
</style>