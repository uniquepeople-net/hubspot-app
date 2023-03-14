<template>
	<div class="survey-content">
		<AnswerOpen 	v-if="checkQuestionType(1)" :question="questionData()" :step="step"/>
		<AnswerClosed 	v-if="checkQuestionType(2)" :question="questionData()" :step="step"/>
		<AnswerMulti 	v-if="checkQuestionType(3)" :question="questionData()" :step="step"/>
		<AnswerMulti 	v-if="checkQuestionType(4)" :question="questionData()" :step="step"/>
		<AnswerScale 	v-if="checkQuestionType(5)" :question="questionData()" :step="step"/>
	</div>
</template>
 
 
<script>
	import AnswerClosed from './AnswerClosed.vue'
	import AnswerMulti from './AnswerMulti.vue'
	import AnswerOpen from './AnswerOpen.vue'
	import AnswerScale from './AnswerScale.vue'

	export default {
		props: {
			survey: Object
		},
		data() {
			return {
				step: Number(this.$route.params.step)
			}
		},
		methods: {
			checkQuestionType(id) {
				return this.survey.questions[this.step - 1].type_id === id ? true : false
			},
			questionData() {
				return this.survey.questions[this.step - 1]
			}
		},
		components: { AnswerOpen, AnswerClosed, AnswerMulti, AnswerScale },
	}
</script>
 
 
<style lang='scss' scoped>
.survey-content {
	max-width: 768px;
	margin: auto;
}
</style>