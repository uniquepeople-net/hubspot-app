export default {
	namespaced: true,
	state: () => ({
		boardGroups: null,
		boardMembers: null,
	}),
	mutations: {
		SETBOARDGROUPS( state, data ) {
			state.boardGroups = data;
		},
		SETBOARDMEMBERS( state, data ) {
			state.boardMembers = data;
		},
		RESETSTATE ( state ) {
			// Merge rather than replace so we don't lose observers
			// https://github.com/vuejs/vuex/issues/1118
			Object.assign(state, {
				boardGroups: null,
				boardMembers: null
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
						context.commit("SETBOARDGROUPS", response.data)
					}).catch( error => {
						Toast.fire({
							icon: 'error',
							title: 'Unable to get board groups'
						})
					})
		},
		async getBoardMembers(context) {
			let membersUrl = context.rootGetters['links/boardMembers']
			
			await User.refreshedToken();
			
			await axios.get( membersUrl, {
				headers: {
					Authorization: 'Bearer ' + User.getToken()
				}
			}).then( response => {
				response.data.map( r =>  {
					if ( r.board_groups ) {
						r.groups = r.board_groups.map( item => item.name )
					}
				})						
				context.commit("SETBOARDMEMBERS", response.data)

			}).catch( error => {
				Toast.fire({
					icon: 'error',
					title: 'Unable to get board members'
				})
			})
		},
	},
	getters: {
		boardGroups(state) {
			return state.boardGroups
		},
		boardMembers(state) {
			return state.boardMembers
		},
	}
}