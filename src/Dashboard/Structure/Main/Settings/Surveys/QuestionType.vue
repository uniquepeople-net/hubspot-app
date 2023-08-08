<template>
	<div>
	
		<QuestionTypeOpen v-if="type === 1" :id="index" :question="question ? question : null"
							:submitted="submitted"/>
	
		<QuestionTypeClosed v-if="type === 2" :id="index" :question="question ? question : null"
							:submitted="submitted"/>
		
		<QuestionTypeMulti v-if="type === 3 || type === 4 || type === 5" :type="type" :id="index" 
							:question="question ? question : null" :submitted="submitted"/>

		<QuestionTypeBest11 v-if="type === 6" :type="type" :id="index" 
							:question="question ? question : null" :submitted="submitted"/>
	
	</div>
</template>
 
 
<script>
	import SelectButton from 'primevue/selectbutton';
	import QuestionTypeOpen from './QuestionTypeOpen.vue';
	import QuestionTypeClosed from './QuestionTypeClosed.vue';
	import QuestionTypeMulti from './QuestionTypeMulti.vue';
	import QuestionTypeBest11 from './QuestionTypeBest11.vue';

	export default {
		props: { 
			type: Number,
			index: Number,
			question: Object,
			submitted: Boolean
		},
		components: { QuestionTypeOpen, QuestionTypeClosed, QuestionTypeMulti, QuestionTypeBest11 },
	}
</script>
 
 
<style lang='scss' scoped>
</style>