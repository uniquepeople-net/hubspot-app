import styles from './scss/main.scss';

import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

// Axios
import axios from 'axios';
window.axios = axios;


// Sidebar helpers
/* import Sidebar from './Helpers/Sidebar';
window.Sidebar = Sidebar; */

// CryptoJs
import CryptoJs from 'crypto-js'; 
window.CryptoJs = CryptoJs;

//import helpers functions
import Helpers from './Helpers/Helpers';
window.Helpers = Helpers;

// User helper
import User from './Helpers/User';
window.User = User;

// Vue ROUTER
import {routes} from './router/routes'
 
export const router = createRouter({
    history: createWebHistory(),
	mode: "hash",
    routes
}) 

// SweetAlert 2
import Swal from 'sweetalert2';
window.Swal = Swal;

const Toast = Swal.mixin({
	toast: true,
	position: 'top',
	showConfirmButton: false,
	timer: 2500,
	timerProgressBar: true,
	didOpen: (toast) => {
	  toast.addEventListener('mouseenter', Swal.stopTimer)
	  toast.addEventListener('mouseleave', Swal.resumeTimer)
	}
})
window.Toast = Toast

// VueX Store
import store from './VuexStore/store';
window.store = store



// Import main template
import App from './App.vue';

import PrimeVue from 'primevue/config';
import Chart from 'primevue/chart';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext'
import Divider from 'primevue/divider';
import Password from 'primevue/password';
import Button from 'primevue/button';
import Menu from 'primevue/menu';
import Sidebar from 'primevue/sidebar';
import PanelMenu from 'primevue/panelmenu'
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';
import Row from 'primevue/row';
import ToggleButton from 'primevue/togglebutton';
import Dropdown from 'primevue/dropdown';
import Card from 'primevue/card';
import Skeleton from 'primevue/skeleton'
import ProgressSpinner from 'primevue/progressspinner';
import Fieldset from 'primevue/fieldset';
import Textarea from 'primevue/textarea';
import Badge from 'primevue/badge';
import Carousel from 'primevue/carousel';
//import BadgeDirective from 'primevue/badgedirective';

import InputIcon from './Dashboard/global/InputIcon.vue';
import InputError from './Dashboard/global/InputError.vue';
import PasswordSuggestions from './Dashboard/global/PasswordSuggestions.vue'


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
	.component('Menu', Menu)
	.component('Sidebar', Sidebar)
	.component('PanelMenu', PanelMenu)
	.component('DataTable', DataTable)
	.component('Column', Column)
	.component('ColumnGroup', ColumnGroup)
	.component('Row', Row)
	.component('ToggleButton', ToggleButton)
	.component('Dropdown', Dropdown)
	.component('Card', Card)
	.component('Skeleton', Skeleton)
	.component('PasswordSuggestions', PasswordSuggestions)
	.component('ProgressSpinner', ProgressSpinner)
	.component('Fieldset', Fieldset)
	.component('Textarea', Textarea)
	.component('Badge', Badge)
	.component('Carousel', Carousel)
	//.directive('badge', BadgeDirective)
	.mount('#app')