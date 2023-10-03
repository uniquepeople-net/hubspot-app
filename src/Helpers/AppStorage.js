import Helpers from './Helpers';

class AppStorage {

	storeToken(data) { 
		// Calculate the expiration time for 1 minute from the current time
		const oneMinuteFromNow = new Date(new Date().getTime() + 60000);
		Cookies.set('token', data);
	}

	store(token) {
		this.storeToken(token)
	}

	clear() {
		Cookies.remove('token');
	}

	getToken() {
		const token = Cookies.get('token');
		return token
	}

}

export default AppStorage = new AppStorage();