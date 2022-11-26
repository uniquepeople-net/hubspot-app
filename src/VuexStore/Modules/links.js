export default {
	namespaced: true,
	state: () => ({		
		// API GW routes
		loginApiGwUrl: 			DOMAIN_URL + '/api/login',
		userProfileApiGwUrl: 	DOMAIN_URL + '/api/user-profile',
		refreshApiGwUrl: 		DOMAIN_URL + '/api/refresh',
		registerApiGwUrl: 		DOMAIN_URL + '/api/register',

		getAllUsers: 			DOMAIN_URL + '/api/users-all',
		specificUser:			DOMAIN_URL + '/api/users/',
		profileUser:			DOMAIN_URL + '/api/users/update',


		// Instat API
		instatBasic:				'https://service.instatfootball.com/feed.php?id=1098908&key=4VYKAPm0',				 
		instatPlayerData:			'&tpl=11&player_id=',
		instatTeamData:				'&tpl=12&team_id=',
		instatOPtions:				'&lang_id=1&lang=en&format=json',
		instatPlayerMatches:		'&tpl=41&player_id=',
		instatTournamentSeason:		'&tournament_id=40&season_id=',
		instatMatch:				'&tpl=37&match_id=',

		// Own Stats API
		statsBasic:					'https://futbal-data.uniquepeople.sk/api.php?action=',
		lastMatchPlayerStats:		'get_player_stats_last_match&player_id=',
		matchPlayerStats:			'get_player_stats_by_match&player_id=',
		seasonsAll:					'get_player_seasons&player_id=',
		seasonMatches:				'get_player_matches&player_id=',
		season:						'&season_id=',
		match:						'&match_id=',
		team:						'get_team_info&team_id=',

		// Auth service routes for token iss check
		loginAuthServiceUrl: 		'http://auth_nginx/api/login',
		registerAuthServiceUrl: 	'http://auth_nginx/api/register',

		// Email service routes
		sendContactFormEmail: 	DOMAIN_URL + '/api/send-form-email',
	}),

	getters: {
		// Api Gw routes getters
		loginApiGwUrl(state) {
			return state.loginApiGwUrl
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

		// Instat API
		instatBasic(state) {
			return state.instatBasic
		},
		instatPlayerData(state) {
			return state.instatPlayerData
		},
		instatTeamData(state) {
			return state.instatTeamData
		},
		instatPlayerMatches(state) {
			return state.instatPlayerMatches
		},
		instatMatch(state) {
			return state.instatMatch
		},
		instatTournamentSeason(state) {
			return state.instatTournamentSeason
		},
		instatOPtions(state) {
			return state.instatOPtions
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
	}
}