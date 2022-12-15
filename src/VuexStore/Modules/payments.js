export default {
	namespaced: true,

	state: () => ({
		stripePubKey: 'pk_test_51MEDDqCf79OEZcUi83xIfRoEvrH9sIa2h2aE2vkcaWjajZv4WfC2Y91HEek2gm2qMIAdD1yXjUjVBqY0TE256ZiA00ZlXgpZjo',
		products: null,
	}),

	mutations: {
		SETPRODUCTS( state, data ) {
			state.products = data;
		},
		
		RESETSTATE ( state ) {
			// Merge rather than replace so we don't lose observers
			// https://github.com/vuejs/vuex/issues/1118
			Object.assign(state, {
				products: null
			})
		}
	},

	actions: {
		async getProducts(context, data) {
			let allProducts = context.rootGetters['links/allProducts']

			await User.refreshedToken();
			
			await axios.get( allProducts ,{
						headers: {
							Authorization: 'Bearer ' + User.getToken()
						}
					}).then( response => {
						console.log(response)
						
						context.commit("SETPRODUCTS", response.data)
					})
		},
		
	},

	getters: {
		products(state) {
			return state.products
		},
		stripePubKey(state) {
			return state.stripePubKey
		},
	}
}