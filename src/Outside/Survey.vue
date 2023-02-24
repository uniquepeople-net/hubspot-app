<template>
	<div>
		<AnswerSurvey v-if="survey" :survey="survey"/>
		<LoadingIcon v-if="!survey" />
	</div>
</template>
 
 
<script>
	import { mapGetters } from 'vuex'
	import LoadingIcon from '../Dashboard/global/LoadingIcon.vue'
	import AnswerSurvey from '../Dashboard/structureComponents/Main/Settings/Surveys/AnswerSurvey/AnswerSurvey.vue'

	export default {
		created() {
			this.$store.dispatch("surveys/specificSurveyBySlug", this.slug)			
		},
		data() {
			return {
				slug: this.$route.params.slug
			}
		},
		methods: {
			
			},
		computed: {
			...mapGetters({ survey: 'surveys/specificSurveyBySlug' })
		},
		components: { AnswerSurvey, LoadingIcon },
	}
</script>
 
 
<style lang='scss' scoped>


</style>