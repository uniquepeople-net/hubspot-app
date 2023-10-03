import styles from './scss/main.scss';

import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import vue3GoogleLogin from 'vue3-google-login'

// Axios
import axios from 'axios';
window.axios = axios;

// import js-cookie
import Cookies from 'js-cookie';
window.Cookies = Cookies

//import helpers functions
import Helpers from './Helpers/Helpers';
window.Helpers = Helpers;

// import User class
import User from './Helpers/User'
window.User = User

// Vue ROUTER
import {routes} from './router/routes'
 
export const router = createRouter({
    history: createWebHistory(),
	mode: "hash",
    routes
}) 


// VueX Store
import store from './VuexStore/store';
window.store = store

// import primevue components
import PrimeVue from 'primevue/config'

// Import main template
import App from './App.vue';

const app = createApp(App)


app.use(router)
	.use(store)
	.use(PrimeVue)
	.use(vue3GoogleLogin, {
		clientId: '465240835637-r8qei9ch3ks7eka428kj2a7mffkaviqh.apps.googleusercontent.com'
	})
	.mount('#app')