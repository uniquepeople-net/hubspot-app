// Vuex store
import store from '../VuexStore/store';
window.store = store;

let userProfileApiGwUrl = store.getters['links/userProfileApiGwUrl']

// User Helpers class
import User from '../Helpers/User';

// Components
import Login from '../Auth/Login.vue';
import Logout from '../Auth/Logout.vue';
import Forget from '../Auth/Forget.vue';

import Dashboard from '../Dashboard/Dashboard.vue';
import Users from '../Dashboard/structureComponents/Main/Users/Users.vue'
import AllUsers from '../Dashboard/structureComponents/Main/Users/AllUsers.vue'
import AddNewUser from '../Dashboard/structureComponents/Main/Users/AddNewUser.vue'
import SpecificUser from '../Dashboard/structureComponents/Main/Users/SpecificUser.vue'



export const routes = [

	{ path: '/', component: Dashboard, name: 'dashboard',
		children: [

			{ path: '/users', component: Users, name: 'users',

				children: [
					{ path: 'all', component: AllUsers, name: 'all-users',
						// Check if user has privileges to access this route
						beforeEnter: (to, from, next) => Helpers.checkAdmin( to, from, next, userProfileApiGwUrl, User.getToken() )
					},

					{ path: 'add-new-user', component: AddNewUser, name: 'add-new-user',
						beforeEnter: (to, from, next) => Helpers.checkAdmin( to, from, next, userProfileApiGwUrl, User.getToken() ) 
					},

					{ path: ':user_id', component: SpecificUser, name: 'specific-user',
						beforeEnter: (to, from, next) => Helpers.checkAdmin( to, from, next, userProfileApiGwUrl, User.getToken() )
					}
				]

			},			
		],
	},

	{ path: '/login', component: Login, name: 'login' },
    { path: '/logout', component: Logout, name:'logout' },
    { path: '/forget', component: Forget, name:'forget' },
	//{ path: '/user-profile', component: UserProfile, name:'user-profile' }
]