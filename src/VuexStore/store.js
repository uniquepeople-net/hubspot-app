import { createStore } from 'vuex'

import user from './Modules/user';
import links from './Modules/links';
import users from './Modules/users';
import specificUser from './Modules/specificUser'

const store = createStore({
	modules: {
		links,
		user,
		users,
		specificUser
	}
})

export default store;