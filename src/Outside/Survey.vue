<template>
	<div>
		<AnswerSurvey v-if="showSurvey || checkSurveyAcces()" :survey="survey"/>
		<LoadingIcon v-if="!survey" />
		<div >{{message}}</div>
	</div>
</template>
 
 
<script>
import { helpers } from '@vuelidate/validators'
	import { mapGetters } from 'vuex'
	import LoadingIcon from '../Dashboard/global/LoadingIcon.vue'
	import AnswerSurvey from '../Dashboard/structureComponents/Main/Settings/Surveys/AnswerSurvey/AnswerSurvey.vue'

	export default {
		created() {
			this.$store.dispatch("surveys/specificSurveyBySlug", this.slug)			
		},
		data() {
			return {
				slug: this.$route.params.slug,
				showSurvey: false,
				message: ''
			}
		},
		methods: {
			checkSurveyAcces() {
				
				if ( this.survey ) {
		
					let isActive = this.survey.active
					let isPublic = this.survey.public
					let queryHash = this.$route.query.hash ? this.$route.query.hash : localStorage.getItem('hash');
					
					if ( !isActive ) {
						this.$router.push({ name: '404' })
						return false
					}

					if ( !isPublic ) {
						this.$router.push({ name: '404' })
						return false
					}

					if ( this.survey.hashes.length ) {
						let hashesArr = this.survey.hashes

						if ( hashesArr.some( hash => queryHash === hash.hash ) ) {
							localStorage.setItem('hash', queryHash)
							this.showSurvey = true
							return true
						}

						this.message = 'Invalid hash'

					} else {
						return true
					}
				} else {
					return false
				}					
			}
		},
		computed: {
			...mapGetters({ survey: 'surveys/specificSurveyBySlug' })
		},
		components: { AnswerSurvey, LoadingIcon },
	}
</script>
 
 
<style lang='scss' scoped>


</style>