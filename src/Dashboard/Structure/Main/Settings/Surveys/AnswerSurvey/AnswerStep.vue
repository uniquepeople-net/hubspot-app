<template>
	<div class="survey-content">
		<AnswerOpen 	v-if="checkQuestionType(1)" :question="questionData()" :step="step"/>
		<AnswerClosed 	v-if="checkQuestionType(2)" :question="questionData()" :step="step"/>
		<AnswerMulti 	v-if="checkQuestionType(3)" :question="questionData()" :step="step"/>
		<AnswerMulti 	v-if="checkQuestionType(4)" :question="questionData()" :step="step"/>
		<AnswerScale 	v-if="checkQuestionType(5)" :question="questionData()" :step="step"/>
		<AnswerBest11 	v-if="checkQuestionType(6)" :question="questionData()" :step="step"/>
		<AnswerBestW11  v-if="checkQuestionType(77)" :question="questionData()" :step="step"/>
		<AnswerCheckbox v-if="checkQuestionType(7)" :question="questionData()" :step="step"/>
		<AnswerInfo 	v-if="checkQuestionType(8)" :question="questionData()" :step="step" />
	</div>
</template>
 
 
<script>
	import AnswerClosed from './AnswerClosed.vue'
	import AnswerMulti from './AnswerMulti.vue'
	import AnswerOpen from './AnswerOpen.vue'
	import AnswerScale from './AnswerScale.vue'
	import AnswerBest11 from './AnswerBest11.vue'
	import AnswerBestW11 from './AnswerBestW11.vue'
	import AnswerInfo from './AnswerInfo.vue'
	import AnswerCheckbox from './AnswerCheckbox.vue'

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
				if ( this.survey.type_id === 2 && this.survey.advanced.competition_id === 771 && id === 77 ) {
					return true
				} else if ( (this.survey.type_id === 2 && this.survey.advanced.competition_id !== 771) || this.survey.type_id === 1 ) {
					return this.survey.questions[this.step - 1].type_id === id ? true : false
				}
			},
			questionData() {
				return this.survey.questions[this.step - 1]
			}
		},
		components: { AnswerOpen, AnswerClosed, AnswerMulti, AnswerScale, AnswerBest11, AnswerBestW11, AnswerInfo, AnswerCheckbox },
	}
</script>
 
 
<style lang='scss' scoped>
.survey-content {
	max-width: 768px;
	margin: auto;
}
</style>