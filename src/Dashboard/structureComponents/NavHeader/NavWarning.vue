<template>
	<router-link :to="linkTo" class="me-3 d-flex flex-column-reverse justify-content-center">
		<i class="bi bi-exclamation-circle fs-4"></i>
	</router-link>
</template>
 
 
<script>
	export default {
		props: [ 'linkTo' ],
		data() {
			return {
			}
		},
		methods: {
 
		},
	}
</script>
 
 
<style lang='scss' scoped>
.bi-exclamation-circle {
	color: var(--red-600);
}
</style>