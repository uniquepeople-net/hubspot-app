// Vuex store
import store from '../VuexStore/store';
window.store = store;

let userProfileApiGwUrl = store.getters['links/userProfileApiGwUrl']

// User Helpers class
import User from '../Helpers/User';

// Components
import Intro from '../Auth/Intro.vue';
import Login from '../Auth/Login.vue';
import Logout from '../Auth/Logout.vue';
import Forget from '../Auth/Forget.vue';
import UpdatePassword	from '../Auth/UpdatePassword.vue';
import Register from '../Auth/Register.vue';

import Dashboard from '../Dashboard/Dashboard.vue';

import MyBoard from '../Dashboard/structureComponents/Main/MyBoard/MyBoard.vue';

import Users from '../Dashboard/structureComponents/Main/Users/Users.vue'
import AllUsers from '../Dashboard/structureComponents/Main/Users/AllUsers.vue'
import AddNewUser from '../Dashboard/structureComponents/Main/Users/AddNewUser.vue'
import SpecificUser from '../Dashboard/structureComponents/Main/Users/SpecificUser.vue'
import EmailEditor from '../Dashboard/structureComponents/Main/Users/EmailEditor.vue'
import AssignGroup from '../Dashboard/structureComponents/Main/Users/AssignGroup.vue'
import DetachGroup from '../Dashboard/structureComponents/Main/Users/DetachGroup.vue'

import Myprofile from '../Dashboard/structureComponents/Main/Profile/MyProfile.vue';

import Wallet from '../Dashboard/structureComponents/Main/Payment/Wallet.vue';
import WalletInfo from '../Dashboard/structureComponents/Main/Payment/WalletInfo.vue'
import Pay from '../Dashboard/structureComponents/Main/Payment/Pay.vue'
import PayStatus from '../Dashboard/structureComponents/Main/Payment/PayStatus.vue'

import Documents from '../Dashboard/structureComponents/Main/Documents/Documents.vue';

import Stats from '../Dashboard/structureComponents/Main/Stats/Stats.vue';
import MatchStats from '../Dashboard/structureComponents/Main/Stats/MatchData/MatchStats.vue';
import PlayerStats from '../Dashboard/structureComponents/Main/Stats/PlayerData/PlayerStats.vue';

import Info from '../Dashboard/structureComponents/Main/Info/Info.vue';
import InfoUfp from '../Dashboard/structureComponents/Main/Info/InfoUfp.vue';
import InfoOther from '../Dashboard/structureComponents/Main/Info/InfoOther.vue';

import Emails from '../Dashboard/structureComponents/Main/Emails/Emails.vue';
import Inbox from '../Dashboard/structureComponents/Main/Emails/Inbox.vue';
import SpecificEmail from '../Dashboard/structureComponents/Main/Emails/SpecificEmail.vue';


import FootballNews from '../Dashboard/structureComponents/Main/FootballNews/FootballNews.vue';
import NewsRumors from '../Dashboard/structureComponents/Main/FootballNews/NewsRumors.vue';
import VideoList from '../Dashboard/structureComponents/Main/FootballNews/VideoList.vue';
import EmbedVideo from '../Dashboard/structureComponents/Main/FootballNews/EmbedVideo.vue';

import Settings from '../Dashboard/structureComponents/Main/Settings/Settings.vue';
import Products from '../Dashboard/structureComponents/Main/Settings/Products.vue';
import ProductsAll from '../Dashboard/structureComponents/Main/Settings/ProductsAll.vue';
import SpecificProduct from '../Dashboard/structureComponents/Main/Settings/SpecificProduct.vue';
import AddNewProduct from '../Dashboard/structureComponents/Main/Settings/AddNewProduct.vue';
import Groups from '../Dashboard/structureComponents/Main/Settings/Groups.vue';
import GroupsAll from '../Dashboard/structureComponents/Main/Settings/GroupsAll.vue';
import AddNewGroup from '../Dashboard/structureComponents/Main/Settings/AddNewGroup.vue';
import DocumentsSet from '../Dashboard/structureComponents/Main/Settings/Documents/Documents.vue'
import AddNewDoc from '../Dashboard/structureComponents/Main/Settings/Documents/AddNewDocument.vue';
import DocsAll from '../Dashboard/structureComponents/Main/Settings/Documents/DocumentsAll.vue';


