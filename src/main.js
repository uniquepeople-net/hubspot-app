import styles from './scss/main.scss';

import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

// Axios
import axios from 'axios';
window.axios = axios;


// VueX Store
import store from './VuexStore/store';
window.store = store


// Vue ROUTER
import {routes} from './router/routes'
 
const router = createRouter({
    history: createWebHistory(),
    routes
}) 

// CryptoJs
import CryptoJs from 'crypto-js'; 
window.CryptoJs = CryptoJs;

//import helpers functions
import Helpers from './Helpers/Helpers';
window.Helpers = Helpers;

// User helper
import User from './Helpers/User';
window.User = User;


// Import main template
import App from './App.vue';

import PrimeVue from 'primevue/config';
import Chart from 'primevue/chart';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext'
import Divider from 'primevue/divider';
import Password from 'primevue/password';
import Button from 'primevue/button';
import InputIcon from './Dashboard/global/InputIcon.vue';
import InputError from './Dashboard/global/InputError.vue';


createApp(App)
	.use(router)
	.use(store)
	.use(PrimeVue)
	.component('Chart', Chart)
	.component('Dialog', Dialog)
	.component('InputText', InputText)
	.component('Divider', Divider)
	.component('Password', Password)
	.component('Button', Button)
	.component('InputError', InputError)
	.component('InputIcon', InputIcon)
	.mount('#app')