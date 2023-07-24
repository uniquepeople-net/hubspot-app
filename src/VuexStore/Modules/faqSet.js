export default {
	namespaced: true,

	state: () => ({
		faq: null,
	}),

	mutations: {
		SETFAQ( state, data ) {
			state.faq = data;
		},
		RESETSTATE ( state ) {
			// Merge rather than replace so we don't lose observers
			// https://github.com/vuejs/vuex/issues/1118
			Object.assign(state, {
				faq: null,
			})
		}
	},

	actions: {
		async getFaq(context, data) {
			let faqUrl = context.rootGetters['links/faq']

			await User.refreshedToken();

			await axios.get( faqUrl, {
						headers: {
							Authorization: 'Bearer ' + User.getToken()
						}
					}).then( faq => {
						context.commit("SETFAQ", faq.data)
					}).catch( error => {
						Toast.fire({
							icon: 'error',
							title: 'Unable to get FAQ'
						})
					})
		},
	},

	getters: {
		faq(state) {
			return state.faq
		},
	}
}