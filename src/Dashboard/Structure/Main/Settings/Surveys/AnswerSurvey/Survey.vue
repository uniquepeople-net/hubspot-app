<template>
	<div>
		<AnswerSurveyInfo v-if="survey" :survey="survey" :hash="queryHash"/>
		<Fieldset v-if="survey && 'advanced' in survey && survey.advanced.guidelines" 
				  :legend="$t('message.Guidelines')" :toggleable="true" class="fieldset" :collapsed="true">
			<div v-html="survey.advanced.guidelines"></div>
		</Fieldset>
		<Message v-if="message" :message="message">
			<template v-slot:button>
				<!-- <Button label="Log In here" @click="pushToLogin()"/> -->
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

					if ( 'completed' in this.survey && this.survey.completed ) {
						this.message = this.$i18n.t('message.CompletedSurvey')
						return false
					}

					//if ( this.survey.questions.some( q => q.type_id === 6 ) ) {
					if ( this.survey.type_id === 2 && this.survey.advanced.competition_id !== 771 ) {
						this.$store.dispatch("stats/getCompetitionsTeams", this.survey.advanced.competition_id)
					} 
					// get womens teams and squads from extrernal api "futbalnet" not "wyscout"
					else if ( this.survey.type_id === 2 && this.survey.advanced.competition_id === 771 ) {
						this.$store.dispatch("stats/getWomensFutbalnetTeams", this.survey.advanced.competition_id)
					}

					let isActive = this.survey.active
					let isPublic = this.survey.public
					let status = this.survey.survey_status.id
					let surveyDone = localStorage.getItem(this.slug + 'done');

					if ( surveyDone === 'true'  ) {
						this.message = this.$i18n.t('message.CompletedSurvey')
						return false
					}

					if ( status !== 2 ) {
						this.message = this.$i18n.t('message.ThisSurveyStatus') + ': ' + this.surveyStatus(this.survey.survey_status.name)
						return false
					}
					
					if ( !isActive ) {
						this.$router.push({ name: '404' })
						return false
					}

					if ( !isPublic ) {
						if (!User.loggedIn()) {
							this.message = this.$i18n.t('message.NotAuthorizedToSurvey')
							return false
						}
					}					

					if ( this.survey.hashes.length ) {
						let hashesArr = this.survey.hashes

						for ( const hash of hashesArr ) {
							if ( this.queryHash === hash.hash && hash.count >= hash.max_limit ) {								
								this.message = this.$i18n.t('message.OverLimitSurvey')
								return false
							}
						}

						if ( hashesArr.some( hash => this.queryHash === hash.hash ) ) {
							localStorage.setItem(this.survey.name, this.queryHash)
							this.showSurvey = true
							return true
						}

						this.message = this.$i18n.t('message.InvalidHash')

					} else {
						return true
					}
				} else {
					return false
				}					
			},
			surveyStatus(status) {
				switch (status) {
					case 'Waiting':
						return this.$i18n.t('message.Waiting')
					
					case 'Finished':
						return this.$i18n.t('message.Finished')
					default:
						break;
				}
			},
			pushToLogin() {
				this.$router.push({ name: 'login' })
			}
		},
		computed: {
			...mapGetters({ survey: 'surveys/specificSurveyBySlug' }),
			queryHash() {
				if ( this.$route.query.hash ) {
					localStorage.setItem(this.survey.name, encodeURIComponent(this.$route.query.hash))
					return encodeURIComponent(this.$route.query.hash)
				} else {
					return localStorage.getItem(this.survey.name)
				} 
			}
		},
		components: { AnswerSurvey, LoadingIcon, Message, AnswerSurveyInfo },
	}
</script>
 
 
<style lang='scss' scoped>
.fieldset {
	max-width: 1200px;
	margin: auto;
}
.ital {
	font-style: italic;
	color: rgb(167, 167, 167);
}
.no-style {
	list-style: none;
}
:deep(.p-fieldset-legend) {
	margin-bottom: 0;
}
:deep(.p-fieldset-legend-text ) {
	font-size: 1rem;
}
</style>