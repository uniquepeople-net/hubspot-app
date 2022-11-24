export default {
	namespaced: true,

	state: () => ({
		matches: [],
		match: {},
		team1: {},
		team2: {},
	}),

	mutations: {
		SETMATCHES( state, data ) {
			state.matches = data;
		},
		SETMATCH( state, data ) {
			state.match = data;
		},
		SETTEAM1( state, data) {
			state.team1 = data
		},
		SETTEAM2( state, data) {
			state.team2 = data
		},
		RESETSTATE ( state ) {
			// Merge rather than replace so we don't lose observers
			// https://github.com/vuejs/vuex/issues/1118
			Object.assign(state, { 
				matches: [],
				match: {}
			})
		}
	},

	actions: {
		async getMatches(context, season = 30) {
			let instatBasic = context.rootGetters['links/instatBasic']
			let instatPlayerMatches = context.rootGetters['links/instatPlayerMatches']
			let instatTournamentSeason = context.rootGetters['links/instatTournamentSeason']
			let instatOPtions = context.rootGetters['links/instatOPtions']

			await User.refreshedToken();

			let instatId = context.rootGetters['user/user'].instat_id;				

			/* await axios.get(instatBasic + instatPlayerMatches + instatId + instatTournamentSeason + season + instatOPtions)
				.then( response => {
					context.commit("SETMATCHES", response.data.data.match)
				}) */
		},
		async getMatch( context, matchId ) {
			let instatBasic = context.rootGetters['links/instatBasic']
			let instatMatch = context.rootGetters['links/instatMatch']
			let instatOPtions = context.rootGetters['links/instatOPtions']

			await User.refreshedToken();

			/* await axios.get(instatBasic + instatMatch + matchId + instatOPtions)
				.then( response => {
					context.commit("SETMATCH", response.data.data.match_info[0])
				}) */
		},
		async getTeam( context, team ) {
			let instatBasic = context.rootGetters['links/instatBasic']
			let instatTeamData = context.rootGetters['links/instatTeamData']
			let instatOPtions = context.rootGetters['links/instatOPtions']

			await User.refreshedToken();
			
			/* await axios.get(instatBasic + instatTeamData + team.id + instatOPtions)
				.then( response => {				
					context.commit("SETTEAM" + team.number , response.data.data.row[0])
				}) */ 
		}
	},

	getters: {
		matches(state) {
			return state.matches
		},
		match(state) {
			return state.match
		},
		team1(state) {
			return state.team1
		},
		team2(state) {
			return state.team2
		}
	}
}