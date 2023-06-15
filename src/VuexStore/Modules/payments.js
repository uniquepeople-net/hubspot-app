export default {
	namespaced: true,

	state: () => ({
		//stripePubKey: process.env.STRIPE_PUB_LIVE_KEY,
		//stripePubKey: process.env.STRIPE_PUB_TEST_KEY,
		stripePubKey: 'pk_live_51MEDDqCf79OEZcUi57jg0pjv3sGOgQYjbCwiUVtqMvrQva0qWA8mqxqYi1WK7147ueGAycz72DUp1mxgNLt2vVBb00ick95Fh3',
		//stripePubKey: 'pk_test_51MEDDqCf79OEZcUi83xIfRoEvrH9sIa2h2aE2vkcaWjajZv4WfC2Y91HEek2gm2qMIAdD1yXjUjVBqY0TE256ZiA00ZlXgpZjo',
		products: null,
		payProduct: null,
		payments: null,
		listPayments: null
	}),

	mutations: {
		SETPRODUCTS( state, data ) {
			state.products = data;
		},
		SETPAYPRODUCT( state, data ) {
			state.payProduct = data;
		},
		SETPAYMENTS( state, data ) {
			state.payments = data;
		},
		SETLISTPAYMENTS( state, data ) {
			state.listPayments = data;
		},
		RESETSTATE ( state ) {
			// Merge rather than replace so we don't lose observers
			// https://github.com/vuejs/vuex/issues/1118
			Object.assign(state, {
				products: null,
				payProduct: null,
				payments: null
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
						context.commit("SETPRODUCTS", response.data)
					})
		},

		setPayProduct( context, data ) {
			context.commit("SETPAYPRODUCT", data)
		},

		async getPayments( context , id) {
			let paymentsUrl = context.rootGetters['links/payments']

			await User.refreshedToken();

			await axios.get( paymentsUrl + '/' + id,  {
					headers: {
						Authorization: 'Bearer ' + User.getToken()
					}
				}).then( response => {				
					context.commit("SETPAYMENTS", response.data)
				})
			
		},
		async getListPayments( context , email) {
			let paymentsUrl = context.rootGetters['links/listPayments']

			await User.refreshedToken();

			await axios.post( paymentsUrl, {email}, {
					headers: {
						Authorization: 'Bearer ' + User.getToken()
					}
				}).then( response => {
					console.log(response)
									
					context.commit("SETLISTPAYMENTS", response.data.data)
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
		payProduct(state) {
			return state.payProduct
		},
		payments(state) {
			return state.payments
		},
		listPayments(state) {
			return state.listPayments
		}
	}
}