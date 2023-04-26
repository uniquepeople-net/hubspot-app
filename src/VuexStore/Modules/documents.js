export default {
	namespaced: true,
	state: () => ({
		documents: null,
	}),
	mutations: {
		SETDOCUMENTS( state, data ) {
			state.documents = data;
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
	}
}