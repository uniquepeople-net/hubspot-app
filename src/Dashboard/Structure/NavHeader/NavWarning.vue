<template>
	<router-link :to="{name: linkTo}" class="me-3 d-flex flex-column-reverse justify-content-center">
		<WarningTriangle />
	</router-link>
</template>
 
 
<script>
	import WarningTriangle from '../Main/Stats/Vectors/WarningTriangle.vue'

	export default {
		props: [ 'linkTo' ],
		data() {
			return {
				}
		},
		methods: {
			
		},
		components: { WarningTriangle },
	}
</script>
 
 
<style lang='scss' scoped>
.bi-exclamation-circle {
	color: var(--red-600);
}
</style>