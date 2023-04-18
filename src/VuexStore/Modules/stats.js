export default {
	namespaced: true,

	state: () => ({
		playerDetails: null,
		playerCareer: null,
		playerMatches: null,
		matchDetails: null,
		areas: [],
		competitionsList: [],
		competitionsDetail: {},
		competitionsTeams: [],
		teamSquad: []
	}),

	mutations: {
		SETPLAYERDETAILS( state, data ) {
			state.playerDetails = data
		},
		SETPLAYERCAREER( state, data ) {
			state.playerCareer = data
		},
		SETPLAYERMATCHES( state, data ) {
			state.playerMatches = data
		},
		SETMATCHDETAILS( state, data ) {
			state.matchDetails = data
		},
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
				playerDetails: null,
				playerMatches: null,
				playerCareer: null,
				matchDetails: null,
				areas: [],
				competitionsList: [],
				competitionsDetail: {},
				competitionsTeams: [],
				teamSquad: []
			})
		}
	},

	actions: {
		async getPlayerDetails( context, id ) {
			let statBasicUrl = context.rootGetters['links/statBasicUrl']

			await User.refreshedToken();

			axios.get( statBasicUrl + 'players/' + id + '?details=currentTeam', {
				headers: {
					Authorization: 'Basic ' + process.env.VUE_APP_WY_KE
				}})
				.then( response => {
					context.commit("SETPLAYERDETAILS", response.data)
				})
				.catch( error => {
					Toast.fire({
						icon: 'error',
						timer: 5000,
						title: "Unable to load player details"
					})
				})
		},
		async getPlayerCareer( context, id ) {
			let statBasicUrl = context.rootGetters['links/statBasicUrl']

			await User.refreshedToken();

			axios.get( statBasicUrl + 'players/' + id + '/career?details=season,competition', {
				headers: {
					Authorization: 'Basic ' + process.env.VUE_APP_WY_KE
				}})
				.then( response => {
					context.commit("SETPLAYERCAREER", response.data.career.reverse())
				})
				.catch( error => {
					Toast.fire({
						icon: 'error',
						timer: 5000,
						title: "Unable to load player seasons"
					})
				})
		},
		async getPlayerMatches( context, id ) {
			let statBasicUrl = context.rootGetters['links/statBasicUrl']

			await User.refreshedToken();

			axios.get( statBasicUrl + 'players/' + id + '/matches', {
				headers: {
					Authorization: 'Basic ' + process.env.VUE_APP_WY_KE
				}})
				.then( response => {

					/* const result = response.data.matches.reduce((acc, curr) => {
						const key = curr.seasonId;
						const obj = curr;
						if (!acc[key]) {
							acc[key] = [obj];
						} else {
							acc[key].push(obj);
						}
						return acc;
					}, {}); */
					  
					context.commit("SETPLAYERMATCHES", response.data.matches)
				})
				.catch( error => {
					Toast.fire({
						icon: 'error',
						timer: 5000,
						title: "Unable to load player matches"
					})
				})			
		},
		async getPlayerMatchesBySeason( context, data ) {
			let statBasicUrl = context.rootGetters['links/statBasicUrl']

			await User.refreshedToken();

			axios.get( statBasicUrl + 'players/' + data.userId + '/matches?seasonId=' + data.seasonId , {
				headers: {
					Authorization: 'Basic ' + process.env.VUE_APP_WY_KE
				}})
				.then( response => {
					context.commit("SETPLAYERMATCHES", response.data.matches)
				})
				.catch( error => {
					Toast.fire({
						icon: 'error',
						timer: 5000,
						title: "Unable to load player matches"
					})
				})			
		},
		async getMatchDetails( context, id ) {
			let statBasicUrl = context.rootGetters['links/statBasicUrl']

			await User.refreshedToken();

			axios.get( statBasicUrl + 'matches/' + id + '?details=coaches,players,teams,competition,round,season', {
				headers: {
					Authorization: 'Basic ' + process.env.VUE_APP_WY_KE
				}})
				.then( response => {
					context.commit("SETMATCHDETAILS", response.data)
				})
				.catch( error => {
					Toast.fire({
						icon: 'error',
						timer: 5000,
						title: "Unable to load match details"
					})
				})
		},
		async getAreas(context, season = 30) {
			let instatBasic = context.rootGetters['links/statBasicUrl']
			

			await User.refreshedToken();

			let instatId = context.rootGetters['user/user'].instat_id;				

			/* await axios.get(instatBasic + instatPlayerMatches + instatId + instatTournamentSeason + season + instatOPtions)
				.then( response => {
					context.commit("SETMATCHES", response.data.data.match)
				}) */
		},
		async getCompetitionsList( context  ) {
			let statBasicUrl = context.rootGetters['links/statBasicUrl']
			let competitionsListSvk = context.rootGetters['links/competitionsListSvk']

			await User.refreshedToken();

			await axios.get(statBasicUrl + competitionsListSvk, {
				headers: {
					Authorization: 'Basic ' + process.env.VUE_APP_WY_KE
				}})
				.then( response => {
					context.commit("SETCOMPETITIONSLIST", response.data.competitions)
				})
				.catch( error => {
					Toast.fire({
						icon: 'error',
						timer: 5000,
						title: "Unable to load competitions list"
					})
				})
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
		async getCompetitionsTeams( context, id ) {
			let statBasicUrl = context.rootGetters['links/statBasicUrl']

			//await User.refreshedToken();
			
			await axios.get(statBasicUrl + 'competitions/' + id + '/teams', {
				headers: {
					Authorization: 'Basic ' + process.env.VUE_APP_WY_KE
				}})
				.then( response => {		
					context.commit("SETCOMPETITIONSTEAMS", response.data.teams)
				})
				.catch( error => {
					Toast.fire({
						icon: 'error',
						timer: 5000,
						title: "Unable to load competition teams"
					})
				})
		},
		async getTeamSquad( context, id ) {
			let statBasicUrl = context.rootGetters['links/statBasicUrl']

			//await User.refreshedToken();
			
			await axios.get(statBasicUrl + 'teams/' + id + '/squad', {
				headers: {
					Authorization: 'Basic ' + process.env.VUE_APP_WY_KE
				}})
				.then( response => {			
					context.commit("SETTEAMSQUAD", response.data.squad)
				})
				.catch( error => {
					Toast.fire({
						icon: 'error',
						timer: 5000,
						title: "Unable to load team squad"
					})
				})

			await axios.get(statBasicUrl + 'teams/' + id + '/transfers?fromDate=2022-08-01&toDate=2023-04-04&details=player', {
				headers: {
					Authorization: 'Basic ' + process.env.VUE_APP_WY_KE
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
				.catch( error => {
					Toast.fire({
						icon: 'error',
						timer: 5000,
						title: "Unable to load team squad"
					})
				})
		},
		async getWomensFutbalnetTeams( context ) {
			await axios.get( 'https://sutaze.api.sportnet.online/api/v1/public/competitions/629778567163293609a40351/parts/629df93778fdf23f5007cf08/teams' )
				.then( response => {
					let teams = response.data.teams.map( t => {
						let originUrl = t.organization.logo_public_url
						const parts = originUrl.split('/');
						parts.pop(); // remove the last portion of the URL which is the filename
						const newUrl = `${parts.join('/')}/logo`;
						t.organization.logo_public_url = newUrl
						return t
					})

					context.commit("SETCOMPETITIONSTEAMS", teams)
				})
				.catch( error => {
					Toast.fire({
						icon: 'error',
						timer: 5000,
						title: "Unable to load womens teams"
					})
				})
		}
	},

	getters: {
		playerDetails(state) {
			return state.playerDetails
		},
		playerCareer(state) {
			return state.playerCareer
		},
		playerMatches(state) {
			return state.playerMatches
		},
		matchDetails(state) {
			return state.matchDetails
		},
		competitionsTeams(state) {
			return state.competitionsTeams
		},
		teamSquad(state) {
			return state.teamSquad
		},
		competitionsList(state) {
			return state.competitionsList
		}
	}
}