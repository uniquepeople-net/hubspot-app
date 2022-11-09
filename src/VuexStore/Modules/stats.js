export default {
	namespaced: true,

	state: () => ({
		matches: [],
		match: {}
	}),

	mutations: {
		SETMATCHES( state, data ) {
			state.matches = data;
		},
		SETMATCH( state, data ) {
			state.match = data;
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

			await axios.get(instatBasic + instatPlayerMatches + instatId + instatTournamentSeason + season + instatOPtions)
				.then( response => {
					context.commit("SETMATCHES", response.data.data.match)
				})
		},
		async getMatch( context, matchId ) {
			let instatBasic = context.rootGetters['links/instatBasic']
			let instatMatch = context.rootGetters['links/instatMatch']
			let instatOPtions = context.rootGetters['links/instatOPtions']

			await User.refreshedToken();

			await axios.get(instatBasic + instatMatch + matchId + instatOPtions)
				.then( response => {
					console.log(response.data.data.match_info[0])
					
					//context.commit("SETMATCH", response.data.data.match)
				})
		}
	},

	getters: {
		matches(state) {
			return state.matches
		}
	}
}