import Survey from '../Dashboard/structureComponents/Main/Settings/Surveys/AnswerSurvey/Survey.vue';

import Surveys from '../Dashboard/structureComponents/Main/Settings/Surveys/Surveys.vue';
import SurveysAll from '../Dashboard/structureComponents/Main/Settings/Surveys/SurveysAll.vue';
import SurveyAddNew from '../Dashboard/structureComponents/Main/Settings/Surveys/SurveyAddNew.vue';
import SurveySpecific from '../Dashboard/structureComponents/Main/Settings/Surveys/SurveySpecific.vue';
import AnswerStep from '../Dashboard/structureComponents/Main/Settings/Surveys/AnswerSurvey/AnswerStep.vue';
import AnswerResults from '../Dashboard/structureComponents/Main/Settings/Surveys/AnswerSurvey/AnswerResults.vue';
import SuccessPage from '../Dashboard/structureComponents/Main/Settings/Surveys/AnswerSurvey/SuccessPage.vue';

import AppSettings from '../Dashboard/structureComponents/Main/Settings/AppSettings/AppSettings.vue'
import AppSettingsAll from '../Dashboard/structureComponents/Main/Settings/AppSettings/AppSettingsAll.vue'

import BlockedPage from '../Dashboard/global/BlockedPage.vue'

import NotFound from '../Dashboard/global/NotFound.vue';
import Helpers from '../Helpers/Helpers';



