import { createStore } from 'vuex'

import user from './Modules/user';
import links from './Modules/links';
import users from './Modules/users';
import specificUser from './Modules/specificUser';
import appData from './Modules/appData';
import stats from './Modules/stats';
import emails from './Modules/emails';

const store = createStore({
	modules: {
		links,
		user,
		users,
		specificUser,
		appData,
		stats,
		emails
	}
})

export default store;