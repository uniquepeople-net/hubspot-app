<template>
	<div class="question-info mt-3">
		<Editor v-model="value" :class="{'p-invalid':submitted && !value }" @update:modelValue="changeValue"/>
	</div>
</template>
 
 
<script>
	import { debounce } from 'lodash';
	import Editor from 'primevue/editor'

	export default {
		props: { 
			id: Number,
			question: Object,
			submitted: Boolean 
		},
		mounted() {			
			if ( this.question ) {
				this.value = this.question.info ? this.question.info : this.value
			}
			this.$store.dispatch("surveys/setNewSurvey", { info: this.value, index: this.id })
		},
		data() {
			return {
				value: null
			}
		},
		methods: {
			changeValue(event) {
				this.$emit('value', this.value)
				this.updateValue()
			},
			updateValue: debounce(function () {
				this.$store.dispatch("surveys/setNewSurvey", { info: this.value, index: this.id })
			}, 100),
		},
		components: { Editor }
	}
</script>
 
 
<style lang='scss' scoped>
.question-info {
	.p-invalid {
		border: 1px solid var(--red-500);
		border-radius: var(--btn-border-radius);
		overflow: hidden;
	}
}
</style>