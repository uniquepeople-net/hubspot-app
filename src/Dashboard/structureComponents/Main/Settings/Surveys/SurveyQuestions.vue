<template>
	<div>
		<h5 class="text-center mb-4">Questions</h5>
		
		<SurveyQuestionComp :key="question.qId" v-for="(question) in questions" :question="question" 
							:types="types" @deleteItem="deleteItem" :qId="question.qId"/>
		
		<div class="d-flex justify-content-center">
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
		
		data() {
			return {
				questions: []
			}
		},
		methods: {
			addComponent() {
				let newObj = { title: '', type_id: null, qId: uniqueId() }
				this.questions = [...this.questions, newObj] 
			},
			deleteItem(qId) {
				this.questions = this.questions.filter( q => q.qId !== qId )				
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