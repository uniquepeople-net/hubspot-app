export default {
	namespaced: true,
	state: () => ({
		loginAuthUrl: 'http://auth_nginx/api/login',
		registerAuthUrl: 'http://auth_nginx/api/register',
	}),

	getters: {
		jwtPayloadIss(state) {
			return state.jwtPayloadIss
		}
	}
}