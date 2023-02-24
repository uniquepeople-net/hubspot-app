<template>
	<div class="row">
		<h5 v-if="!onlyInputs" class="mb-5">{{question.title}}</h5>
		<div v-for="(input, index) in question.opened_answers" class="col-12 mb-4">
			<h6 v-if="!onlyInputs">Answer {{ index + 1 }}</h6>
			<InputText class="w-100" v-model="inputItems[index]"/>
		</div>
	</div>
</template>
 
 
<script>
	export default {
		props: {
			question: Object,
			onlyInputs: Boolean
		},
		data() {
			return {
			}
		},
		computed: {
			inputItems() {
				let inputs = Array.from(Array(this.question.opened_answers))
				return inputs
			}
		},
	}
</script>
 
 
<style lang='scss' scoped>
</style>