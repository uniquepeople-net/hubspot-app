import User from "../../Helpers/User";

export default {
	namespaced: true,
	state: () => ({
		user: {},
	}),

	mutations: {
		SETUSER( state, data ) {
			state.user = {...data.user};
			state.user.fee = Boolean(state.user.fee)			
		},
		RESETSTATE ( state ) {
			// Merge rather than replace so we don't lose observers
			// https://github.com/vuejs/vuex/issues/1118
			Object.assign(state, { 
					user:{},
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
			}})
			.then( response => {
				context.commit("SETUSER", response.data)			 
			})			

			// Get user emails by user id 
			await context.dispatch("emails/getEmails", context.rootState.user.user.id, { root: true })
		}
	},

	getters: {
		user(state) {
			return state.user
		}
	}
}