export const routes = [

	{
        path: '/', // empty path will redirect to default route
        redirect: { name: 'dashboard', params: { lang: 'en' } }
    },

	{ path: '/:lang', component: Dashboard, name: 'dashboard',
		children: [

			{ path: '/:lang/my-board', component: MyBoard, name: 'my-board' },

			{ path: '/:lang/stats', component: Stats, name: 'stats', redirect: { name: 'match' },
				
				children: [
					
					{ path: 'match', component: MatchStats, name: 'match' },

					{ path: 'player', component: PlayerStats, name: 'player' },

				] 
			},

			{ path: '/:lang/documents', component: Documents, name: 'documents' },

			{ path: '/:lang/users', component: Users, name: 'users', redirect: { name: 'all-users' },
				// Check if user has privileges to access this route
				beforeEnter: (to, from, next) => {
					Helpers.checkAdmin( to, from, next, userProfileApiGwUrl, User.getToken() )
				},

				children: [
					{ path: 'all', component: AllUsers, name: 'all-users' },

					{ path: 'add-new-user', component: AddNewUser, name: 'add-new-user' },

					{ path: ':user_id', component: SpecificUser, name: 'specific-user' },

					{ path: 'send-emails', component: EmailEditor, name: 'send-emails', props: true },

					{ path: 'assign-group', component: AssignGroup, name: 'assign-group', props: true },

					{ path: 'detach-group', component: DetachGroup, name: 'detach-group', props: true }
				]

			},
			
			{ path: '/:lang/my-profile', component: Myprofile, name: 'my-profile' },

			{ path: '/:lang/wallet', component: Wallet, name: 'wallet', redirect: { name: 'wallet-info' },

				children: [
					{ path: 'wallet-info', component: WalletInfo, name: 'wallet-info' },

					{ path: 'pay', component: Pay, name: 'wallet-pay' },
					
					{ path: 'pay-status', component: PayStatus, name: 'wallet-pay-status' },
				]

			},
						
			{ path: '/:lang/info', component: Info, name: 'info', redirect: { name: 'info-ufp' },

				children: [
					{ path: 'ufp', component: InfoUfp, name: 'info-ufp' },

					//{ path: 'other', component: InfoOther, name: 'info-other' },
				]

			},

			{ path: '/:lang/emails', component: Emails, name: 'emails', props: true, redirect: { name: 'inbox' },

				children: [
					{ path: 'inbox', component: Inbox, name: 'inbox', props: true },

					{ path: ':email_id', component: SpecificEmail, name: 'specific-email', props: true},
				]

			},

			{ path: '/:lang/news', component: FootballNews, name: 'news-rumors', props: true, redirect: { name: 'news-rumors-news' }, 
		
				children: [
					{ path: 'news-rumors', component: NewsRumors, name: 'news-rumors-news', props: true },

					{ path: 'video-list', component: VideoList, name: 'news-rumors-video', props: true},
				]
			
			},

			{ path: '/:lang/settings', component: Settings, name: 'settings', props: true, redirect: { name: 'docs-all' },
				
				// Check if user has privileges to access this route
				beforeEnter: (to, from, next) => Helpers.checkAdmin( to, from, next, userProfileApiGwUrl, User.getToken() ),

				children: [
					{ path: 'docs', component: DocumentsSet, name: 'docs', props: true, redirect: { name: 'docs-all' },
					
						children: [
							{ path: 'all', component: DocsAll, name: 'docs-all', props: true },
							
							{ path: 'add-new', component: AddNewDoc, name: 'add-new-doc', props: true },
						]
					},

					{ path: 'products', component: Products, name: 'products', props: true, redirect: { name: 'products' },
					
						children: [
							{ path: 'all', component: ProductsAll, name: 'products-all', props: true },

							{ path: ':product_id', component: SpecificProduct, name: 'specific-product', props: true },
							
							{ path: 'add-new', component: AddNewProduct, name: 'add-new-product', props: true },
						]

					},

					{ path: 'groups', component: Groups, name: 'groups', props: true, redirect: { name: 'groups-all' },
					
						children: [
							{ path: 'all', component: GroupsAll, name: 'groups-all', props: true },
						]

					},

					{ path: 'surveys', component: Surveys, name: 'surveys', props: true, redirect: { name: 'surveys-all' },
					
						children: [
							{ path: 'all', component: SurveysAll, name: 'surveys-all', props: true },

							{ path: ':survey_id', component: SurveySpecific, name: 'specific-survey', props: true },

							{ path: 'add-new', component: SurveyAddNew, name: 'add-new-survey', props: true },

							{ path: 'results/:survey_id', component: AnswerResults, name: 'answer-results', props: true },
						]

					},

					{ path: 'app-settings', component: AppSettings, name: 'app-settings', props: true, redirect: { name: 'app-settings-all' },
					
						children: [
							{ path: 'all', component: AppSettingsAll, name: 'app-settings-all', props: true },
						]

					},
				]
			},

		],
	},

	{ path: '/:lang/intro', component: Intro, name: 'intro' },
	{ path: '/:lang/login', component: Login, name: 'login' },
    { path: '/:lang/logout', component: Logout, name:'logout' },
    { path: '/:lang/forgot', component: Forget, name:'forgot' },
    { path: '/:lang/update-password', component: UpdatePassword, name:'update-password' },
    { path: '/:lang/register', component: Register, name:'register' },

	{ path: '/:lang/survey/:slug', component: Survey, name:'survey', props: true ,
	
		children: [
			{ path: 'step/:step', component: AnswerStep, name:'step', props: true },
		],
		
	},
	
	{ path: '/:lang/success', component: SuccessPage, name:'success', props: true },
	
	
	{ path: '/:lang/:pathMatch(.*)*', component: NotFound},
	
	{ path: '/:lang/blocked', component: BlockedPage, name: 'blocked-page' },

	{ path: '/:lang/404', component: NotFound, name: '404' },
]