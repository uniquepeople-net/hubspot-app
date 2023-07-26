import { router } from '../main'
import CryptoJS from 'crypto-js'
import User from './User'

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

	encryptAes(string, secretKey = 'ufp') {
		const encrypted = CryptoJS.AES.encrypt(string, secretKey);
		const encoded = encodeURIComponent(encrypted);
		return encoded
	}

	decryptAes( phrase, secretKey = 'ufp' ) {
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
					timer: 5000,
					title: 'Expired token, Log In again'
				})
				router.push('/login')
			} else {
				Toast.fire({
					icon: 'error',
					timer: 5000,
					title: 'Server error'
				})
				router.push('/login')
			}
		})		
	}

	/**
	 *  Check user is logged in
	 */
	checkLoggedUser(to, from, next) {	
		if ( User.loggedIn() ) {
			next()
		} else {
			next('en/intro')
		}
	}

	/**
	 * Check trial version
	 */
	isTrial(date, fee) {
		let currentDate = Date.now();
		let trialDate = new Date(date);
		let diffInMilliseconds = currentDate - trialDate;
		let diffInMinutes = Math.floor(diffInMilliseconds / 60000);

		// Set time to trial in minutes ( 10080 minutes = 1 week )
		const trialTime = 10080;

		if ( fee ) return true

		if ( !date || trialTime > diffInMinutes ) {
			return true
		} else {
			return false
		}
	}

	// Filter params by key 
	filterParams( params, key, value ) {
		let result = params.filter( param => param[key] === value )
		if (result) {
			return result[0].value
		} else return 0
	}


	// format date
	formatDateToSk(date, time = false) {
		let timeData = time ? { hour: 'numeric', minute: 'numeric' } : null
		let	options = { day: '2-digit',month: '2-digit',year: 'numeric', ...timeData }
		
		let newDate = new Date(date)
		return newDate.toLocaleDateString('sk-SK', options)
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
	stringToSlug(string) {
		const diacriticMap = {
			'á': 'a', 'ä': 'a', 'č': 'c', 'ď': 'd', 'é': 'e', 'í': 'i',
			'ĺ': 'l', 'ľ': 'l', 'ň': 'n', 'ó': 'o', 'ô': 'o', 'ŕ': 'r',
			'š': 's', 'ť': 't', 'ú': 'u', 'ý': 'y', 'ž': 'z',
			'Á': 'A', 'Ä': 'A', 'Č': 'C', 'Ď': 'D', 'É': 'E', 'Í': 'I',
			'Ĺ': 'L', 'Ľ': 'L', 'Ň': 'N', 'Ó': 'O', 'Ô': 'O', 'Ŕ': 'R',
			'Š': 'S', 'Ť': 'T', 'Ú': 'U', 'Ý': 'Y', 'Ž': 'Z',
			'â': 'a', 'ê': 'e', 'î': 'i', 'ô': 'o', 'û': 'u', 'ŷ': 'y',
			'Â': 'A', 'Ê': 'E', 'Î': 'I', 'Ô': 'O', 'Û': 'U', 'Ŷ': 'Y',
			'Ǎ': 'A', 'ǎ': 'a', 'Ě': 'E', 'ě': 'e', 'Ǐ': 'I', 'ǐ': 'i',
			'Ǒ': 'O', 'ǒ': 'o', 'Ǔ': 'U', 'ǔ': 'u',
		};
		return string
		  .replace(/[^\u0000-\u007E]/g, c => diacriticMap[c] || '') // remove diacritics
		  .toLowerCase()
		  .replace(/[^\w\s-]/g, '') // remove non-word chars
		  .replace(/[\s_-]+/g, '-') // replace spaces and underscores with a hyphen
		  .replace(/^-+|-+$/g, ''); // remove leading/trailing hyphens
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
	  
	// Helper function to check object with substitutions players Id's and add 
	// lineup player his bench substitution and vice versa
	substitionsHelper(team) {
		team.formation.substitutions.map( s => {
			let findedOut = team.formation.lineup.find( f => f.playerId === s.playerOut )
			let findedIn = team.formation.bench.find( f => f.playerId === s.playerIn )
			if ( findedIn ) {
				team.formation.lineup.find( f => {
					if (f.playerId === s.playerOut) {
						return f.inside = { shortName: findedIn.player.shortName, minute: s.minute }
					}
				})
			}
			if ( findedOut ) {
				team.formation.bench.find( f => {
					if (f.playerId === s.playerIn) {
						return f.outside = { shortName: findedOut.player.shortName, minute: s.minute }
					}
				})
			}
		})
	}

	// Append array of objects to FormData
	appendArrToFormData(arrayOfObj, formData, title) {
		arrayOfObj.forEach((obj, index) => {
			Object.keys(obj).forEach(key => {
				formData.append(`${title}[${index}][${key}]`, obj[key]);
			});
		});
	}
	
	// Format "posted before time" 
	timeBeforePosted(time) {				
		let currentTime = new Date( Date.now() )
		let date = new Date(time * 1000)
		
		let diffTime = (currentTime - date) / 1000 / 3600
		let returnTime

		if ( diffTime < 1 ) {
			returnTime = Math.round( diffTime * 60 ) + ' minutes'
		} else {
			returnTime = Math.round(diffTime) + ' hours'
		}

		return returnTime
	}
	  
}

export default Helpers = new Helpers();