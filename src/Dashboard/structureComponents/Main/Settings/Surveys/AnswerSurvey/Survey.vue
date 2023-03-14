<template>
	<div>
		<AnswerSurveyInfo v-if="survey" :survey="survey" :hash="queryHash"/>
		<Message v-if="message" :message="message">
			<template v-slot:button>
				<Button label="Log In here" @click="pushToLogin()"/>
			</template>
		</Message>
		<AnswerSurvey v-if="showSurvey || checkSurveyAcces()" :survey="survey" :hash="queryHash"/>
		<LoadingIcon v-if="!survey" />
	</div>
</template>
 
 
<script>
	import { mapGetters } from 'vuex'
	import LoadingIcon from '../../../../../global/LoadingIcon.vue'
	import AnswerSurvey from './AnswerSurvey.vue'
	import AnswerSurveyInfo from './AnswerSurveyInfo.vue'
	import Message from './Message.vue'

	export default {
		created() {		
			this.$store.dispatch("surveys/specificSurveyBySlug", this.slug)			
		},
		data() {
			return {
				slug: this.$route.params.slug,
				showSurvey: false,
				message: '',
			}
		},
		methods: {
			checkSurveyAcces() {				
				if ( this.survey ) {
					let isActive = this.survey.active
					let isPublic = this.survey.public
					let status = this.survey.survey_status.id
					
					if ( status !== 2 ) {
						this.message = 'This survey is ' + this.survey.survey_status.name
						return false
					}
					
					if ( !isActive ) {
						this.$router.push({ name: '404' })
						return false
					}

					if ( !isPublic ) {
						if (!User.loggedIn()) {
							this.message = 'You are not authorized to do this survey.'
							return false
						}
						return true
					}

					if ( this.survey.hashes.length ) {
						let hashesArr = this.survey.hashes

						for ( const hash of hashesArr ) {
							if ( this.queryHash === hash.hash && hash.count >= hash.max_limit ) {								
								this.message = 'You are over limit to do this survey'
								return false
							}
						}

						if ( hashesArr.some( hash => this.queryHash === hash.hash ) ) {
							localStorage.setItem(this.survey.name, this.queryHash)
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
			},
			pushToLogin() {
				this.$router.push({ name: 'login' })
			}
		},
		computed: {
			...mapGetters({ survey: 'surveys/specificSurveyBySlug' }),
			queryHash() {
				return this.$route.query.hash ? 
						encodeURIComponent(this.$route.query.hash) : 
						localStorage.getItem(this.survey.name)
			}

		},
		components: { AnswerSurvey, LoadingIcon, Message, AnswerSurveyInfo },
	}
</script>
 
 
<style lang='scss' scoped>


</style>