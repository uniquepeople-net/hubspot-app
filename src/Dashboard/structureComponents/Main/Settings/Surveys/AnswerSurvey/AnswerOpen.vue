<template>
	<div class="row">
		<h5 class="mb-5">{{question.title}}</h5>
		<div v-for="(input, index) in selectedInputs" class="col-12 mb-4" :key="index">
			<h6>Answer {{ index + 1 }}</h6>
			<InputText class="w-100" v-model="selectedInputs[index]" :change="handleChange()" />
		</div>
	</div>
</template>
 
 
<script>
	import { debounce } from 'lodash';

	export default {
		props: {
			question: Object,
		},
		data() {
			return {
				selectedInputs: []
			}
		},
		mounted() {
			this.$store.dispatch("surveys/setFulfilledSurvey", { value: [ ...this.selectedInputs ], question: this.question })
		},
		created () {
			if ( this.question.opened_answers ) {
				for (let index = 0; index < this.question.opened_answers; index++) {
					this.selectedInputs.push('')					
				}
			}
		},
		methods: {
			handleChange() {
				this.updateValue()
			},
			updateValue: debounce(function () {
				this.$store.dispatch("surveys/setFulfilledSurvey", { value: [ ...this.selectedInputs ], question: this.question })
			}, 100),
		}
	}
</script>
 
 
<style lang='scss' scoped>
</style>