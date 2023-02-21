import axios from "axios";

export default {
	namespaced: true,

	state: () => ({
		surveys: null,
		questionTypes: null,
		newSurvey: {}
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
				questionTypes: null,
				newSurvey: {}
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
			let newSurvey = context.rootGetters['surveys/newSurvey']			

			if ( 'questions' in data ) {
				context.commit("SETNEWSURVEY", {...newSurvey, ...data })

			} else if ( 'title' in data ) {
				newSurvey.questions.map( quest => {
					if (quest.qId === data.qId)  {						  
						quest.title = data.title
						quest.type = data.type
					}					
				})
				
				context.commit("SETNEWSURVEY", { ...newSurvey })

			} else if ( 'open_value' in data ) {
				newSurvey.questions.map( quest => {
					if (quest.qId === data.qId)  {	 
						quest.open_value = data.open_value
					}					
				})
				
				context.commit("SETNEWSURVEY", { ...newSurvey })

			} else if ( 'options' in data ) {

				newSurvey.questions.map( quest => {
					if (quest.qId === data.qId)  {				  
						quest.options = data.options
						quest.value_default = data.value_default
					}					
				})
				
				context.commit("SETNEWSURVEY", { ...newSurvey })

			} else if ( 'multi_values' in data ) {
				
				newSurvey.questions.map( quest => {
					if (quest.qId === data.qId)  {				  
						quest.multi_values = data.multi_values
						quest.max_choosed = data.max_choosed
					}					
				})
				
				context.commit("SETNEWSURVEY", { ...newSurvey })

			} else if ( 'levels' in data ) {
				
				newSurvey.questions.map( quest => {
					if (quest.qId === data.qId)  {				  
						quest.levels = data.levels
					}					
				})
				
				context.commit("SETNEWSURVEY", { ...newSurvey })
			}

		}
	},

	getters: {
		surveys(state) {
			return state.surveys
		},
		questionTypes(state) {
			return state.questionTypes
		},
		newSurvey( state ) {
			return state.newSurvey
		}
	}
}