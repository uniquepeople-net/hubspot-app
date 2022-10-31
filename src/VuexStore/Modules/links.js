export default {
	namespaced: true,
	state: () => ({		
		// API GW routes
		loginApiGwUrl: 			DOMAIN_URL + '/api/login',
		userProfileApiGwUrl: 	DOMAIN_URL + '/api/user-profile',
		refreshApiGwUrl: 		DOMAIN_URL + '/api/refresh',
		registerApiGwUrl: 		DOMAIN_URL + '/api/register',

		getAllUsers: 			DOMAIN_URL + '/api/users-all',


		// Auth service routes for token iss check
		loginAuthServiceUrl: 	'http://auth_nginx/api/login',
		registerAuthServiceUrl: 'http://auth_nginx/api/register',
	}),

	getters: {
		// Api Gw routes getters
		loginApiGwUrl(state) {
			return state.loginApiGwUrl
		},
		userProfileApiGwUrl(state) {
			return state.userProfileApiGwUrl
		},
		refreshApiGwUrl(state) {
			return state.refreshApiGwUrl
		},
		registerApiGwUrl(state) {
			return state.registerApiGwUrl
		},
		// Users api routes
		getAllUsers(state) {
			return state.getAllUsers
		},

		// Auth Service routes getters
		loginAuthServiceUrl(state) {
			return state.loginAuthServiceUrl
		},
		registerAuthServiceUrl(state) {
			return state.registerAuthServiceUrl
		},
	}
}