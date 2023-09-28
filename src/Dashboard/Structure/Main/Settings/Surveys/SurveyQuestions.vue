<template>
	<div>
		<h5 class="text-center mb-4">Questions</h5>
		
		<SurveyQuestionComp :key="question.index" v-for="(question, index) in questions" 
							:question="specSurvey ? specSurvey.questions[index] : null" 
							:types="typesData" @deleteItem="deleteItem" :qId="question.qId" 
							:index="question.index" :submitted="submitted" :keyValue="index"/>
		
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
			specSurvey: Object,
			surveyType: Number,
		},
		data() {
			return {
				questions: [],
				typesData: this.types ? this.types : []
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
				let questions =  this.newSurvey && 'questions' in this.newSurvey ? this.newSurvey.questions : this.questions
				
				const highestValue = questions.reduce((highest, obj) => {
					if ('index' in obj) {
						return Math.max(highest, obj.index);
					}
					return highest;
				}, 0);

				let newObj = { title: '', index: highestValue + 1 }

				this.questions = [...questions, newObj]

				this.$store.dispatch("surveys/setNewSurvey", { questions: [...this.questions] }); 
			},
			deleteItem({ qId, index}) {
				if ( this.specSurvey ) {
					this.$store.dispatch("surveys/deleteFromSpecific", qId );	
				}
				let questions =  this.newSurvey && 'questions' in this.newSurvey ? this.newSurvey.questions : this.questions
				
				this.questions = questions.filter( q => q.index !== index )
				/* this.questions = this.questions.map( q =>  {
					q.index = q.index - 1
					return q
				}) */
				this.$store.dispatch("surveys/setNewSurvey", { questions: [...this.questions] });	
	
			},
			handleWatch() {
				if ( this.types ) {
					if ( this.surveyType === 1 ) {
						this.typesData = this.types.filter( d => d.type !== "Best11" )
					} else {
						this.typesData = this.types.filter( d => d.type === "Best11" )
					}
					this.questions = !this.specSurvey ? [] : this.questions
				}
			}
		},
		computed: {
			...mapGetters({ types: 'surveys/questionTypes',
							newSurvey: 'surveys/newSurvey' }),
		},
		watch: {
			surveyType: ['handleWatch'],
			types: ['handleWatch'],
		},
		components: { SurveyQuestionComp },
	}
</script>
 
 
<style lang='scss' scoped>
.submit-btn {
	max-width: 12rem !important;
}
</style>