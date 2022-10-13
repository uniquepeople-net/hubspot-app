import styles from './scss/main.scss';

import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'


import axios from 'axios';
window.axios = axios;

// new createApp({
//     el: '#app',
//     render: h => h(App)
// });

// VueX Store
import store from './VuexStore/store';
window.store = store


// Vue ROUTER
import {routes} from './router/routes'
 
const router = createRouter({
    history: createWebHistory(),
    routes
}) 

// Import main template
import App from './App.vue';
//import Chart from 'primevue/chart';

createApp(App)
	.use(router)
	.use(store)
	//.component('Chart', Chart)
	.mount('#app')