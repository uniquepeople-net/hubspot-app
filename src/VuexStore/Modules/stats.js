import Helpers from "../../Helpers/Helpers"

export default {
	namespaced: true,

	state: () => ({
		playerDetails: null,
		playerCareer: null,
		playerMatches: null,
		matchDetails: null,
		matchStats: null,
		matchVideo: null,
		team1: null,
		team2: null,
		scorersTeam1: null,
		scorersTeam2: null,
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
		SETMATCHSTATS( state, data ) {
			state.matchStats = data
		},
		SETMATCHVIDEO( state, data ) {
			state.matchVideo = data
		},
		SETTEAM1( state, data ) {
			state.team1 = data
		},
		SETTEAM2( state, data ) {
			state.team2 = data
		},
		SETSCORERTEAM1( state, data ) {
			state.scorersTeam1 = data
		},
		SETSCORERTEAM2( state, data ) {
			state.scorersTeam2 = data
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
				matchVideo: null,
				team1: null,
				team2: null,
				scorersTeam1: null,
				scorersTeam2: null,
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

					//create separated objects with matches based on seasonId
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
								
					const teamsData = response.data.teamsData
					const key1 = Object.keys(teamsData)[0];
					const key2 = Object.keys(teamsData)[1];

					const team1 = {...teamsData[key1]};
					const team2 = {...teamsData[key2]};
					
					Helpers.substitionsHelper(team1)
					Helpers.substitionsHelper(team2)

					context.commit("SETTEAM1", team1.side === 'home' ? team1 : team2)
					context.commit("SETTEAM2", team2.side === 'away' ? team2 : team1)

					let playersTeam1, playersTeam2
				
					if ( team1.side === 'home' ) {
						playersTeam1 = [...team1.formation.bench, ...team1.formation.lineup]
						playersTeam2 = [...team2.formation.bench, ...team2.formation.lineup]
					} else {
						playersTeam1 = [...team2.formation.bench, ...team2.formation.lineup]
						playersTeam2 = [...team1.formation.bench, ...team1.formation.lineup]
					}

					let scorersTeam1 = playersTeam1.filter( p => p.goals !== '0' || p.ownGoals !== '0' && p.player)
					let scorersTeam2 = playersTeam2.filter( p => p.goals !== '0' || p.ownGoals !== '0' && p.player)

					context.commit("SETSCORERTEAM1", scorersTeam1)
					context.commit("SETSCORERTEAM2", scorersTeam2)
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
		async getMatchStats( context, id ) {
			let statBasicUrl = context.rootGetters['links/statBasicUrl']

			await User.refreshedToken();

			axios.get( statBasicUrl + 'matches/' + id  + '/advancedstats',  {
				headers: {
					Authorization: 'Basic ' + process.env.VUE_APP_WY_KE
				}})
				.then( response => {
					let team1 = context.rootGetters['stats/team1']
					let team2 = context.rootGetters['stats/team2']

					for (let [key, value] of Object.entries(response.data)) {
						for (let [keyIn, valueIn] of Object.entries(value)) {
							if ( Number(keyIn) === Number(team1.teamId) ) {
								value['team1'] = valueIn
								delete value[keyIn]
							} else if ( Number(keyIn) === Number(team2.teamId) ){
								value['team2'] = valueIn
								delete value[keyIn]
							}
						}
					}

					context.commit("SETMATCHSTATS", response.data)
				})
				.catch( error => {
					Toast.fire({
						icon: 'error',
						timer: 5000,
						title: "Unable to load match stats"
					})
				})

		},
		async getMatchVideo( context, id ) {
			let statBasicUrl = context.rootGetters['links/statBasicUrl']

			await User.refreshedToken();

			axios.get( statBasicUrl + 'videos/' + id /* + '/qualities' */ /* + '/offsets' */,  {
				headers: {
					Authorization: 'Basic ' + process.env.VUE_APP_WY_KE
				}})
				.then( response => {
					console.log(response)
					context.commit("SETMATCHVIDEO", response.data)
				})
				.catch( error => {
					Toast.fire({
						icon: 'error',
						timer: 5000,
						title: "Unable to load match video"
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
		matchStats(state) {
			return state.matchStats
		},
		matchVideo(state) {
			return state.matchVideo
		},
		team1(state) {
			return state.team1
		},
		team2(state) {
			return state.team2
		},
		scorersTeam1(state) {
			return state.scorersTeam1
		},
		scorersTeam2(state) {
			return state.scorersTeam2
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