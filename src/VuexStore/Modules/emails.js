export default {
	namespaced: true,

	state: () => ({
		response: null,
		emails: null,
		specificEmail: null,
		unreadEmails: null,
		unreadEmailsCount: null,
		dynamicData: null,
		templates: null
	}),

	mutations: {
		SETRESPONSE( state, data ) {
			state.response = data;
		},
		SETEMAILS( state, data ) {
			state.emails = data;
		},
		SETSPECIFICEMAIL( state, data ) {
			state.specificEmail = data;
		},
		SETUNREADEMAILS( state, data ) {
			state.unreadEmails = data;
		},
		SETUNREADEMAILSCOUNT( state, data ) {
			state.unreadEmailsCount = data;
		},
		SETDYNAMICDATA( state, data ) {
			state.dynamicData = data;
		},
		SETTEMPLATES( state, data ) {
			state.templates = data;
		},
		RESETSTATE ( state ) {
			// Merge rather than replace so we don't lose observers
			// https://github.com/vuejs/vuex/issues/1118
			Object.assign(state, {
				response: null,
				emails: null,
				specificEmail: null,
				unreadEmails: null,
				unreadEmailsCount: null,
				dynamicData: null,
				templates: null
			})
		}
	},

	actions: {
		async sendEmail(context, data) {
			let sendEmailUrl = context.rootGetters['links/sendContactFormEmail']

			await User.refreshedToken();

			context.commit("SETRESPONSE", null)

			await axios.post( sendEmailUrl , data, {
						headers: {
							Authorization: 'Bearer ' + User.getToken()
						}
					}).then( response => {
						context.commit("SETRESPONSE", response.data)
					}).catch( error => {
						Toast.fire({
							icon: 'error',
							title: 'Unable to send email(s)'
						})
					})
		},
		async getEmails(context, id) {
			let getEmailsUrl = context.rootGetters['links/getEmailsUrl'];

			await User.refreshedToken();

			await axios.get( getEmailsUrl + id, {
						headers: {
							Authorization: 'Bearer ' + User.getToken()
						}
					})
					.then( response => {
						context.commit("SETEMAILS", response.data)
						if ( response.data ) {
							let unread = response.data.filter( item => Boolean(item.recipients[0].is_opened) !== true )
							context.commit("SETUNREADEMAILS", unread);
							context.commit("SETUNREADEMAILSCOUNT", unread.length);
						}						
					}).catch( error => {
						Toast.fire({
							icon: 'error',
							title: 'Unable to load email(s)'
						})						
					})
		},
		setSpecificEmail(context, id) {
			let allEmails = context.rootGetters['emails/emails']

			let specificEmail = allEmails.filter( item => item.id === id )
			
			specificEmail[0].recipients[0].is_opened = true

			let unread = allEmails.filter( item => Boolean(item.recipients[0].is_opened) !== true )
			context.commit("SETUNREADEMAILS", unread);
			context.commit("SETUNREADEMAILSCOUNT", unread.length);

			context.commit("SETSPECIFICEMAIL", specificEmail)
		},
		async getSpecificEmail(context, data) {
			let getSpecificEmail = context.rootGetters['links/getSpecificEmail'];
			let user = context.rootGetters['user/user']

			await User.refreshedToken();

			await axios.post( getSpecificEmail + data.recipientId + '/' + data.emailId, user , {
						headers: {
							Authorization: 'Bearer ' + User.getToken()
						}
					})
					.then( response => {
						context.commit("SETSPECIFICEMAIL", response.data)
					})
					.catch( error =>  {
						Toast.fire({
							icon: 'error',
							title: 'Unable to get email'
						})
					})
		},
		async getDynamicData(context) {
			let dynamicDataLink = context.rootGetters['links/dynamicData'];

			await User.refreshedToken();

			await axios.get( dynamicDataLink,  {
						headers: {
							Authorization: 'Bearer ' + User.getToken()
						}
					})
					.then( response => {
						context.commit("SETDYNAMICDATA", response.data)
					})
					.catch( error =>  {
						Toast.fire({
							icon: 'error',
							title: 'Unable to get dynamic data for creating email'
						})
					})
		}, 
		async getTemplates(context) {
			let templatesLink = context.rootGetters['links/templates'];

			await User.refreshedToken();

			await axios.get( templatesLink,  {
						headers: {
							Authorization: 'Bearer ' + User.getToken()
						}
					})
					.then( response => {
						context.commit("SETTEMPLATES", response.data)
					})
					.catch( error =>  {
						Toast.fire({
							icon: 'error',
							title: 'Unable to get email templates'
						})
					})
		} 
	},

	getters: {
		response(state) {
			return state.response
		},
		emails(state) {
			return state.emails
		},
		specificEmail(state) {
			return state.specificEmail
		},
		unreadEmails(state) {
			return state.unreadEmails
		},
		unreadEmailsCount(state) {
			return state.unreadEmailsCount
		},
		dynamicData(state) {
			return state.dynamicData
		},
		templates(state) {
			return state.templates
		}
	}
}