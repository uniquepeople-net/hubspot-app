// Vuex store
import store from '../VuexStore/store';
window.store = store;

// Components
import Login from '../Auth/Login.vue';

import Dashboard from '../Dashboard/Dashboard.vue';



//import NotFound from '../Dashboard/global/NotFound.vue';
//import Helpers from '../Helpers/Helpers';



export const routes = [

	{
        path: '/', // empty path will redirect to default route
        redirect: { name: 'dashboard' }
    },

	{ path: '/', component: Dashboard, name: 'dashboard' },

	{ path: '/login', component: Login, name: 'login' },
	
	/* { path: '/:pathMatch(.*)*', component: NotFound, name: 'not-found'},
	
	{ path: '/:pathMatch(.*)*', component: NotFound , redirect: { name: 'not-found' } },

	{ path: '/404', component: NotFound, name: '404' }, */
]