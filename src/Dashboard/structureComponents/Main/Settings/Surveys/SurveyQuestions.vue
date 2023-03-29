<template>
	<div>
		<h5 class="text-center mb-4">Questions</h5>
		
		<SurveyQuestionComp :key="question.index" v-for="(question, index) in questions" 
							:question="specSurvey ? specSurvey.questions[index] : null" 
							:types="types" @deleteItem="deleteItem" :qId="question.qId" 
							:index="index" :submitted="submitted"/>
		
		<div class="d-flex justify-content-center my-5">
			<Button label="Add Question" class="mt-2 submit-btn p-button-raised p-button-secondary p-button-text" 
					@click="addComponent()" />
		</div>
	</div>
</template>
 
 
<script>
	import uniqueId from 'lodash/uniqueId';
	import { mapGetters } from 'vuex';
	import SurveyQuestionComp from './SurveyQuestionComp.vue';

	export default {
		created() {
			this.$store.dispatch("surveys/getQuestTypes");
		},
		props: {
			submitted: Boolean,
			specSurvey: Object
		},
		data() {
			return {
				questions: []
			}
		},
		mounted() {
			if ( this.specSurvey ) {
				let questions = this.specSurvey.questions
				
				questions.map( (q, i) => {
					this.questions.push( {
						title: q.title, 
						index: i, 
						qId: q.id.toString(), 
						type: q.type_id,
						...(q.opened_answers && { open_value: q.opened_answers } ),
						...(q.closed_answers && { options: q.closed_answers }),
						...(q.closed_answs_default && { value_default: q.closed_answs_default }),
						...(q.multi_answers && { multi_values: q.multi_answers.map( val =>{ 
							return {value: val, id: uniqueId()} }
						)}),
						...(q.max_to_choose && { max_choosed: q.max_to_choose }),
						...(q.opinion_sc_levels && { levels: q.opinion_sc_levels }),
					} )
				})
				this.$store.dispatch("surveys/setNewSurvey", { questions: [...this.questions] });
			}
		},
		methods: {
			addComponent() {
				let newObj = { title: '', index: null/* , qId: uniqueId() */ }
				this.questions = [...this.questions, newObj]
				this.questions.map( (question, index) => {	
					question.index = index
				})
				this.$store.dispatch("surveys/setNewSurvey", { questions: [...this.questions] }); 
			},
			deleteItem({ qId, index}) {
				this.questions = this.questions.filter( q => q.index !== index )
				this.questions.map( (question, index) => {
					question.index = index
				})
				this.$store.dispatch("surveys/setNewSurvey", { questions: [...this.questions] });	
				this.$store.dispatch("surveys/deleteFromSpecific", qId );	
			}
		},
		computed: {
			...mapGetters({ types: 'surveys/questionTypes' })
		},
		components: { SurveyQuestionComp },
	}
</script>
 
 
<style lang='scss' scoped>
.submit-btn {
	max-width: 12rem !important;
}
</style>