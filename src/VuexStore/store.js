import { createStore } from 'vuex'

import login from './Modules/login';
import products from './Modules/products';

const store = createStore({
	modules: {
		login,
		products
	}
})

export default store;
