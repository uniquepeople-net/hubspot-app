import AppStorage from "./AppStorage";
import Token from "./Token";
import { router } from '../main'

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

		console.log(storeToken)
		

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

	/**
	 *  Refresh token fn 
	 * 	Added before every other request to refresh token and lenghten token expire time
	 */
	async refreshedToken() {	
		await axios.post(this.refreshApiUrl, null, {
			headers: {
				Authorization: 'Bearer ' + this.getToken()
		}})
		.then( (response) => {
			if ( response.data.message === 'Unauthenticated.' ) {
				router.push('/login')
			}
			if ( response.data.authorisation ) {
				let newToken = response.data.authorisation.token
				AppStorage.store(newToken)
			}			
		})
	}
}

export default User = new User();