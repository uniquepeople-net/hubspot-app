export default {
	namespaced: true,
	state: () => ({		
		// API GW routes
		loginApiGwUrl: 			'http://localhost:80/api/login',
		userProfileApiGwUrl: 	'http://localhost:80/api/user-profile',
		refreshApiGwUrl: 		'http://localhost:80/api/refresh',

		getAllUsers: 			'http://localhost:80/api/users-all',


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