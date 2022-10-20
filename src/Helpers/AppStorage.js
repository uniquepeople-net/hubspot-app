import Helpers from './Helpers';

class AppStorage {

	storeToken(data) { 
		let encToken = Helpers.encryptAes(data, 'skey')
		localStorage.setItem('token', encToken)
	}

	store(token) {
		this.storeToken(token)
	}

	clear() {
		localStorage.removeItem('token')
	}

	getToken() {
		let localStorageToken = localStorage.getItem('token');
		let decToken = Helpers.decryptAes( localStorageToken, 'skey' );
		return decToken;
	}

}

export default AppStorage = new AppStorage();