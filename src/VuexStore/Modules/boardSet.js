export default {
	namespaced: true,
	state: () => ({
		boardGroups: null,
	}),
	mutations: {
		SETBOARDGROUPS( state, data ) {
			state.boardGroups = data;
		},
		RESETSTATE ( state ) {
			// Merge rather than replace so we don't lose observers
			// https://github.com/vuejs/vuex/issues/1118
			Object.assign(state, {
				boardGroups: null,
			})
		}
	},
	actions: {
		async getBoardGroups(context) {
			let groupsUrl = context.rootGetters['links/boardGroups']
			
			await User.refreshedToken();
			
			await axios.get( groupsUrl, {
				headers: {
					Authorization: 'Bearer ' + User.getToken()
				}
			}).then( response => {
						console.log(response)
						
						context.commit("SETBOARDGROUPS", response.data)
					}).catch( error => {
						Toast.fire({
							icon: 'error',
							title: 'Unable to get board groups'
						})
					})
		},
	},
	getters: {
		boardGroups(state) {
			return state.boardGroups
		},
	}
}