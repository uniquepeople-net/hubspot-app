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
			let refreshApiUrl = context.rootGetters['links/refreshApiGwUrl']
			//const refresh = await User.refreshTokenRequest(User.getToken());

			await User.refreshWithRequest(User.getToken(), this.userProfileReq );			

			/* await axios.post(refreshApiUrl, null, {
				headers: {
					Authorization: 'Bearer ' + User.getToken()
			}})
			.then( response => {
				console.log(response.data)
				if ( response.data.authorisation ) {
					User.store(response.data.authorisation.token)
					
					axios.get(userProfileUrl, {
						headers: {
							Authorization: 'Bearer ' + User.getToken()
					}})
					.then( response => {
						console.log(response)
						context.commit("SETUSER", response.data)			 
					})
				}			
			}) */
		},
		userProfileReq() {
			/* axios.get(userProfileUrl, {
				headers: {
					Authorization: 'Bearer ' + token
			}})
			.then( response => {
				console.log(response)
				context.commit("SETUSER", response.data)			 
			}) */
			return 'hello'
			
		}
	},

	getters: {
		userRole(state) {
			//return state.user.role_id
		}
	}
}