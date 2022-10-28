/* let Login = require('./vue/auth/AdminLogin.vue').default;
let Register = require('./vue/auth/Admin.Register.vue').default;
let Forget = require('./vue/auth/AdminForget.vue').default;
let Logout = require('./vue/auth/AdminLogout.vue').default;

let Dashboard = require('./vue/Dashboard.vue').default;
let UserProfile = require('./vue/left-panel/user-profile/UserProfile.vue').default;
let MyBoard = require('./vue/right-panel/Board/MyBoard.vue').default;
let Users = require('./vue/right-panel/Users/Users.vue').default;
let UserDetail = require('./vue/right-panel/Users/UserDetail.vue').default;
let PlayerStats = require('./vue/right-panel/Instat/PlayerStats.vue').default;
let OverallSeasonStats = require('./vue/right-panel/Instat/OverallSeasonStats.vue').default;

export const routes = [
    { path: '/', component: Dashboard, name: 'home',
		children: [
			{ path: '/user-profile',component: UserProfile },

			{ path: '/my-board', component: MyBoard, name: 'myboard'},

			{ path: '/users', component: Users, name: 'users' },

			{ path: '/users/user-:id', component: UserDetail, name: 'user-detail'},

			{ path: '/player-stats', component: PlayerStats, name: 'player-stats' },

			{ path: '/overall-season-stats', component: OverallSeasonStats, name: 'overall-season-stats' }
		],
	},
    { path: '/login', component: Login, name: 'login' },
    { path: '/register', component: Register, name:'register' },
    { path: '/logout', component: Logout, name:'logout' },
    { path: '/forget', component: Forget, name:'forget' },
	//{ path: '/user-profile', component: UserProfile, name:'user-profile' }
] */


import Login from '../Auth/Login.vue';
import Logout from '../Auth/Logout.vue';
//import Register from '../Auth/Register.vue';
import Forget from '../Auth/Forget.vue';

import Dashboard from '../Dashboard/Dashboard.vue';
import AllUsers from '../Dashboard/structureComponents/Main/Users/AllUsers.vue'


export const routes = [

	{ path: '/', component: Dashboard, name: 'dashboard',
		children: [
			/* { path: '/user-profile',component: UserProfile },

			{ path: '/my-board', component: MyBoard, name: 'myboard'}, */

			{ path: '/all-users', component: AllUsers, name: 'all-users' },

			/* { path: '/users/user-:id', component: UserDetail, name: 'user-detail'},

			{ path: '/player-stats', component: PlayerStats, name: 'player-stats' },

			{ path: '/overall-season-stats', component: OverallSeasonStats, name: 'overall-season-stats' } */
		],
	},

	{ path: '/login', component: Login, name: 'login' },
    //{ path: '/register', component: Register, name:'register' },
    { path: '/logout', component: Logout, name:'logout' },
    { path: '/forget', component: Forget, name:'forget' },
	//{ path: '/user-profile', component: UserProfile, name:'user-profile' }
]