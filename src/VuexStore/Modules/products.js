export default {
	namespaced: true,
	state: () => ({
		endpointBase: 'api/products',
		accessToken: process.env.HUBSPOT_APP_API_TOKEN,
		list: null,
		loading: false,
		message: ''
	}),
	mutations: {
		SETPRODUCTSLIST( state, data ) {
			state.list = data
		},
		SETLOADING( state, data ) {
			state.loading = data
		}
	},
	actions: {
		// Get list of products
		async getProducts( context, query) {

			let endpointBase = context.rootGetters['products/endpointBase']
			let accessToken = context.rootGetters['products/accessToken']

			await axios.get(endpointBase, {
					headers: {
						Authorization: 'Bearer ' + accessToken
					}
				}).then( response => {
					if ( response.data ) {
						context.commit("SETPRODUCTSLIST", response.data.results)
					}
				})
				.catch( error => {
					console.log(error)
				})		
		},
		// Handle add, delete, update products based on passed action 
		async handleProduct( context, data ) {
			context.commit("SETLOADING", true)

			let endpointBase = context.rootGetters['products/endpointBase']
			let accessToken = context.rootGetters['products/accessToken']
			let config = { headers: {
								Authorization: 'Bearer ' + accessToken
						}}
			
			let axiosRequest;

			if (data.action === 'add') {
				axiosRequest = axios.post(endpointBase, { properties: { name: data.name, price: 99 } }, config);
			} else if (data.action === 'remove') {
				axiosRequest = axios.delete(endpointBase + '/' + data.id, config);
			} else if (data.action === 'update') {
				axiosRequest = axios.patch(endpointBase + '/' + data.id, { properties: { name: data.name } }, config);
			}

			if (axiosRequest) {
				try {
					const response = await axiosRequest;
				  	context.commit("SETLOADING", false);
				} catch (error) {
				  	console.log(error);
				  	context.commit("SETLOADING", false);
				}
			}	
		}
	},
	getters: {
		endpointBase( state ) {
			return state.endpointBase
		},
		accessToken( state ) {
			return state.accessToken
		},
		list( state ) {
			return state.list
		},
		loading( state ) {
			return state.loading
		}
	}
}