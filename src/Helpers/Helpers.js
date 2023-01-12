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
			
			// check if exists role_id in response object
			var checkRole = (((response || {}).data || {}).user || {}).role_id;
			
			if ( checkRole && checkRole === 1 ) {
				next()
			} else next({ name: 'dashboard' }) 		 
		})			
	}

	// Filter params by key 
	filterParams( params, key, value ) {
		let result = params.filter( param => param[key] === value )
		if (result) {
			return result[0].value
		} else return 0
	}

	// Request url through axios
	/* requestAuthPost( url, data, token ) {
		axios.post( url, data, {
			headers: {
				Authorization: 'Bearer ' + token
			}
		})
	}  */

	// format date
	formatDateToSk(date) {
		let newDate = new Date(date)
		return newDate.toLocaleDateString('sk-SK')
	}

}

export default Helpers = new Helpers();