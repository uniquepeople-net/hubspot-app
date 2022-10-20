class Helpers {

	// add script file function in vue component
	addScript(srcUrl) {
		const dataTableScript = document.createElement("script");
		dataTableScript.setAttribute("src",srcUrl);
		dataTableScript.setAttribute("defer", '');
		document.body.appendChild(dataTableScript);
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

}

export default Helpers = new Helpers();