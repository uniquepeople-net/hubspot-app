import { toRaw } from 'vue';
import Helpers from '../../Helpers/Helpers';

export default {
	namespaced: true,

	state: () => ({
		playerStatsInfo: null,
		restParams: [],
		paramsAll: [],
		params: [],
		types: ['passes', 'shots', 'challenges', 'tackles' ],
		seasons: [],
		matches: [],
		playerStatsComponent: true,
		selectedMatch: null,
		team1: null,
		team2: null,
	}),

	mutations: {
		SETPLAYERSTATS( state, data ) {
			state.playerStatsInfo = data;
		},
		SETPARAMSALL( state, data ) {
			state.paramsAll = data;
		},
		SETPARAMS( state, data ) {
			state.params = data;
		},
		SETRESTPARAMS( state, data ) {
			state.restParams = data
		},
		SETSEASONS( state, data ) {
			state.seasons = data
		},
		SETMATCHES( state, data ) {
			state.matches = data
		},
		SETPLAYERSTATSCOMPONENT( state, data ) {
			state.playerStatsComponent = !state.playerStatsComponent
		},
		SETSELECTEDMATCH( state, data ) {
			state.selectedMatch = data
		},
		SETTEAM1( state, data ) {
			state.team1 = data
		},
		SETTEAM2( state, data ) {
			state.team2 = data
		},
		RESETSTATE ( state ) {
			// Merge rather than replace so we don't lose observers
			// https://github.com/vuejs/vuex/issues/1118
			Object.assign(state, { 
				playerStats: null,
			})
		}
	},

	actions: {
		async getPlayerStats(context, matchId) {			
			let statsBasic = context.rootGetters['links/statsBasic']
			let lastMatch = context.rootGetters['links/lastMatchPlayerStats']
			let matchPlayer = context.rootGetters['links/matchPlayerStats']
			let match = context.rootGetters['links/match']
			let types = context.rootGetters['statsData/types']

			await User.refreshedToken();

			context.commit("SETPLAYERSTATSCOMPONENT")

			let statId = context.rootGetters['user/user'].instat_id;				
			let url

			if ( matchId ) {
				url = statsBasic + matchPlayer + statId + match + matchId
			} else {
				url = statsBasic + lastMatch + statId
			}

			await axios.get(url)
				.then( response => {

					let paramsAll = response.data.param;

					context.commit("SETPLAYERSTATS", response.data.info)
					context.commit("SETPARAMSALL", paramsAll)

					let data = {
						passes: [],
						passes_all: 0,
						passes_acc: 0,
						passes_inacc: 0,
						challenges: [],
						challenges_all: 0,
						challenges_won: 0,
						challenges_lost: 0,
						shots: [],
						shots_all: 0,
						shots_target: 0,
						shots_wide: 0,
						tackles: [],
						tackles_all: 0,
						tackles_won: 0,
						tackles_lost: 0,
					}
					
					let rest = []

					paramsAll.map( param => {						
						types.map( type => {
							if (param.param_name.toLowerCase().includes(type) && !param.param_name.includes('span angle 90°')
								&& !param.param_name.includes('180 degrees') && !param.param_name.includes('%')) {
								
								data[type].push(param)
									
							}					
						})

						param.param_id === 3 && (data.passes_all = param.value)
						param.param_id === 2 && (data.passes_acc = param.value)
						param.param_id === 625 && (data.passes_inacc = param.value)	

						param.param_id === 277 && (data.challenges_all = param.value)
						param.param_id === 278 && (data.challenges_won = param.value)
						param.param_id === 627 && (data.challenges_lost = param.value)

						param.param_id === 61 && (data.shots_all = param.value)
						param.param_id === 49 && (data.shots_target = param.value)
						param.param_id === 105 && (data.shots_wide = param.value)

						param.param_id === 280 && (data.tackles_all = param.value)
						param.param_id === 281 && (data.tackles_won = param.value)
						param.param_id === 630 && (data.tackles_lost = param.value)	
						
					})
					
					paramsAll.map ( param => {
						let typesParam = /passes|challenges|shots|tackles/i.test(param.param_name)
						if ( !typesParam ) { 
							rest.push(param)
						}
					})
					
					rest.length = 6
					context.commit("SETPLAYERSTATSCOMPONENT")
					context.commit("SETPARAMS", data)
					context.commit("SETRESTPARAMS", rest)				

				}).catch(error => {
					if (!error.response) {
						// network error
						this.errorStatus = 'Error: Network Error';
					} else {
						this.errorStatus = error.response.data.message;
					}
				})
		},
		async getPlayerData(context, seasonId = 30) {
			let statsBasic = context.rootGetters['links/statsBasic']
			let seasonMatches = context.rootGetters['links/seasonMatches']
			let seasonsAll = context.rootGetters['links/seasonsAll']
			let season = context.rootGetters['links/season']

			let statId = context.rootGetters['user/user'].instat_id;

			await User.refreshedToken();

			await axios.get(statsBasic + seasonsAll + statId)
				.then( response => {
					context.commit("SETSEASONS", response.data)
				})

			await axios.get( statsBasic + seasonMatches + statId + season + seasonId )
				.then( response => {
					response.data.map( resp => {
						resp.matchData = resp.team1_name + ' - ' + resp.team2_name + ' (' + resp.score + ')'
					})
					context.commit("SETMATCHES", response.data )
					let matchesArr = response.data;
					context.commit("SETSELECTEDMATCH", matchesArr[0])
					context.dispatch("getTeam",{id: matchesArr[0].team1_id, teamNum: 1});
					context.dispatch("getTeam", {id: matchesArr[0].team2_id, teamNum: 2});
				})
		},
		async getMatch( context, matchId) {
			await User.refreshedToken();
			let matches = context.rootGetters['statsData/matches']
			matches.map( match => {
				if ( match.match_id === matchId ) {
					context.commit("SETSELECTEDMATCH", match)
					context.dispatch("getTeam",{id: match.team1_id, teamNum: 1});
					context.dispatch("getTeam", {id: match.team2_id, teamNum: 2});
				}
			})
		},
		async getTeam( context, data) {
			await User.refreshedToken();
			let statsBasic = context.rootGetters['links/statsBasic']
			let team = context.rootGetters['links/team']
			
			await axios.get( statsBasic + team + data.id)
				.then( response => {
					context.commit("SETTEAM" + data.teamNum , response.data[0])
				}) 
		} 
	},

	getters: {
		params(state) {
			return toRaw(state.params)
		},
		paramsAll(state) {
			return toRaw(state.paramsAll)
		},
		restParams( state ) {
			return state.restParams
		},
		types( state ) {
			return state.types
		},
		seasons( state ) {
			return state.seasons
		},
		matches( state ) {
			return state.matches
		},
		playerStatsComponent( state ) {
			return state.playerStatsComponent
		}, 
		selectedMatch( state ) {
			return state.selectedMatch
		}, 
		team1( state ) {
			return state.team1
		}, 
		team2( state ) {
			return state.team2
		}, 

	}
}