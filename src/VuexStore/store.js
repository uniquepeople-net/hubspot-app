import { createStore } from 'vuex'

import user from './Modules/user';
/*import allUsers from './Modules/allUsers';
import specificUser from './Modules/specificUser';
import instatByMatch from './Modules/instatByMatch';
import instatMatch from './Modules/instatMatch'; */

const store = createStore({
	modules: {
		links,
		user,
		/*allUsers,
		specificUser,
		instatByMatch,
		instatMatch */
	}
})

export default store;