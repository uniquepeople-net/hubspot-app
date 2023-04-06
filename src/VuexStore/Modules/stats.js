export default {
	namespaced: true,

	state: () => ({
		areas: [],
		competitionsList: {},
		competitionsDetail: {},
		competitionsTeams: [],
		teamSquad: []
	}),

	mutations: {
		SETAREAS( state, data ) {
			state.areas = data;
		},
		SETCOMPETITIONSLIST( state, data ) {
			state.competitionsList = data;
		},
		SETCOMPETITIONSDETAIL( state, data) {
			state.competitionsDetail = data
		},
		SETCOMPETITIONSTEAMS( state, data) {
			state.competitionsTeams = data
		},
		SETTEAMSQUAD( state, data) {
			state.teamSquad = data
		},
		RESETSTATE ( state ) {
			// Merge rather than replace so we don't lose observers
			// https://github.com/vuejs/vuex/issues/1118
			Object.assign(state, { 
				areas: [],
				competitionsList: {},
				competitionsDetail: {},
				competitionsTeams: {},
			})
		}
	},

	actions: {
		async getAreas(context, season = 30) {
			let instatBasic = context.rootGetters['links/statBasicUrl']
			

			await User.refreshedToken();

			let instatId = context.rootGetters['user/user'].instat_id;				

			/* await axios.get(instatBasic + instatPlayerMatches + instatId + instatTournamentSeason + season + instatOPtions)
				.then( response => {
					context.commit("SETMATCHES", response.data.data.match)
				}) */
		},
		async getCompetitionsList( context, matchId ) {
			let instatBasic = context.rootGetters['links/instatBasic']
			let instatMatch = context.rootGetters['links/instatMatch']
			let instatOPtions = context.rootGetters['links/instatOPtions']

			await User.refreshedToken();

			/* await axios.get(instatBasic + instatMatch + matchId + instatOPtions)
				.then( response => {
					context.commit("SETMATCH", response.data.data.match_info[0])
				}) */
		},
		async getCompetitionsDetail( context, team ) {
			let instatBasic = context.rootGetters['links/instatBasic']
			let instatTeamData = context.rootGetters['links/instatTeamData']
			let instatOPtions = context.rootGetters['links/instatOPtions']

			await User.refreshedToken();
			
			/* await axios.get(instatBasic + instatTeamData + team.id + instatOPtions)
				.then( response => {				
					context.commit("SETTEAM" + team.number , response.data.data.row[0])
				}) */ 
		},
		async getCompetitionsTeams( context ) {
			let statBasicUrl = context.rootGetters['links/statBasicUrl']

			//await User.refreshedToken();
			
			await axios.get(statBasicUrl + 'competitions/775/teams', {
				headers: {
					Authorization: 'Basic Z2wydHVjdS1jZjV3NnJsaTYtM3BnbHJqNi13ZHdyNWU1aHN3OjVpJUdXaE50XnFTcGZCcHU0c241c3VieHEtK3M5UQ=='
				}})
				.then( response => {		
					context.commit("SETCOMPETITIONSTEAMS", response.data.teams)
				})
				.catch( error => console.log(error))
		},
		async getTeamSquad( context, id ) {
			let statBasicUrl = context.rootGetters['links/statBasicUrl']

			//await User.refreshedToken();
			
			await axios.get(statBasicUrl + 'teams/' + id + '/squad', {
				headers: {
					Authorization: 'Basic Z2wydHVjdS1jZjV3NnJsaTYtM3BnbHJqNi13ZHdyNWU1aHN3OjVpJUdXaE50XnFTcGZCcHU0c241c3VieHEtK3M5UQ=='
				}})
				.then( response => {			
					context.commit("SETTEAMSQUAD", response.data.squad)
				})
				.catch( error => console.log(error))

			await axios.get(statBasicUrl + 'teams/' + id + '/transfers?fromDate=2022-08-01&toDate=2023-04-04&details=player', {
				headers: {
					Authorization: 'Basic Z2wydHVjdS1jZjV3NnJsaTYtM3BnbHJqNi13ZHdyNWU1aHN3OjVpJUdXaE50XnFTcGZCcHU0c241c3VieHEtK3M5UQ=='
				}}).then( response => {
					let transfers = response.data.transfer;
					let squad = context.rootGetters['stats/teamSquad']
					
					transfers.map( t => {
						if ( t.fromTeamId === id ) {
							squad.push( t.player )
						}
					})
					context.commit("SETTEAMSQUAD", squad)
				})
		},

	},

	getters: {
		competitionsTeams(state) {
			return state.competitionsTeams
		},
		teamSquad(state) {
			return state.teamSquad
		}
	}
}