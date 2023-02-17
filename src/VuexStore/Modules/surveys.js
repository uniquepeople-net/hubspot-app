export default {
	namespaced: true,

	state: () => ({
		surveys: null,
	}),

	mutations: {
		SETSURVEYS( state, data ) {
			state.surveys = data;
		},
		RESETSTATE ( state ) {
			// Merge rather than replace so we don't lose observers
			// https://github.com/vuejs/vuex/issues/1118
			Object.assign(state, { 
				surveys: null,
			})
		}
	},
	
	actions: {
		async getSurveys(context, param) {
			let surveysLink = context.rootGetters['links/surveys']
			
			await User.refreshedToken();		

			await axios.get(surveysLink, {
					headers: {
						Authorization: 'Bearer ' + User.getToken()
				}})
				.then( response => {
					console.log(response)
					
					//let news = response.data.data.children.filter( n => n.data.author !== '2soccer2bot' && n.data.author !== 'AutoModerator') 
					context.commit("SETSURVEYS", response.data)
				})
		},
	},

	getters: {
		surveys(state) {
			return state.surveys
		}
	}
}