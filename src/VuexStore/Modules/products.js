export default {
	namespaced: true,
	state: () => ({
		endpointBase: 'https://api.hubapi.com/crm/v3/objects/products',
		list: null,
	}),
	mutations: {
		SETPRODUCTS( state, data ) {
			state.list = data
		},
	},
	actions: {
		async getProducts( context, query) {

			let endpointBase = context.rootGetters['products/endpointBase']

			await axios.get(endpointBase + query, {
					headers: {
						Authorization: 'Bearer pat-eu1-1831caf1-4459-4a16-8a55-c2b4938785e9'
					}
				}).then( response => {
					console.log(response)
				})
				.catch( error => {
					console.log(error)
				})		
		},
	},
	getters: {
		endpointBase( state ) {
			return state.endpointBase
		},
		list( state ) {
			return state.list
		}
	}
}