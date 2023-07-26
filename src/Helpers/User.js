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
			/* if ( response.data.message === 'Unauthenticated.' ) {
				this.clearStorage()
				console.log(this.getToken)
				
				router.push('/login')
			} */
			if ( response.data.authorisation ) {
				let newToken = response.data.authorisation.token
				AppStorage.store(newToken)
			}			
		}).catch( error =>  {
			if ( error.response.status >= 400 && error.response.status < 500 ) {
				Toast.fire({
					icon: 'error',
					timer: 5000,
					title: 'Expired token, Log In again'
				})
				this.clearStorage()
				router.push('/login')
			} else {
				Toast.fire({
					icon: 'error',
					timer: 5000,
					title: 'Server error'
				})
				this.clearStorage()
				router.push('/login')
			}
		})
	}
}

export default User = new User();