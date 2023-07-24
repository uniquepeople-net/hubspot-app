export default {
	namespaced: true,
	state: () => ({		
		// API GW routes
		loginApiGwUrl: 			DOMAIN_URL + '/api/login',
		logoutApiGwUrl: 		DOMAIN_URL + '/api/logout',
		userProfileApiGwUrl: 	DOMAIN_URL + '/api/user-profile',
		refreshApiGwUrl: 		DOMAIN_URL + '/api/refresh',
		registerApiGwUrl: 		DOMAIN_URL + '/api/register',
		registerNewApiGwUrl: 	DOMAIN_URL + '/api/register-new',
		reqPassForget:			DOMAIN_URL + '/api/req-password-reset',
		updatePassword:			DOMAIN_URL + '/api/update-password',
		
		// Users api routes
		getAllUsers: 			DOMAIN_URL + '/api/users-all',
		specificUser:			DOMAIN_URL + '/api/users/',
		profileUser:			DOMAIN_URL + '/api/users/update',
		updateFee:				DOMAIN_URL + '/api/users/update-fee/',
		updateFirstLogin:		DOMAIN_URL + '/api/users/update-first-login/',


		// Wyscout API
		statBasicUrl:			'https://apirest.wyscout.com/v3/',				 
		statAreas:				'areas',
		competitionsListSvk:	'competitions?areaId=SVK',
		competitionsFirstTeams:	'competitions/775/teams',
		teamPlayers:			'teams/',
		statPlayerMatches:		'&tpl=41&player_id=',
		statTournamentSeason:	'&tournament_id=40&season_id=',
		statMatch:				'&tpl=37&match_id=',

		// Own Stats API
		/* statsBasic:					'https://futbal-data.uniquepeople.sk/api.php?action=',
		lastMatchPlayerStats:		'get_player_stats_last_match&player_id=',
		matchPlayerStats:			'get_player_stats_by_match&player_id=',
		seasonsAll:					'get_player_seasons&player_id=',
		seasonMatches:				'get_player_matches&player_id=',
		season:						'&season_id=',
		match:						'&match_id=',
		team:						'get_team_info&team_id=', */

		// Auth service routes for token iss check
		loginAuthServiceUrl: 		'http://auth_nginx/api/login',
		registerAuthServiceUrl: 	'http://auth_nginx/api/register',

		// Email service routes
		sendContactFormEmail: 		DOMAIN_URL + '/api/send-form-email',
		getEmailsUrl: 				DOMAIN_URL + '/api/emails/',
		getSpecificEmail: 			DOMAIN_URL + '/api/email/',
		deleteEmails:				DOMAIN_URL + '/api/delete-emails',
		dynamicData:				DOMAIN_URL + '/api/dynamic-data',

		templates: 					DOMAIN_URL + '/api/templates',

		// Products service routes
		allProducts:				DOMAIN_URL + '/api/product',		
		addProduct:					DOMAIN_URL + '/api/product',	
		editProduct:				DOMAIN_URL + '/api/product/',
		//deleteProduct:				DOMAIN_URL + '/api/product/',	
		
		// Payment service routes
		payment:					DOMAIN_URL + '/api/payment', 
		googlePayment:				DOMAIN_URL + '/api/google-payment', 
		paymentUpdate:				DOMAIN_URL + '/api/payment/',
		payments:					DOMAIN_URL + '/api/payments', 
		listPayments:				DOMAIN_URL + '/api/list-payments', 
	
		// News links
		redditSoccer:				'https://www.reddit.com/r/soccer/',

		// Groups links
		groups:						DOMAIN_URL + '/api/groups',
		editGroup:					DOMAIN_URL + '/api/groups/',
		addGroup:					DOMAIN_URL + '/api/groups/store',
		assignGroups:				DOMAIN_URL + '/api/group-user/store',
		detachGroups:				DOMAIN_URL + '/api/group-user/detach',
		groupUser:					DOMAIN_URL + '/api/group-user',

		// Documents links
		documents:					DOMAIN_URL + '/api/documents',

		// Emails settings links
		emailsSet:					DOMAIN_URL + '/api/settings-emails',

		// Board settings links
		boardGroups:				DOMAIN_URL + '/api/settings-board',
		boardMembers:				DOMAIN_URL + '/api/settings-board-members',	

		// FAQ settings links
		faq: 						DOMAIN_URL + '/api/settings-faq',

		// Surveys links
		surveys:					DOMAIN_URL + '/api/surveys',
		addSurvey:					DOMAIN_URL + '/api/surveys/store',
		updateSurvey:				DOMAIN_URL + '/api/surveys/',
		questionTypes:				DOMAIN_URL + '/api/question-types',
		specificSurvey:				DOMAIN_URL + '/api/surveys/',
		showSurvey:					DOMAIN_URL + '/api/survey/',
		saveSurvey:					DOMAIN_URL + '/api/survey/',
		results:					DOMAIN_URL + '/api/results/',
		positions:					DOMAIN_URL + '/api/positions',
		types:						DOMAIN_URL + '/api/survey-types'

	}),

	getters: {
		// Api Gw routes getters
		loginApiGwUrl(state) {
			return state.loginApiGwUrl
		},
		logoutApiGwUrl(state) {
			return state.logoutApiGwUrl
		},
		userProfileApiGwUrl(state) {
			return state.userProfileApiGwUrl
		},
		refreshApiGwUrl(state) {
			return state.refreshApiGwUrl
		},
		registerApiGwUrl(state) {
			return state.registerApiGwUrl
		},
		registerNewApiGwUrl(state) {
			return state.registerNewApiGwUrl
		},
		reqPassForget(state) {
			return state.reqPassForget
		},
		updatePassword(state) {
			return state.updatePassword
		},
		
		// Users api routes
		getAllUsers(state) {
			return state.getAllUsers
		},
		specificUser(state) {
			return state.specificUser
		},
		profileUser(state) {
			return state.profileUser
		},
		updateFee(state) {
			return state.updateFee
		},
		updateFirstLogin(state) {
			return state.updateFirstLogin
		},

		// Wyscout API
		statAreas(state) {
			return state.statAreas
		},
		statBasicUrl(state) {
			return state.statBasicUrl
		},
		competitionsListSvk(state) {
			return state.competitionsListSvk
		},
		
		// Own API routes getters
		statsBasic(state) {
			return state.statsBasic
		},
		lastMatchPlayerStats(state) {
			return state.lastMatchPlayerStats
		},
		matchPlayerStats(state) {
			return state.matchPlayerStats
		},
		seasonMatches(state) {
			return state.seasonMatches
		},
		seasonsAll(state) {
			return state.seasonsAll
		},
		season(state) {
			return state.season
		},
		match(state) {
			return state.match
		},
		team(state) {
			return state.team
		},

		// Auth Service routes getters
		loginAuthServiceUrl(state) {
			return state.loginAuthServiceUrl
		},
		registerAuthServiceUrl(state) {
			return state.registerAuthServiceUrl
		},

		// Email Service routes getters
		sendContactFormEmail(state) {
			return state.sendContactFormEmail
		},
		getEmailsUrl(state) {
			return state.getEmailsUrl
		},
		getSpecificEmail(state) {
			return state.getSpecificEmail
		},
		deleteEmails(state) {
			return state.deleteEmails
		},
		dynamicData(state) {
			return state.dynamicData
		},
		templates(state) {
			return state.templates
		},

		// Products service routes getters
		allProducts(state) {
			return state.allProducts
		}, 
		editProduct(state) {
			return state.editProduct
		}, 
		addProduct(state) {
			return state.addProduct
		}, 

		// Payment service routes getters
		payment(state) {
			return state.payment
		}, 
		googlePayment(state) {
			return state.googlePayment
		}, 
		paymentUpdate(state) {
			return state.paymentUpdate
		}, 
		payments(state) {
			return state.payments
		}, 
		listPayments(state) {
			return state.listPayments
		}, 

		// News getters
		redditSoccer(state) {
			return state.redditSoccer
		},

		// Groups getters
		groups(state) {
			return state.groups
		},
		editGroup(state) {
			return state.editGroup
		},
		addGroup(state) {
			return state.addGroup
		},
		assignGroups(state) {
			return state.assignGroups
		},
		groupUser(state) {
			return state.groupUser
		},
		detachGroups(state) {
			return state.detachGroups
		},

		// Documents getters
		documents( state ) {
			return state.documents
		},

		// Emails settings getters
		emailsSet( state ) {
			return state.emailsSet
		},

		// Board settings getters
		boardGroups( state ) {
			return state.boardGroups
		},
		boardMembers( state ) {
			return state.boardMembers
		},

		// FAQ settings getters
		faq( state ) {
			return state.faq
		},

		// Surveys getters
		addSurvey(state) {
			return state.addSurvey
		},
		updateSurvey(state) {
			return state.updateSurvey
		},
		surveys(state) {
			return state.surveys
		},
		questionTypes(state) {
			return state.questionTypes
		},
		specificSurvey(state) {
			return state.specificSurvey
		},
		showSurvey(state) {
			return state.showSurvey
		},
		saveSurvey(state) {
			return state.saveSurvey
		},
		results(state) {
			return state.results
		},
		positions(state) {
			return state.positions
		},
		types(state) {
			return state.types
		},
	}
}