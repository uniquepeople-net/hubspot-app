import { createStore } from 'vuex'

import user from './Modules/user';
import links from './Modules/links';
import users from './Modules/users';

const store = createStore({
	modules: {
		links,
		user,
		users
	}
})

export default store;