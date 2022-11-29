export default {
	namespaced: true,

	state: () => ({
		response: null
	}),

	mutations: {
		SETRESPONSE( state, data ) {
			state.response = data;
		},
		RESETSTATE ( state ) {
			// Merge rather than replace so we don't lose observers
			// https://github.com/vuejs/vuex/issues/1118
			Object.assign(state, {
				response: null
			})
		}
	},

	actions: {
		async sendEmail(context, data) {
			let sendEmailUrl = context.rootGetters['links/sendContactFormEmail']

			await User.refreshedToken();				
			context.commit("SETRESPONSE", null)

			await axios.post( sendEmailUrl , data, {
						headers: {
							Authorization: 'Bearer ' + User.getToken()
						}
					}).then( response => {
							console.log(response)
							
							context.commit("SETRESPONSE", response.data)
						})
		},
	},

	getters: {
		authorized(state) {
			return state.authorized
		},
		response(state) {
			return state.response
		}
	}
}