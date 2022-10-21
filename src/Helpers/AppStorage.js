import Helpers from './Helpers';

class AppStorage {

	storeToken(data) { 
		/*let encToken = Helpers.encryptAes(data, 'skey')
		localStorage.setItem('token', encToken)*/
		localStorage.setItem('token', data)
	}

	store(token) {
		this.storeToken(token)
	}

	clear() {
		localStorage.removeItem('token')
	}

	getToken() {
		let localStorageToken = localStorage.getItem('token');
		/* let decToken = Helpers.decryptAes( localStorageToken, 'skey' );
		return decToken; */
		return localStorageToken
	}

}

export default AppStorage = new AppStorage();