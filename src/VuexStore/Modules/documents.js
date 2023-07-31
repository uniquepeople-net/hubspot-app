export default {
	namespaced: true,
	state: () => ({
		documents: null,
		docsCategories: null,
		error: false,
	}),
	mutations: {
		SETDOCUMENTS( state, data ) {
			state.documents = data;
		},
		SETDOCSCATEGORIES( state, data ) {
			state.docsCategories = data;
		},
		SETERROR( state, data ) {
			state.error = data
		},
		RESETSTATE ( state ) {
			// Merge rather than replace so we don't lose observers
			// https://github.com/vuejs/vuex/issues/1118
			Object.assign(state, {
				documents: null,
				docsCategories: null,
				error: null
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
		async getDocsCategories(context) {
			let documentsUrl = context.rootGetters['links/docsCategories']

			await User.refreshedToken();

			await axios.get( documentsUrl, {
						headers: {
							Authorization: 'Bearer ' + User.getToken()
						}
					}).then( response => {
						context.commit("SETDOCSCATEGORIES", response.data)
					}).catch( error => {
						context.commit("SETERROR", true)
						Toast.fire({
							icon: 'error',
							timer: 4000,
							title: 'Unable to get documents'
						})
					})
		},
	},
	getters: {
		documents(state) {
			return state.documents
		},
		docsCategories(state) {
			return state.docsCategories
		},
		error(state) {
			return state.error
		},
	}
}