import User from "../../Helpers/User";

export default {
	namespaced: true,
	state: () => ({
		user: {},
	}),

	mutations: {
		SETUSER( state, data ) {
			state.user = data;
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

			await axios.get(userProfileUrl, {
				headers: {
					Authorization: 'Bearer ' + User.getToken()
			}})
			.then( response => {
				context.commit("SETUSER", response.data)			 
			})
			
		}
	},

	getters: {
		userRole(state) {
			//return state.user.role_id
		}
	}
}