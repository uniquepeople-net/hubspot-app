class Helpers {

	// add script file function in vue component
	addScript(srcUrl) {
		const script = document.createElement("script");
		script.setAttribute("src",srcUrl);
		script.setAttribute("defer", '');
		document.body.appendChild(script);
	}
	
	// check if user is admin ( admin = 1, editor = 2, user = 3 )
	/* checkAdmin(to, from, next) {
		axios.get('api/user-data', this.headers)
			.then( response => {
				if (response.data.role_id === 1) {
					next()
				} else next({ name: 'home' })			 
			})			
	} */

	encryptAes(string, secretKey) {
		let phrase = CryptoJs.AES.encrypt(string, secretKey).toString()
		return phrase;
	}

	decryptAes( phrase, secretKey ) {
		let originString = CryptoJs.AES.decrypt(phrase, secretKey).toString(CryptoJs.enc.Utf8)
		return originString
	}

	// check if user is admin ( admin = 1, editor = 2, user = 3 )
	checkAdmin(to, from, next, url, token) {
		axios.get(url, {
			headers: {
				Authorization: 'Bearer ' + token
			}
		}).then( response => {
				if (response.data.user.role_id === 1) {
					next()
				} else next({ name: 'dashboard' })			 
		})			
	}

}

export default Helpers = new Helpers();