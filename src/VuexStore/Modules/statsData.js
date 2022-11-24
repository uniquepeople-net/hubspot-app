import { toRaw } from 'vue';

export default {
	namespaced: true,

	state: () => ({
		playerStatsInfo: null,
		params: null
	}),

	mutations: {
		SETPLAYERSTATS( state, data ) {
			state.playerStatsInfo = data;
		},
		SETPARAMS( state, data ) {
			state.params = data;
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

			await User.refreshedToken();

			let statId = context.rootGetters['user/user'].instat_id;				

			await axios.get(url + statId)
				.then( response => {
					console.log(response)
					
					context.commit("SETPLAYERSTATS", response.data.info)
					context.commit("SETPARAMS", response.data.param)
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
	}
}