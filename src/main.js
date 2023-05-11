import styles from './scss/main.scss';

import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { i18n } from './plugins/vuelidate-i18n'

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

router.beforeEach((to, from, next) => {
	const lang = to.params.lang // extract language parameter from URL	
	let language
	
	// get from local storage before set language
	let storageLang = localStorage.getItem('lang')
	storageLang ? language = storageLang : language = lang

	if (language && i18n.global.availableLocales.includes(language)) {
		i18n.locale = language // set the current locale to the extracted language
		i18n.global.locale = language
	} else {
		i18n.locale = 'en' // set default locale if the language is not valid
		i18n.global.locale = 'en'
	}
	// Redirect to language-specific URL if language is different from the current URL
	if (language !== lang) {
		const newPath = `/${language}${to.path.substring(3)}`
		next(newPath)
	  } else {
		next()
	  }
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
import PasswordSuggestions from './Dashboard/global/PasswordSuggestions.vue';
import LoadingIcon from './Dashboard/global/LoadingIcon.vue';

const app = createApp(App)

import { messages } from './Helpers/Languages'
app.config.globalProperties.$messages = messages;

app.use(router)
	.use(i18n)
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
	.component('LoadingIcon', LoadingIcon)
	.mount('#app')