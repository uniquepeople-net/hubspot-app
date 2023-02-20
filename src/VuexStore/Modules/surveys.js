import axios from "axios";

export default {
	namespaced: true,

	state: () => ({
		surveys: null,
		questionTypes: null,
		newSurvey: null
	}),

	mutations: {
		SETSURVEYS( state, data ) {
			state.surveys = data;
		},
		SETQUESTTYPES( state, data ) {
			state.questionTypes = data
		},
		SETNEWSURVEY( state, data ) {
			state.newSurvey = data
		},
		RESETSTATE ( state ) {
			// Merge rather than replace so we don't lose observers
			// https://github.com/vuejs/vuex/issues/1118
			Object.assign(state, { 
				surveys: null,
			})
		}
	},
	
	actions: {
		async getSurveys(context, param) {
			let surveysLink = context.rootGetters['links/surveys']
			
			await User.refreshedToken();		

			await axios.get(surveysLink, {
					headers: {
						Authorization: 'Bearer ' + User.getToken()
				}})
				.then( response => {
					context.commit("SETSURVEYS", response.data)
				})
				.catch( error =>  {
					Toast.fire({
						icon: 'error',
						title: 'Unable to load surveys'
					})
				})
		},
		async getQuestTypes( context ) {
			let questTypesLink = context.rootGetters['links/questionTypes']
			
			await User.refreshedToken();
			
			await axios.get( questTypesLink, {
						headers: {
							Authorization: 'Bearer ' + User.getToken()
					}})
					.then( response =>  {
						context.commit("SETQUESTTYPES", response.data)	
					})
					.catch( error => {
						Toast.fire({
							icon: 'error',
							title: 'Unable to load question types'
						})
					})
		},
		setNewSurvey( context, data ) {
			
		}
	},

	getters: {
		surveys(state) {
			return state.surveys
		},
		questionTypes(state) {
			return state.questionTypes
		}
	}
}