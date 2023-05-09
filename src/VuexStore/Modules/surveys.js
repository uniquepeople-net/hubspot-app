import axios from "axios";

export default {
	namespaced: true,

	state: () => ({
		surveys: null,
		questionTypes: null,
		positions: null,
		types: null,
		newSurvey: {},
		specificSurvey: null,
		specificSurveyBySlug: null,
		fulfilledSurvey: [],
		specificResults: null
	}),

	mutations: {
		SETSURVEYS( state, data ) {
			state.surveys = data;
		},
		SETQUESTTYPES( state, data ) {
			state.questionTypes = data
		},
		SETPOSITIONS( state, data ) {
			state.positions = data
		},
		SETTYPES( state, data ) {
			state.types = data
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
		RESETSPECIFICSURVEY( state ) {
			state.specificSurvey = null
		},
		SETSPECIFICSURVEYBYSLUG( state, data ) {
			state.specificSurveyBySlug = data
		},
		SETFULFILLEDSURVEY( state, data ) {
			state.fulfilledSurvey = data
		},
		SETSPECIFICRESULTS( state, data ) {
			state.specificResults = data
		},
		RESETSPECIFICRESULTS( state, data ) {
			state.specificResults = null
		},
		DELETEFROMSPECIFIC( state, data ) {
			state.specificSurvey = data
		},
		RESETSTATE ( state ) {
			// Merge rather than replace so we don't lose observers
			// https://github.com/vuejs/vuex/issues/1118
			Object.assign(state, { 
				surveys: null,
				questionTypes: null,
				positions: null,
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
		async getPositions( context ) {
			let positionsLink = context.rootGetters['links/positions']

			//await User.refreshedToken();

			await axios.get( positionsLink, {
					headers: {
						Authorization: 'Bearer ' + User.getToken()
				}}).then( response =>  {
					context.commit("SETPOSITIONS", response.data)	
				})
				.catch( error => {
					Toast.fire({
						icon: 'error',
						title: 'Unable to load positions'
					})
				})
		},
		async getTypes( context ) {
			let typesLink = context.rootGetters['links/types']

			await User.refreshedToken();

			await axios.get( typesLink, {
					headers: {
						Authorization: 'Bearer ' + User.getToken()
				}}).then( response =>  {
					context.commit("SETTYPES", response.data)	
				})
				.catch( error => {
					Toast.fire({
						icon: 'error',
						title: 'Unable to load survey types'
					})
				})
		},
		setNewSurvey( context, data ) {
			let newSurvey = context.rootGetters['surveys/newSurvey']		

			if ( 'questions' in data ) {
				context.commit("SETNEWSURVEY", {...newSurvey, ...data })

			} else if ( 'title' in data ) {
				newSurvey.questions.map( quest => {
					if (quest.index === data.index)  {						  
						quest.title = data.title
						quest.type = data.type
					}					
				})				

				context.commit("SETNEWSURVEY", { ...newSurvey })

			} else if ( 'open_value' in data ) {
				newSurvey.questions.map( quest => {
					if (quest.index === data.index)  {	 
						quest.open_value = data.open_value
					}					
				})
				
				context.commit("SETNEWSURVEY", { ...newSurvey })

			} else if ( 'options' in data ) {

				newSurvey.questions.map( quest => {
					if (quest.index === data.index)  {				  
						quest.options = data.options
						quest.value_default = data.value_default
					}					
				})
				
				context.commit("SETNEWSURVEY", { ...newSurvey })

			} else if ( 'multi_values' in data ) {
				
				newSurvey.questions.map( quest => {
					if (quest.index === data.index)  {				  
						quest.multi_values = data.multi_values
						quest.max_choosed = data.max_choosed
					}					
				})
				
				context.commit("SETNEWSURVEY", { ...newSurvey })

			} else if ( 'levels' in data ) {
				
				newSurvey.questions.map( quest => {
					if (quest.index === data.index)  {				  
						quest.levels = data.levels
					}					
				})
				
				context.commit("SETNEWSURVEY", { ...newSurvey })

			} else if ( 'max_choosed' in data ) {

				newSurvey.questions.map( quest => {
					if (quest.index === data.index)  {				  
						quest.max_choosed = data.max_choosed
						if ( 'value_default' in data ) {
							quest.value_default = data.value_default
						}
					}					
				})
				
				context.commit("SETNEWSURVEY", { ...newSurvey })
			}
		},
		resetNewSurvey( context, data ) {
			let newSurvey = context.rootGetters['surveys/newSurvey']
			// clear question object to default values
			if ( data && 'qId' in data ) {
				/* newSurvey.questions.map( (q, index) => {
					if ( Number(q.qId) === Number(data.qId) ) {
						/* const keepKeys = ['index', 'qId', 'title', 'type']
						const result = Object.keys(q)
							.filter(key => keepKeys.includes(key)) // only keep keys that are in the keepKeys array
							.reduce((obj, key) => {
								obj[key] = q[key];
								return obj;
						}, {});
						return result 
						return { ...q, title: 'jkjkjjj' }
					}
					return q
				})

				//newSurvey.questions = newS

				console.log(newSurvey) */
				
				context.commit("SETNEWSURVEY", {...newSurvey })
			} else {
				context.commit("RESETNEWSURVEY", {} )
			}
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
		setHashes( context, data ) {
			let newSurvey = context.rootGetters['surveys/newSurvey']

			context.commit("SETNEWSURVEY", {...newSurvey, ...data })
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
		},
		resetSpecificSurvey( context ) {
			context.commit("RESETSPECIFICSURVEY")
		},
		async getResults( context, id ) {
			let resultsUrl = context.rootGetters['links/results']

			await User.refreshedToken();

			await axios.get( resultsUrl + id, {
				headers: {
					Authorization: 'Bearer ' + User.getToken()
				}})
				.then( response => {

					// logic for count points for players based on place assigned
					if ( response.data.some( r => r.type_id === 6 && r.closed_answs_default === '1' ) ) {
						let resultBestOne = response.data.filter( r => r.type_id === 6 && r.closed_answs_default === '1')

						let contents = resultBestOne[0].answers.map( r => {
							return r.content
						})

						//set points based on position of item in array 
						const points = { 0: 5, 1: 3, 2: 1 };
						const ranks = { 0: 'a', 1: 'b', 2: 'c' };

						const result = {};
						const countRank = {}

						contents.forEach(array => {
							array.forEach((name, index) => {
								if (!result[name]) {
									result[name] = 0;
								}
								if (!countRank[name]) {
									countRank[name] = ''
								}
								result[name] += points[index];
								countRank[name] += ranks[index]
							});
						});

						// check how many times was added points 5,3,1
						const resultRank = {};
						
						for (const key in countRank) {
							const value = countRank[key];
							let first = 0;
							let second = 0;
							let third = 0;
						
							for (let i = 0; i < value.length; i++) {
								const letter = value[i];
								if (letter === "a") {
									first++;
								} else if (letter === "b") {
									second++;
								} else if (letter === "c") {
									third++;
								}
							}
							
							resultRank[key] = { first, second, third }
						}

						const sortedObj = Object.entries(resultRank)
							.map(([name, {first, second, third}]) => ({ name, first, second, third }))
							.sort((a, b) => {
								if (b.first !== a.first) return b.first - a.first;
								if (b.second !== a.second) return b.second - a.second;
								return b.third - a.third;
							})
							.reduce((result, {name, first, second, third}) => {
								result[name] = {first, second, third};
								return result;
							}, {});

						response.data.map( r => {
							if ( r.type_id === 6 && r.closed_answs_default === '1' ) {
								r.count = result
								r.countRank = sortedObj
								return r.count, r.countRank
							}
						})
					}

					context.commit("SETSPECIFICRESULTS", response.data)
				})
				.catch( error => {
					Toast.fire({
						icon: 'error',
						title: 'Unable to load results'
					})
				})
		},
		resetSpecificResults(context) {
			context.commit("RESETSPECIFICRESULTS")
		},
		deleteFromSpecific(context, id) {
			let specificSurvey = context.rootGetters['surveys/specificSurvey']
			if (specificSurvey) {
				specificSurvey.questions = specificSurvey.questions.filter( q => q.id !== Number(id) )		
				context.commit("DELETEFROMSPECIFIC", specificSurvey)
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
		specificResults( state ) {
			return state.specificResults
		},
		positions( state ) {
			return state.positions
		},
		types( state ) {
			return state.types
		},
	}
}