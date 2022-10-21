import AppStorage from "./AppStorage";
import Token from "./Token";

class User {

	refreshApiUrl = store.getters['links/refreshApiGwUrl']

	responseAfterLogin(res)	{
		const access_token = res

		if ( Token.isValid(access_token) ) {
			AppStorage.store(access_token) 
		}		
	}

	hasToken() {
		const storeToken = this.getToken();
		if (storeToken) {
			return Token.isValid(storeToken) ? true : false
		}
		false
	}

	loggedIn() {
		return this.hasToken();		 
	}

	
	clearStorage() {
		AppStorage.clear();
	}
	
	getToken() {
		return AppStorage.getToken();
	}

	storeToken(token) {
		AppStorage.store(token)
	}

	async refreshWithRequest(token, fn) {
		console.log(token, fn)
		/* await axios.post(this.refreshApiUrl, null, {
			headers: {
				Authorization: 'Bearer ' + token
		}})
		.then( (response) => {
			console.log(response.data)
			if ( response.data.authorisation ) {
				let newToken = response.data.authorisation.token
				AppStorage.store(newToken)
				
				
			}			
		}) */
	}
}

export default User = new User();