import store from '../VuexStore/store';
window.store = store;

class Token {

	authLoginUrl = store.getters['links/loginAuthServiceUrl']
	authRegisterUrl = store.getters['links/registerAuthServiceUrl']

	isValid(token) {
		const payload = this.payload(token)
		if (payload) {
			return payload.iss = this.authLoginUrl || this.authRegisterUrl ? true : false;
		}
		return false
	}

	payload(token) {
		const payload = token.split('.')[1]
		return this.decode(payload)
	}

	decode(payload) {		
		//return JSON.parse(Buffer.from(payload, 'base64'))
		return JSON.parse(window.atob(payload, 'base64'))
	}
}

export default Token = new Token();