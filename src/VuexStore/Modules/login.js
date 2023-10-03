export default {
	namespaced: true,
	state: () => ({
		googleUrl: 'https://accounts.google.com',
		//facebookUrl: '',
		//githubUrl: '',
	}),

	mutations: {
		
	},

	actions: {
		
	},

	getters: {
		googleUrl(state) {
			return state.googleUrl
		},
	}
}