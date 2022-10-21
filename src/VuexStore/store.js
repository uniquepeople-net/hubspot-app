import { createStore } from 'vuex'

import user from './Modules/user';
import links from './Modules/links';


const store = createStore({
	modules: {
		links,
		user
	}
})

export default store;