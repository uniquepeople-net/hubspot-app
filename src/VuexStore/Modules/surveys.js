import axios from "axios";

export default {
	namespaced: true,

	state: () => ({
		surveys: null,
		questionTypes: null,
		newSurvey: {},
		specificSurvey: null,
		specificSurveyBySlug: null,
		fulfilledSurvey: []
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
		RESETNEWSURVEY( state, data ) {
			state.newSurvey = data
		},
		SETSPECIFICSURVEY( state, data ) {
			state.specificSurvey = data
		},
		SETSPECIFICSURVEYBYSLUG( state, data ) {
			state.specificSurveyBySlug = data
		},
		SETFULFILLEDSURVEY( state, data ) {
			state.fulfilledSurvey = data
		},
		RESETSTATE ( state ) {
			// Merge rather than replace so we don't lose observers
			// https://github.com/vuejs/vuex/issues/1118
			Object.assign(state, { 
				surveys: null,
				questionTypes: null,
				newSurvey: {},
				specificSurvey: null,
				specificSurveyBySlug: null,
				fulfilledSurvey: []
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

		},
		resetNewSurvey( context ) {
			context.commit("RESETNEWSURVEY", {} )
		},
		setFulfilledSurvey( context, data ) {
			let fulfilled = context.rootGetters['surveys/fulfilledSurvey']
			
			if ( !fulfilled.length ) 
				return context.commit("SETFULFILLEDSURVEY", [ data ] )
			
			if ( !fulfilled.some( answer => answer.question.id === data.question.id )) 
				return context.commit("SETFULFILLEDSURVEY", [ ...fulfilled, data ])
			
			fulfilled.map( (item, index) => {
				if (item.question.id === data.question.id)  {
					fulfilled[index] = data
					context.commit("SETFULFILLEDSURVEY",  [ ...fulfilled ] )
				}
			})
		},
		async specificSurvey( context, id ) {
			let specificSurveyUrl = context.rootGetters['links/specificSurvey']

			await User.refreshedToken();
			
			await axios.get( specificSurveyUrl + id, {
						headers: {
							Authorization: 'Bearer ' + User.getToken()
					}})
					.then( response =>  {
						context.commit("SETSPECIFICSURVEY", response.data)	
					})
					.catch( error => {
						Toast.fire({
							icon: 'error',
							title: 'Unable to load survey'
						})
					})
		},
		async specificSurveyBySlug( context, slug ) {
			let specificSurveyUrl = context.rootGetters['links/showSurvey']

			//await User.refreshedToken();
			
			await axios.get( specificSurveyUrl + slug, {
						headers: {
							Authorization: 'Bearer ' + User.getToken()
					}})
					.then( response =>  {
						context.commit("SETSPECIFICSURVEYBYSLUG", response.data[0])	
					})
					.catch( error => {
						Toast.fire({
							icon: 'error',
							title: 'Unable to load survey'
						})
					})
		},
		async sendSurvey( context, id ) {
			let saveSurveyUrl = context.rootGetters['links/saveSurvey']

			await User.refreshedToken();
			
			await axios.get( saveSurveyUrl + id, {
						headers: {
							Authorization: 'Bearer ' + User.getToken()
					}})
					.then( response =>  {
						context.commit("SETSPECIFICSURVEY", response.data)	
					})
					.catch( error => {
						Toast.fire({
							icon: 'error',
							title: 'Unable to load survey'
						})
					})
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
		},
		specificSurvey( state ) {
			return state.specificSurvey
		},
		specificSurveyBySlug( state ) {
			return state.specificSurveyBySlug
		},
		fulfilledSurvey( state ) {
			return state.fulfilledSurvey
		},
	}
}