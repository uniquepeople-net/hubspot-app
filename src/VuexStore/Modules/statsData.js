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
		//restParamsIds: [-1, 0, 4, 13, ]
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
		RESETSTATE ( state ) {
			// Merge rather than replace so we don't lose observers
			// https://github.com/vuejs/vuex/issues/1118
			Object.assign(state, { 
				playerStats: null,
			})
		}
	},

	actions: {
		async getPlayerStats(context) {
			let url = context.rootGetters['links/lastMatchPlayerStats']
			let types = context.rootGetters['statsData/types'] 

			await User.refreshedToken();

			let statId = context.rootGetters['user/user'].instat_id;				

			await axios.get(url + statId)
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

					console.log(rest)
					
					rest.length = 10

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
		}
	}
}