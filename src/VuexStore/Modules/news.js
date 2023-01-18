export default {
	namespaced: true,

	state: () => ({
		redditNews: null,
	}),

	mutations: {
		SETREDDITNEWS( state, data ) {
			state.redditNews = data;
		},
		RESETSTATE ( state ) {
			// Merge rather than replace so we don't lose observers
			// https://github.com/vuejs/vuex/issues/1118
			Object.assign(state, { 
				redditNews: null,
			})
		}
	},

	actions: {
		async getRedditNews(context, param) {
			let redditNewsLink = context.rootGetters['links/redditSoccer']
			
			await User.refreshedToken();		

			await axios.get(redditNewsLink + param + '.json')
				.then( response => {
					let news = response.data.data.children.filter( n => n.data.author !== '2soccer2bot' && n.data.author !== 'AutoModerator') 
										
					context.commit("SETREDDITNEWS", news)
				})
		},
		resetNews(context) {
			context.commit("RESETSTATE")
		}
	},

	getters: {
		redditNews(state) {
			return state.redditNews
		}
	}
}