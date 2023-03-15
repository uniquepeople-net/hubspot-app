<template>
	<div>
		<AnswerResultInfo v-if="survey" :survey="survey"/>

		<div class="row my-5 gy-3">
			<div class="col-12 col-lg-6 col-xxl-4" v-for="result in results">
				<AnswerResultQuestion v-if="result" :result="result"/>
			</div>
		</div>
		
		<LoadingIcon v-if="!survey || !results" />
	</div>
</template>
 
 
<script>
	import { mapGetters } from 'vuex';
	import LoadingIcon from '../../../../../global/LoadingIcon.vue';
	import AnswerResultInfo from './AnswerResultInfo.vue';
	import AnswerResultQuestion from './AnswerResultQuestion.vue';
	

	export default {
		created() {
			this.$store.dispatch("surveys/specificSurvey", this.id)
			this.$store.dispatch("surveys/getResults", this.id)
		},
		data() {
			return {
				id: this.$route.params.survey_id,
			}
		},
		computed: {
			...mapGetters({ survey: 'surveys/specificSurvey',
							results: 'surveys/specificResults' })
		},
		components: { AnswerResultQuestion, LoadingIcon, AnswerResultInfo }
	}
</script>
 
 
<style lang='scss' scoped>
</style>