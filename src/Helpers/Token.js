class Token {

	isValid(token) {
		const payload = this.payload(token)
		if (payload) {
			return payload.iss = 'http://auth_nginx/api/login' || 'http://auth_nginx/api/register' ? true : false;
		}
		return false
	}

	payload(token) {
		const payload = token.split('.')[1]
		return this.decode(payload)
	}

	decode(payload) {		
		return JSON.parse(Buffer.from(payload, 'base64'))
		//return JSON.parse(window.atob(payload, 'base64'))
	}
}

export default Token = new Token();