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
		console.log(date)
		
		let newDate = new Date(date)
		return newDate.toLocaleDateString('sk-SK', {
			day: '2-digit',month: '2-digit',year: 'numeric'})
	}

	// generate password
	generatePasswd(len) {
		const string = "abcdefghijklmnopqrstuvwxyz";
		const numeric = "0123456789";
		const punctuation = "!@#$%^&*()_+~`|}{[]:;?><,./-=";
		const length = len

		let character = "";
		let password = "";
		while (password.length < length) {
			const entity1 = Math.ceil(
			string.length * Math.random() * Math.random()
			);
			const entity2 = Math.ceil(
			numeric.length * Math.random() * Math.random()
			);
			const entity3 = Math.ceil(
			punctuation.length * Math.random() * Math.random()
			);
			let hold = string.charAt(entity1);
			hold = password.length % 2 === 0 ? hold.toUpperCase() : hold;
			character += hold;
			character += numeric.charAt(entity2);
			character += punctuation.charAt(entity3);
			password = character;
		}
		password = password
			.split("")
			.sort(() => {
			return 0.5 - Math.random();
			})
			.join("");
		return password.substr(0, length);
	}
}

export default Helpers = new Helpers();