import User from "../../Helpers/User";

export default {
	namespaced: true,
	state: () => ({
		user: {},
		unAuth: false,
		loginUser: null
	}),

	mutations: {
		SETLOGINUSER( state, data ) {
			state.loginUser = data
		},
		SETUSER( state, data ) {
			state.user = {...data.user, memberships: [...data.memberships]};
			state.user.fee = Boolean(state.user.fee)			
		},
		SETUNAUTH( state, data ) {
			state.unAuth = data			
		},
		RESETSTATE ( state ) {
			// Merge rather than replace so we don't lose observers
			// https://github.com/vuejs/vuex/issues/1118
			Object.assign(state, { 
					user:{},
					loginUser: null
			})
		}
	},

	actions: {
		async getUser(context) {
			let userProfileUrl = context.rootGetters['links/userProfileApiGwUrl']

			await User.refreshedToken();

			// Get user data
			await axios.get(userProfileUrl, {
				headers: {
					Authorization: 'Bearer ' + User.getToken()
			}}).then( response => {
					if (response.data.message === "Unauthenticated.") {
						context.commit("SETUNAUTH", true)
					}
					
					context.commit("SETUSER", response.data)	

					// Get user emails by user id 
					context.dispatch("emails/getEmails", context.rootState.user.user.id, { root: true })
				})
				.catch( error => {
					context.commit("SETUNAUTH", true)
				})			
		},
		getLoginUser( context, data ) {
			data.first_login = Boolean(data.first_login)
			context.commit("SETLOGINUSER", data)
		}
	},

	getters: {
		loginUser(state) {
			return state.loginUser
		},
		user(state) {
			return state.user
		},
		unAuth(state) {
			return state.unAuth
		}
	}
}