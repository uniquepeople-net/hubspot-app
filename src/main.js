import styles from './scss/main.scss';

import { createApp } from 'vue'
import App from './App.vue';

import axios from 'axios';
window.axios = axios;

// new createApp({
//     el: '#app',
//     render: h => h(App)
// });


createApp(App)
	.mount('#app')