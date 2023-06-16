export default {
	namespaced: true,
	state: () => ({
		documents: null,
		error: false,
	}),
	mutations: {
		SETDOCUMENTS( state, data ) {
			state.documents = data;
		},
		SETERROR( state, data ) {
			state.error = data
		},
		RESETSTATE ( state ) {
			// Merge rather than replace so we don't lose observers
			// https://github.com/vuejs/vuex/issues/1118
			Object.assign(state, {
				documents: null,
			})
		}
	},
	actions: {
		async getDocuments(context) {
			let documentsUrl = context.rootGetters['links/documents']

			await User.refreshedToken();

			await axios.get( documentsUrl, {
						headers: {
							Authorization: 'Bearer ' + User.getToken()
						}
					}).then( response => {
						context.commit("SETDOCUMENTS", response.data)
					}).catch( error => {
						context.commit("SETERROR", true)
						Toast.fire({
							icon: 'error',
							title: 'Unable to get documents'
						})
					})
		},
	},
	getters: {
		documents(state) {
			return state.documents
		},
		error(state) {
			return state.error
		},
	}
}