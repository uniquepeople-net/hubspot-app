<template>
	<div>
		{{ this.question.checkbox_label }}
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
				value: this.question.checkbox
			}
		},
		methods: {
 
		},
	}
</script>
 
 
<style lang='scss' scoped>
</style>