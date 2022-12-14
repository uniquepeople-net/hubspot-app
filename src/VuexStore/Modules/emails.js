export default {
	namespaced: true,

	state: () => ({
		response: null,
		emails: null,
		specificEmail: null,
		unreadEmails: null,
		unreadEmailsCount: null,
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
		RESETSTATE ( state ) {
			// Merge rather than replace so we don't lose observers
			// https://github.com/vuejs/vuex/issues/1118
			Object.assign(state, {
				response: null,
				emails: null,
				specificEmail: null,
				unreadEmails: null,
				unreadEmailsCount: null,
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

			await User.refreshedToken();

			await axios.get( getSpecificEmail + data.recipientId + '/' + data.emailId, {
						headers: {
							Authorization: 'Bearer ' + User.getToken()
						}
					})
					.then( response => {return true})
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
		}
	}
}