import { createStore } from 'vuex'

import user from './Modules/user';
import links from './Modules/links';
import users from './Modules/users';
import specificUser from './Modules/specificUser';
import appData from './Modules/appData';
import stats from './Modules/stats';
import statsData from './Modules/statsData';
import emails from './Modules/emails';
import payments from './Modules/payments';
import news from './Modules/news'
import groups from './Modules/groups'
import surveys from './Modules/surveys'


const store = createStore({
	modules: {
		links,
		user,
		users,
		specificUser,
		appData,
		stats,
		statsData,
		emails,
		payments,
		news,
		groups,
		surveys
	}
})

export default store;