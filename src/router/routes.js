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

import MyBoard from '../Dashboard/structureComponents/Main/MyBoard/MyBoard.vue';

import Users from '../Dashboard/structureComponents/Main/Users/Users.vue'
import AllUsers from '../Dashboard/structureComponents/Main/Users/AllUsers.vue'
import AddNewUser from '../Dashboard/structureComponents/Main/Users/AddNewUser.vue'
import SpecificUser from '../Dashboard/structureComponents/Main/Users/SpecificUser.vue'
import EmailEditor from '../Dashboard/structureComponents/Main/Users/EmailEditor.vue'
import AssignGroup from '../Dashboard/structureComponents/Main/Users/AssignGroup.vue'

import Myprofile from '../Dashboard/structureComponents/Main/Profile/MyProfile.vue';

import Wallet from '../Dashboard/structureComponents/Main/Payment/Wallet.vue';
import WalletInfo from '../Dashboard/structureComponents/Main/Payment/WalletInfo.vue'
import Pay from '../Dashboard/structureComponents/Main/Payment/Pay.vue'
import PayStatus from '../Dashboard/structureComponents/Main/Payment/PayStatus.vue'

import Instat from '../Dashboard/structureComponents/Main/Stats/Instat.vue';

import Info from '../Dashboard/structureComponents/Main/Info/Info.vue';
import InfoUfp from '../Dashboard/structureComponents/Main/Info/InfoUfp.vue';
import InfoOther from '../Dashboard/structureComponents/Main/Info/InfoOther.vue';

import Emails from '../Dashboard/structureComponents/Main/Emails/Emails.vue';
import Inbox from '../Dashboard/structureComponents/Main/Emails/Inbox.vue';
import SpecificEmail from '../Dashboard/structureComponents/Main/Emails/SpecificEmail.vue';


import NewsRumors from '../Dashboard/structureComponents/Main/FootballNews/NewsRumors.vue';

import Settings from '../Dashboard/structureComponents/Main/Settings/Settings.vue';
import Products from '../Dashboard/structureComponents/Main/Settings/Products.vue';
import ProductsAll from '../Dashboard/structureComponents/Main/Settings/ProductsAll.vue';
import SpecificProduct from '../Dashboard/structureComponents/Main/Settings/SpecificProduct.vue';
import AddNewProduct from '../Dashboard/structureComponents/Main/Settings/AddNewProduct.vue';
import Groups from '../Dashboard/structureComponents/Main/Settings/Groups.vue';
import GroupsAll from '../Dashboard/structureComponents/Main/Settings/GroupsAll.vue';
import AddNewGroup from '../Dashboard/structureComponents/Main/Settings/AddNewGroup.vue';


export const routes = [

	{ path: '/', component: Dashboard, name: 'dashboard',
		children: [

			{ path: '/my-board', component: MyBoard, name: 'my-board' },

			{ path: '/stats', component: Instat, name: 'instat' },

			{ path: '/users', component: Users, name: 'users', redirect: { name: 'all-users' },
				// Check if user has privileges to access this route
				beforeEnter: (to, from, next) => Helpers.checkAdmin( to, from, next, userProfileApiGwUrl, User.getToken() ),

				children: [
					{ path: 'all', component: AllUsers, name: 'all-users' },

					{ path: 'add-new-user', component: AddNewUser, name: 'add-new-user' },

					{ path: ':user_id', component: SpecificUser, name: 'specific-user' },

					{ path: 'send-emails', component: EmailEditor, name: 'send-emails', props: true },

					{ path: 'assign-group', component: AssignGroup, name: 'assign-group', props: true }
				]

			},
			
			{ path: '/my-profile', component: Myprofile, name: 'my-profile' },

			{ path: '/wallet', component: Wallet, name: 'wallet', redirect: { name: 'wallet-info' },

				children: [
					{ path: 'wallet-info', component: WalletInfo, name: 'wallet-info' },

					{ path: 'pay', component: Pay, name: 'wallet-pay' },
					
					{ path: 'pay-status', component: PayStatus, name: 'wallet-pay-status' },
				]

			},
						
			{ path: '/info', component: Info, name: 'info', redirect: { name: 'info-ufp' },

				children: [
					{ path: 'ufp', component: InfoUfp, name: 'info-ufp' },

					//{ path: 'other', component: InfoOther, name: 'info-other' },
				]

			},

			{ path: '/emails', component: Emails, name: 'emails', props: true, redirect: { name: 'inbox' },

				children: [
					{ path: 'inbox', component: Inbox, name: 'inbox', props: true },

					{ path: ':email_id', component: SpecificEmail, name: 'specific-email', props: true},
				]

			},

			{ path: '/news', component: NewsRumors, name: 'news-rumors' },

			{ path: '/settings', component: Settings, name: 'settings', props: true, redirect: { name: 'products' },
				
				// Check if user has privileges to access this route
				beforeEnter: (to, from, next) => Helpers.checkAdmin( to, from, next, userProfileApiGwUrl, User.getToken() ),

				children: [
					{ path: 'payments', component: Products, name: 'payments', props: true, redirect: { name: 'products' },
					
						children: [
							{ path: 'products', component: ProductsAll, name: 'products', props: true },

							{ path: 'products/:product_id', component: SpecificProduct, name: 'specific-product', props: true },
							
							{ path: 'products/add-new', component: AddNewProduct, name: 'add-new-product', props: true },
						]

					},

					{ path: 'groups', component: Groups, name: 'groups', props: true, redirect: { name: 'groups-all' },
					
						children: [
							{ path: 'all', component: GroupsAll, name: 'groups-all', props: true },

							/* { path: 'products/:product_id', component: SpecificProduct, name: 'specific-product', props: true },*/
							
							//{ path: 'add-new', component: AddNewGroup, name: 'add-new-group', props: true },
						]

					},
				]
			},
			


		],
	},

	{ path: '/login', component: Login, name: 'login' },
    { path: '/logout', component: Logout, name:'logout' },
    { path: '/forget', component: Forget, name:'forget' },
]