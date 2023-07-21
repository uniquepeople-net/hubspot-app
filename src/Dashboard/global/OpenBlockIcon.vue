<template>
	<div>
		<i class="pi pi-angle-down" v-if="!collapsed"></i>
		<i class="pi pi-angle-up" v-if="collapsed"></i>
	</div>
</template>
 
 
<script>
	export default {
		props: [ 'collapsed' ],
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