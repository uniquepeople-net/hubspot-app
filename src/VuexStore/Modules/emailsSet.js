export default {
	namespaced: true,
	state: () => ({
		emails: null,
	}),
	mutations: {
		SETEMAILS( state, data ) {
			state.emails = data;
		},
		RESETSTATE ( state ) {
			// Merge rather than replace so we don't lose observers
			// https://github.com/vuejs/vuex/issues/1118
			Object.assign(state, {
				emails: null,
			})
		}
	},
	actions: {
		async getEmailsSet(context) {
			let emailsUrl = context.rootGetters['links/emailsSet']
			
			await User.refreshedToken();
			
			context.commit("SETEMAILS", null)
			
			await axios.get( emailsUrl, {
				headers: {
					Authorization: 'Bearer ' + User.getToken()
				}
			}).then( response => {
						if(response.data) {
							response.data.map( r => {
								r.report = Boolean(r.report)
								r.contact = Boolean(r.contact)
							})
						}
						context.commit("SETEMAILS", response.data)
					}).catch( error => {
						Toast.fire({
							icon: 'error',
							title: 'Unable to get emails'
						})
					})
		},
	},
	getters: {
		emails(state) {
			return state.emails
		},
	}
}