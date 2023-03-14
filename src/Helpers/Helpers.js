import { router } from '../main'
import CryptoJS from 'crypto-js'

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
		const encrypted = CryptoJS.AES.encrypt(string, secretKey);
		const encoded = encodeURIComponent(encrypted);
		return encoded
	}

	decryptAes( phrase, secretKey ) {
		const decoded = decodeURIComponent(phrase);
		const decrypted = CryptoJS.AES.decrypt(decoded, secretKey);
		const plainText = decrypted.toString(CryptoJS.enc.Utf8);
		return plainText
	}

	/**
	 *	Check if user is admin ( admin = 1, editor = 2, user = 3 ) 
	 *	
	 */
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
		}).catch( error => {
			if ( error.response.status >= 400 && error.response.status < 500 ) {
				Toast.fire({
					icon: 'error',
					timer: 7000,
					title: 'Expired token, Log In again'
				})
				router.push('/login')
			} else {
				Toast.fire({
					icon: 'error',
					timer: 7000,
					title: 'Server error'
				})
				router.push('/login')
			}
		})		
	}

	// Filter params by key 
	filterParams( params, key, value ) {
		let result = params.filter( param => param[key] === value )
		if (result) {
			return result[0].value
		} else return 0
	}


	// format date
	formatDateToSk(date) {
		let newDate = new Date(date)
		return newDate.toLocaleDateString('sk-SK', {
			day: '2-digit',month: '2-digit',year: 'numeric'})
	}

	// Get difference days between two dates
	getDiffDays(startDate, finishDate) {
		let startDateObj = new Date(startDate)
		let finishDateObj = new Date(finishDate)
		const convertConst = 1000*60*60*24

		return Math.round((finishDateObj - startDateObj) / convertConst)
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

	// Check valid url
	isValidHttpUrl(str) {
		const pattern = new RegExp(
		  '^(https?:\\/\\/)?' + // protocol
			'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
			'((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
			'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
			'(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
			'(\\#[-a-z\\d_]*)?$', // fragment locator
		  'i'
		);
		return pattern.test(str);
	  }

	// Format price from cents to eur with two decimals
	formatPrice(price) {
		let formatter = new Intl.NumberFormat('sk-SK', {
			style: 'currency',
			currency: 'EUR',
		});
		return formatter.format(price/100)
	} 

	// Format string to slug
	stringToSlug(str) {
  		return str.toLowerCase()
				  .trim()
				  .replace(/[^\w\s-]/g, '')
				  .replace(/[\s_-]+/g, '-')
				  .replace(/^-+|-+$/g, '');
	}

	// Check existence of keys in nested object
	hasNestedKey(obj, key) {
		if (!obj || !key) {
		  return false;
		}
	  
		const keys = key.split('.');
		let currentObj = obj;
	  
		for (let i = 0; i < keys.length; i++) {
		  const currentKey = keys[i];
	  
		  if (!currentObj.hasOwnProperty(currentKey)) {
			return false;
		  }
	  
		  currentObj = currentObj[currentKey];
		}
	  
		return true;
	  }

	// Copy to clipboard 
	copyToClipboard(text) {
		navigator.clipboard.writeText(text)
		  .then(() => {
			// Success message	
			return 'Text copied to clipboard';
		  })
		  .catch((error) => {
			// Error message
			return "Error copying text to clipboard:" + error;
		  });
	  }
	  
	  
	// Trim string to return start of string, three dots, end of string
	// example: "Lorem ipsum ... dolor sit amet"
	trimString(str, maxLength, maxCompleteLength) {
		if (str.length > maxLength) {
			const trimmedString = str.substring(0, maxLength - 3);
			const endString = str.substring(str.length - (maxLength - 3));
			const resultString = trimmedString + '...' + endString;
			if (resultString.length > maxCompleteLength) {
			  const diff = maxCompleteLength - 3;
			  const trimmedEndString = endString.substring(0, diff);
			  return trimmedString + '...' + trimmedEndString;
			}
			return resultString;
		  }
		  return str;
	}
	  
	  
}

export default Helpers = new Helpers();