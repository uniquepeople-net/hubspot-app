import AppStorage from "./AppStorage";
import Token from "./Token";

class User {

	responseAfterLogin(res, loginUrl)	{
		const access_token = res

		if ( Token.isValid(access_token, loginUrl) ) {
			AppStorage.store(access_token) 
			return true	
		}		
	}

	hasToken(loginUrl) {
		const storeToken = this.getToken();

		if (storeToken) {
			return Token.isValid(storeToken, loginUrl) ? true : false
		}
		false
	}

	loggedIn(loginUrl) {
		return this.hasToken(loginUrl);		 
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

}

export default User = new User();