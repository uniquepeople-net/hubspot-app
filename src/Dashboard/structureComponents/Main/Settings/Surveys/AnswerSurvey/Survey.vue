<template>
	<div>
		<AnswerSurveyInfo v-if="survey" :survey="survey" :hash="queryHash"/>
		<Message v-if="message" :message="message" />
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
		beforeCreate() {
			localStorage.removeItem('hash')
		},
		created() {		
			this.$store.dispatch("surveys/specificSurveyBySlug", this.slug)			
		},
		data() {
			return {
				slug: this.$route.params.slug,
				showSurvey: false,
				message: '',
				queryHash: this.$route.query.hash ? this.$route.query.hash : localStorage.getItem('hash')
			}
		},
		methods: {
			checkSurveyAcces() {
				
				if ( this.survey ) {
		
					let isActive = this.survey.active
					let isPublic = this.survey.public
					
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

						for ( const hash of hashesArr ) {
							if ( this.queryHash === hash.hash && hash.count >= hash.max_limit ) {								
								this.message = 'You are over limit to do this survey'
								return false
							}
						}

						if ( hashesArr.some( hash => this.queryHash === hash.hash ) ) {
							localStorage.setItem('hash', this.queryHash)
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
		components: { AnswerSurvey, LoadingIcon, Message, AnswerSurveyInfo },
	}
</script>
 
 
<style lang='scss' scoped>


</style>