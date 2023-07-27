export default {
	namespaced: true,

	state: () => ({
		ufpNews: null,
		loading: false,
		redditNews: null,
		specificPost: null,
	}),

	mutations: {
		SETREDDITNEWS( state, data ) {
			state.redditNews = data;
		},
		SETUFPNEWS( state, data ) {
			state.ufpNews = data;
		},
		SETLOADING( state, data ) {
			state.loading = data
		},
		SETSPECIFICPOST( state, data ) {
			state.specificPost = data
		},
		RESETSTATE ( state ) {
			// Merge rather than replace so we don't lose observers
			// https://github.com/vuejs/vuex/issues/1118
			Object.assign(state, { 
				redditNews: null,
				ufpNews: null,
				loading: false,
				specificPost: null
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
		async getUfpNews( context ) {
			let ufpNewsLink = context.rootGetters['links/ufpNews']

			await User.refreshedToken();

			await axios.get(ufpNewsLink + '?page=1&per_page=10')
				.then( response => {
					context.commit("SETUFPNEWS", response.data) 
				})
				.catch( error => {
					Toast.fire({
						icon: 'error',
						timer: 4000,
						title: "Couldn't load UPF feed"
					})
				})
		},
		async loadMoreUfpNews( context, params ) {
			
			context.commit("SETLOADING", true)
			let ufpNewsLink = context.rootGetters['links/ufpNews']
			let posts = context.rootGetters['news/ufpNews']

			await User.refreshedToken();

			await axios.get(ufpNewsLink + '?page=' + params + '&per_page=10')
				.then( response => {
					let allPosts = [...posts, ...response.data]
					context.commit("SETLOADING", false)
					context.commit("SETUFPNEWS", allPosts) 
				})
				.catch( error => {
					context.commit("SETLOADING", false)
					Toast.fire({
						icon: 'error',
						timer: 4000,
						title: "Couldn't load UPF feed"
					})
				})
		},
		async getSpecArticle( context, id ) {
			let ufpNewsLink = context.rootGetters['links/ufpNews']

			await User.refreshedToken();

			await axios.get(ufpNewsLink + '/' + id)
				.then( response => {
					context.commit("SETSPECIFICPOST", response.data) 
				})
				.catch( error => {
					Toast.fire({
						icon: 'error',
						timer: 4000,
						title: "Couldn't load this article"
					})
				})
		},
		clearArticle(context) {
			context.commit("SETSPECIFICPOST", null)
		},
		resetNews(context) {
			context.commit("RESETSTATE")
		}

	},

	getters: {
		redditNews(state) {
			return state.redditNews
		},
		ufpNews(state) {
			return state.ufpNews
		},
		loading(state) {
			return state.loading
		},
		specificPost(state) {
			return state.specificPost
		}
	}
}