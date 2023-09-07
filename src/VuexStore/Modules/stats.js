import axios from "axios"
import Helpers from "../../Helpers/Helpers"

export default {
	namespaced: true,

	state: () => ({
		playerDetails: null,
		playerCareer: null,
		playerMatches: [],
		playerStats: null,
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
		teamSquad: [],
		currentSeason: null,
		allCompetitionsTeams: null,
		formations: null,
		compareSearched: null
	}),

	mutations: {
		SETPLAYERDETAILS( state, data ) {
			state.playerDetails = data
		},
		SETPLAYERCAREER( state, data ) {
			state.playerCareer = data
		},
		SETPLAYERMATCHES( state, data ) {
			state.playerMatches = [ ...state.playerMatches, ...data ]
		},
		SETPLAYERSTATS( state, data ) {
			state.playerStats = data
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
		SETCURRENTSEASON( state, data) {
			state.currentSeason = data
		},
		SETALLCOMPETITIONSTEAMS( state, data ) {
			state.allCompetitionsTeams = data
		},
		SETFORMATIONS( state, data ) {
			state.formations = data
		},
		SETCOMPARESEARCHED( state, data ) {
			state.compareSearched = data
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
				teamSquad: [],
				currentSeason: null,
				allCompetitionsTeams: null
			})
		}
	},

	actions: {
		async getPlayerDetails( context, id ) {
			let statBasicUrl = context.rootGetters['links/statBasicUrl']

			await User.refreshedToken();

			axios.get( statBasicUrl + 'get_player_current&player_id=' + id, {
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

			axios.get( statBasicUrl + 'get_player_career&player_id=' + id, {
				headers: {
					Authorization: 'Basic ' + process.env.VUE_APP_WY_KE
				}})
				.then( response => {
					let reversedSeasons = response.data.career.reverse()
					context.commit("SETPLAYERCAREER", reversedSeasons)
					
					const currentDate = new Date();
					let currentSeason = {};

					reversedSeasons.map( s => {
						let endDate = new Date(s.season.endDate)
						let startDate = new Date(s.season.startDate)
						
						if ( startDate < currentDate && endDate > currentDate ) {							
							currentSeason = Object.entries(s).reduce((acc, [key, value]) => {
								acc[key] = (acc[key] || 0) + value;
								return acc;
							}, { ...currentSeason });
						}
					})
					context.commit("SETCURRENTSEASON", currentSeason)				
				})
				.catch( error => {
					Toast.fire({
						icon: 'error',
						timer: 5000,
						title: "Unable to load player seasons"
					})
				})
		},
		async getPlayerMatches( context, data ) {
			let statBasicUrl = context.rootGetters['links/statBasicUrl']

			await User.refreshedToken();

			await axios.get( statBasicUrl + 'get_player_matches_details&player_id=' + data.id + '&page=' + data.page, {
				headers: {
					Authorization: 'Basic ' + process.env.VUE_APP_WY_KE
				}})
				.then( response => {

					let matchesLength = context.rootGetters['stats/playerMatches'].length
					
					if ( matchesLength/10 >= data.page ) return

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
					
					
					let matchesDividedTeams = response.data.matches.map( item => {
						const teamsData = item.detail.teamsData
						const key1 = Object.keys(teamsData)[0];
						const key2 = Object.keys(teamsData)[1];
						
						const team1 = {...teamsData[key1]};
						const team2 = {...teamsData[key2]};
												
						if ( team1.hasFormation && team2.hasFormation ) {
							Helpers.substitionsHelper(team1)
							Helpers.substitionsHelper(team2)

							let playersTeam1, playersTeam2
						
							if ( team1.side === 'home' ) {
								playersTeam1 = [...team1.formation.bench, ...team1.formation.lineup]
								playersTeam2 = [...team2.formation.bench, ...team2.formation.lineup]
							} else {
								playersTeam1 = [...team2.formation.bench, ...team2.formation.lineup]
								playersTeam2 = [...team1.formation.bench, ...team1.formation.lineup]
							}

							let scorersTeam1 = playersTeam1.filter( p => Number(p.goals) > 0 || Number(p.ownGoals) > 0 && p.player)
							let scorersTeam2 = playersTeam2.filter( p => Number(p.goals) > 0 || Number(p.ownGoals) > 0 && p.player)
							
							item.scorersHome = scorersTeam1
							item.scorersAway = scorersTeam2
						}
						
						item.home = team1.side === 'home' ? team1 : team2
						item.away = team2.side === 'away' ? team2 : team1
					})
					
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
		async getPalyerStats( context, data ) {
			let statBasicUrl = context.rootGetters['links/statBasicUrl']

			await User.refreshedToken();

			axios.get( statBasicUrl + 'get_player_match_stats&player_id=' + data.id + '&match_id=' + data.matchId, {
				headers: {
					Authorization: 'Basic ' + process.env.VUE_APP_WY_KE
				}})
				.then( response => {
					context.commit("SETPLAYERSTATS", response.data)
				})
				.catch( error => {
					context.commit("SETPLAYERSTATS", null)
					Toast.fire({
						icon: 'error',
						timer: 5000,
						title: "Unable to load player stats"
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

			console.log('repos')
			

			//await User.refreshedToken();

			/* axios.get( statBasicUrl + 'matches/' + id + '?details=coaches,players,teams,competition,round,season', {
				headers: {
					Authorization: 'Basic ' + process.env.VUE_APP_WY_KE,
				}})
				.then( response => {
					console.log(response)
					
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

					let scorersTeam1 = playersTeam1.filter( p => Number(p.goals) > 0 || Number(p.ownGoals) > 0 && p.player)
					let scorersTeam2 = playersTeam2.filter( p => Number(p.goals) > 0 || Number(p.ownGoals) > 0 && p.player)

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
				}) */
		},
		async getMatchStats( context, data ) {
			let statBasicUrl = context.rootGetters['links/statBasicUrl']

			await User.refreshedToken();

			axios.get( statBasicUrl + 'get_match_advanced_stats&match_id=' + data.id,  {
				headers: {
					Authorization: 'Basic ' + process.env.VUE_APP_WY_KE
				}})
				.then( response => {

					let home = data.homeId
					let away = data.awayId

					// rename Object keys to "home" and "away" instead team id
					for (let [key, value] of Object.entries(response.data)) {
						for (let [keyIn, valueIn] of Object.entries(value)) {
							if ( Number(keyIn) === Number(home) ) {
								value['home'] = valueIn
								delete value[keyIn]
							} else if ( Number(keyIn) === Number(away) ){
								value['away'] = valueIn
								delete value[keyIn]
							}
						}
					}

					context.commit("SETMATCHSTATS", response.data)
				})
				.catch( error => {
					context.commit("SETMATCHSTATS", null)
					Toast.fire({
						icon: 'error',
						timer: 5000,
						title: "Unable to load match stats"
					})
				})

		},
		async getMatchFormations( context, data ) {
			let statBasicUrl = context.rootGetters['links/statBasicUrl']
			let specificMatch = await context.dispatch('filterSpecificMatch', data.id)

			context.commit("SETFORMATIONS", null)
			await User.refreshedToken();

			axios.get( statBasicUrl + 'get_match_formations&match_id=' + data.id/* ,  {
				headers: {
					Authorization: 'Basic ' + process.env.VUE_APP_WY_KE
				}} */)
				.then( response => {
					let statBasicUrl = context.rootGetters['links/statBasicUrl']

					const teamsData = response.data
					const key1 = Object.keys(teamsData)[0];
					const key2 = Object.keys(teamsData)[1];
					
					const teamFormations1 = {...teamsData[key1]};
					const teamFormations2 = {...teamsData[key2]};					

					for (let key in teamsData) {
						teamsData.home = data.homeId === Number(key1) ? teamFormations1 : teamFormations2
						teamsData.away = data.awayId === Number(key2) ? teamFormations2 : teamFormations1
						delete teamsData[key]
					}
					
					teamsData.homeData = Helpers.findParentObject(teamsData.home, "scheme")
					teamsData.awayData = Helpers.findParentObject(teamsData.away, "scheme")					

					let updatedHomePlayers = teamsData.homeData.players.map((player) => {					
						let key = Object.keys(player)[0]
						
						let lineupPlayer = specificMatch[0].home.formation.lineup.find(
						  (lineupPlayer) => player[key].playerId === lineupPlayer.playerId
						)
					  
						if (lineupPlayer) {
						  return { ...player[key], details: lineupPlayer };
						}
					  
						return player;
					  })

					let updatedAwayPlayers = teamsData.awayData.players.map((player) => {					
						let key = Object.keys(player)[0]
						
						let lineupPlayer = specificMatch[0].away.formation.lineup.find(
						  (lineupPlayer) => player[key].playerId === lineupPlayer.playerId
						)
					  
						if (lineupPlayer) {
						  return { ...player[key], details: lineupPlayer };
						}
					  
						return player;
					  });

					
					teamsData.homePlayers = updatedHomePlayers
					teamsData.awayPlayers = updatedAwayPlayers

					context.commit("SETFORMATIONS", teamsData)

					/* const requestsHome = teamsData.homeData.players.map( player => {
						const key = Object.keys(player);
						return axios.get( statBasicUrl + 'get_player_current&player_id=' + player[key].playerId ) 
					})

					const requestsAway = teamsData.awayData.players.map( player => {
						const key = Object.keys(player);
						return axios.get( statBasicUrl + 'get_player_current&player_id=' + player[key].playerId ) 
					})

					Promise.all(requestsHome)
							.then(responses => {							
								updatedHomePlayers = Helpers.updatePlayersDetails( responses, teamsData.homeData.players )
								teamsData.homePlayers = updatedHomePlayers

								Promise.all(requestsAway)
								.then(responses => {							
									updatedAwayPlayers = Helpers.updatePlayersDetails( responses, teamsData.awayData.players )
									teamsData.awayPlayers = updatedAwayPlayers
									
									context.commit("SETFORMATIONS", teamsData)
								})
								.catch(error => {
									Toast.fire({
										icon: 'error',
										timer: 4000,
										title: "Unable to load player details"
									})
								});

							})
							.catch(error => {
								Toast.fire({
									icon: 'error',
									timer: 4000,
									title: "Unable to load player details"
								})
							}); */

					
				})
				.catch( error => {
					Toast.fire({
						icon: 'error',
						timer: 5000,
						title: "Unable to load match formations"
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

			//await User.refreshedToken();

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
		},
		async getAllCompetitionsTeams(context) {
			await context.dispatch('getCompetitionsList');
			let competitions = context.rootGetters['stats/competitionsList'];
			let competitionsIds = [775, 770, 772, 1530]
			let allTeamsObj;

			return Promise.all(
				competitions.map(async (c, index, array) => {
					await context.dispatch('getCompetitionsTeams', c.wyId);
			
					let teams = context.rootGetters['stats/competitionsTeams'];
					//let allTeamsObj = context.rootGetters['stats/allCompetitionsTeams'];
					let actualTeams =  { name: c.name, teams: [...teams] };

					if ( competitionsIds.includes(c.wyId) ) {
						allTeamsObj = allTeamsObj ? [ ...allTeamsObj, actualTeams ] : [ actualTeams ]
						
						if (allTeamsObj.length === competitionsIds.length) {
							context.commit("SETALLCOMPETITIONSTEAMS", allTeamsObj)
						}
					}
				})
			);
		},
		async getCompareSearchedPlayers( context, phrase ) {
			let statBasicUrl = context.rootGetters['links/statBasicUrl']

			await User.refreshedToken();

			axios.get( statBasicUrl + 'get_search_players&phrase=' + phrase, {
				headers: {
					Authorization: 'Basic ' + process.env.VUE_APP_WY_KE
				}
			}).then( response => {
				context.commit("SETCOMPARESEARCHED", response.data)
			}).catch( error => {
				Toast.fire({
					icon: 'error',
					timer: 4000,
					title: "Unable to search players"
				})
			})
		},
		filterSpecificMatch(context, id) {
			let matches = context.rootGetters['stats/playerMatches']
			let specificMatch = matches.filter( item => item.matchId === id )
			return specificMatch
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
		playerStats(state) {
			return state.playerStats
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
		},
		currentSeason(state) {
			return state.currentSeason
		},
		allCompetitionsTeams(state) {
			return state.allCompetitionsTeams
		},
		formations(state) {
			return state.formations
		},
		compareSearched(state) {
			return state.compareSearched
		},
	}
}