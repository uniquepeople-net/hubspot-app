<template>
	<div>
		<h5 class="mb-5">{{question.title}}</h5>
		<div v-html="question.info"></div>
	</div>
</template>
 
 
<script>
	export default {
		props: {
			question: Object,
			step: Number
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