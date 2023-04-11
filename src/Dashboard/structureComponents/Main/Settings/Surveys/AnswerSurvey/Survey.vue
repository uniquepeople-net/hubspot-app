<template>
	<div>
		<AnswerSurveyInfo v-if="survey" :survey="survey" :hash="queryHash"/>
		<Fieldset legend="Pokyny/Guidelines" :toggleable="true" class="fieldset" :collapsed="true">
			<Fieldset legend="Hráč sezóny ÚFP / ÚFP Male Player of the Season" :toggleable="true" class="fieldset" :collapsed="true">

				<h6>Hráč sezóny ÚFP / <span class="ital">ÚFP Male Player of the Season</span></h6>
				<span>2022/2023</span>
				<h6 class="mt-2">Ako hlasovať? / How to vote?</h6>
				<p>Z celkového zoznamu hráčov vyber 3 hráčov, ktorí boli podľa teba najlepší hráči v najvyššej súťaži
				(Fortuna liga) a zároveň im urči poradie od 1. do 3. miesta. / <span class="ital">From the list of players, you shall select 3
				players who, in your opinion, were the best players in the highest division (Fortuna Liga) and at the
				same time you shall determine their order from 1st to 3rd place.</span></p>

				<p>Určením poradia určuješ váhu svojich hlasov nasledovne: / <span class="ital">By determining the order, you assign value
					of your votes as follows:</span></p>

				<ul class="no-style">
					<li>1st place = 5 points</li>
					<li>2nd place = 3 points</li>
					<li>3rd place = 1 points</li>
				</ul>
					

				<h6>Za koho hlasujem? / <span class="ital">Who am I voting for?</span></h6>

				<p>Ocenenie „Hráč sezóny ÚFP“ sa udeľuje aktívnemu hráčovi najvyššej seniorskej súťaže mužov na
				Slovensku, ktorého individuálne výkony počas celej sezóny ocenili ostatní hráči ako najlepšie zo
				všetkých. Ocenenie stelesňuje prínos jednotlivca pre tím aj celú súťaž a zdôrazňuje jedinečnosť,
				výnimočnosť a príkladnosť jeho výkonov, ktoré ho počas sezóny významne odlíšili od výkonov jeho
				spoluhráčov a proKhráčov. / <span class="ital">The "ÚFP Male Player of the Season" award is given to an active player of
				the highest senior men's competition in Slovakia, whose individual performance throughout the season
				was rated by other players as the best of all. The award embodies the individual's contribution to the
				team and the competition as a whole and emphasizes the uniqueness, excellence, and exemplary
				performance of the player, which significantly distinguished him from the performance of his
				teammates and opponents during the season.</span></p>
			</Fieldset>
			<Fieldset legend="TOP 11 ÚFP (Muži/Men)" :toggleable="true" class="fieldset mt-2" :collapsed="true">

				<h6>TOP 11 ÚFP (Muži/Men)</h6>
				<span>2022/2023</span>
				<h6 class="mt-2">Ako hlasovať? / <span class="ital">How to vote?</span></h6>
				<p>Z celkového zoznamu hráčov vyber predpísaný počet hráčov na konkrétny post, ktorí boli podľa teba
				najlepší na danom poste v najvyššej súťaži (Fortuna liga). /<span class="ital">From the list of players, you shall select the
				prescribed number of players for a specific posiKon who, in your opinion, were the best at that position
				in the highest competition (Fortuna League).</span></p>

				<p>Výberom hráča na jednotlivom poste určuješ váhu svojich hlasov nasledovne: / <span class="ital">choosing a player
					for an individual position, you determine the value of your votes as follows:</span></p>

				<ul class="no-style">
					<li>1 brankár/goalie = 1 point</li>
					<li>3 obrancovia/defenders = 1 point each</li>
					<li>3 záložníci/midfielders = 1 point each</li>
					<li>3 útočníci/strikers = 1 point each</li>
				</ul>
					

				<h6>Za koho hlasujem? / <span class="ital">Who am I voting for?</span></h6>

				<p>Ocenenie „TOP 11 ÚFP“ sa udeľuje 11 hráčom najvyššej seniorskej súťaže mužov na Slovensku, ktorých
				individuálne výkony na konkrétnych postoch počas celej sezóny ocenili ostatní hráči ako najlepšie zo
				všetkých. Ocenenie zdôrazňuje výnimočnosť výkonov a zručnosť hráča na konkrétnom poste, ktoré ho
				počas sezóny významne odlíšili od výkonov jeho spoluhráčov a protihráčov hrajúcich na rovnakých
				postoch. /<span class="ital"> The "TOP 11 ÚFP" award is given to 11 players of the highest senior men's competition in
				Slovakia, whose individual performances in specific positions throughout the season were recognized
				by other players as the best of all. The award highlights the exceptional performance and skill of a
				player in a specific position, which during the season significantly distinguished him from the
				performances of his teammates and opponents playing in the same positions.</span></p>
			</Fieldset>
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

					//if ( this.survey.questions.some( q => q.type_id === 6 ) ) {
					if ( this.survey.type_id === 2 ) {
						this.$store.dispatch("stats/getCompetitionsTeams", this.survey.advanced.competition_id)
					}

					let isActive = this.survey.active
					let isPublic = this.survey.public
					let status = this.survey.survey_status.id
					let surveyDone = localStorage.getItem(this.slug + 'done');

					if ( surveyDone === 'true'  ) {
						this.message = 'You have successfully filled out the survey before!'
						return false
					}

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