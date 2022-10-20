import Token from "./Token";
import AppStorage from "./AppStorage";

class User {

	responseAfterLogin(res)	{
		const access_token = res.data.access_token

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
		if ( AppStorage.getRemember() === true && this.hasToken() ) {	
			return true			
		} else if ( AppStorage.getRemember() === false && this.hasToken() && this.checkNextDay() === false) {
			return true			
		} else return false				 
	}

	name() {
		if (this.loggedIn()) {
			return localStorage.getItem('user')
		}
	}

	checkNextDay() {
		let currentTime = Date.now();
		
		function msToMidnight() {
			var now = new Date();
			var then = new Date(now);
			then.setHours(24, 0, 0, 0);		
			return Math.floor(((then - now) / 6e4) * 60 * 1000);			
		}

		if ( currentTime - AppStorage.getTime() <= msToMidnight() ) {
			return false
		} else return true
	}

	clearStorage() {
		AppStorage.clear();
	}

	getToken() {
		if (this.loggedIn()) {
			return AppStorage.getToken();
		}
	}

	getIsAdmin() {
		return AppStorage.getIsAdmin()
	}

	getRole() {
		return AppStorage.getRole()
	}

	getInstatId() {
		return AppStorage.getInstatId()
	}
}

export default User = new User();