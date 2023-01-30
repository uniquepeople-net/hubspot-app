export default {
	namespaced: true,

	state: () => ({
		groups: null,
	}),

	mutations: {
		SETGROUPS( state, data ) {
			state.groups = data;
		},
		RESETSTATE ( state ) {
			// Merge rather than replace so we don't lose observers
			// https://github.com/vuejs/vuex/issues/1118
			Object.assign(state, {
				groups: null,
			})
		}
	},

	actions: {
		async getGroups(context, data) {
			let groupsUrl = context.rootGetters['links/groups']

			await User.refreshedToken();

			await axios.get( groupsUrl, {
						headers: {
							Authorization: 'Bearer ' + User.getToken()
						}
					}).then( groups => {
						context.commit("SETGROUPS", groups.data)
					})
		},
	},

	getters: {
		groups(state) {
			return state.groups
		},
	}
}