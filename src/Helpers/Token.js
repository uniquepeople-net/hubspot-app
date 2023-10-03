class Token {

	isValid(token, loginUrl) {
		const payload = this.payload(token)

		if (payload) {
			// Check if the token's issuer matches the login URL
			if (payload.iss !== loginUrl) {
			  return false; // Invalid issuer
			}
	  
			// Check if the token is not expired
			const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
			if (payload.exp && payload.exp < currentTime) {
			  return false; // Token has expired
			}
	  
			return true; // Token is valid
		}
		
		return false
	}

	payload(token) {
		const payload = token.split('.')[1]
		return this.decode(payload)
	}

	decode(payload) {		
		return JSON.parse(window.atob(payload, 'base64'))
	}
}

export default Token = new Token();