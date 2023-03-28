<template>
	<div>
		<SurveySpecificData v-if="survey" :survey="survey" :id="id"/>
		<LoadingIcon v-if="!survey"/>
	</div>
</template>
 
 
<script>
	import { mapGetters } from 'vuex';
	import SurveySpecificData from './SurveySpecificData.vue';

	export default {
		created() {			
			this.$store.dispatch("surveys/resetSpecificSurvey")
			this.$store.dispatch("surveys/specificSurvey", this.id)
		},
		unmounted() {
			this.$store.dispatch("surveys/resetNewSurvey");
		},
		data() {
			return {
				id: this.$route.params.survey_id,
			}
		},
		computed: {
			...mapGetters({ survey: 'surveys/specificSurvey' })
		},
		components: { SurveySpecificData }
	}
</script>
 
 
<style lang='scss' scoped>
</style>