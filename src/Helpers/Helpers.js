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
	 * Check trial version resp. check fee is paid and fee_finish_date is more than current date
	 */
	isTrial(date, fee, fee_finish_date) {
		let currentDate = Date.now();
		let currentDateTime = new Date()
		const daysInMilliseconds = 3 * (24 * 60 * 60 * 1000);							// 3 x one day in miliseconds
		let debtDateTime = new Date(currentDateTime.getTime() - daysInMilliseconds)
		let feeFinishDateTime = new Date(fee_finish_date)
		let trialDate = new Date(date);
		let diffInMilliseconds = currentDate - trialDate;
		let diffInMinutes = Math.floor(diffInMilliseconds / 60000);

		// Set time to trial in minutes ( 10080 minutes = 1 week )
		const trialTime = 10080;

		//console.log(feeFinishDateTime, debtDateTime, feeFinishDateTime > debtDateTime)
	
		if ( fee && feeFinishDateTime > debtDateTime ) {
			return true
		} else {
			if ( !date || trialTime > diffInMinutes ) {
				return true
			} else {
				return false
			}
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
		if( price ) {
			let formatter = new Intl.NumberFormat('sk-SK', {
				style: 'currency',
				currency: 'EUR',
			});
			return formatter.format(price/100)
		} else return ''
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

	// Calculate age from date
	calculateAge(birthDate) {
		// Split the birth date into year, month, and day
		const [birthYear, birthMonth, birthDay] = birthDate.split('-').map(Number);

		// Get the current date
		const currentDate = new Date();
		const currentYear = currentDate.getFullYear();
		const currentMonth = currentDate.getMonth() + 1; // Month is 0-based in JavaScript
		const currentDay = currentDate.getDate();
	  
		// Calculate age
		let age = currentYear - birthYear;
	  
		// Adjust age based on month and day
		if (currentMonth < birthMonth || (currentMonth === birthMonth && currentDay < birthDay)) {
		  age--;
		}
	  
		return age;
	}

	// Remove object levels to specific level
	findParentObject(obj, keyName) {
		for (const key in obj) {
			if (obj.hasOwnProperty(key)) {
				if (key === keyName) {
					return obj; // Return the parent object when "scheme" is found
				} else if (typeof obj[key] === "object") {
					// If the current value is an object, recursively search within it
					const result = this.findParentObject(obj[key], keyName);
					if (result !== null) {
						return result; // Return the result if "scheme" is found in the nested object
					}
				}
			}
		}
		return null; // Key "scheme" not found in the object
	}


	// Teams Formations with players details get by multiple promise
	updatePlayersDetails( responses, data ) {					
		return data.map( item => {
			const key = Object.keys(item);

			const matchingResponse = responses.find(response => {
				return response.data.wyId === item[key].playerId;
			})
			
			if (matchingResponse) {
				return {
					[key]: {
						...item[key],
						details: matchingResponse.data,
					},
				};
			} else {
				return item;
			}
		})	
	}


	// Positions on pitch
	positionsCoordinates(playersArray, homeGuest) {
		const updatedPlayersArray = playersArray && playersArray.map( player => {
			
			switch (player.position) {
				case 'gk':
					if ( homeGuest === 'home' ) {
						return { ...player, x:5.5, y:50 }
					} else if ( homeGuest === 'away' ){
						return { ...player, x:95, y:50 }
					} 
					
				case 'rdmf':
					if ( homeGuest === 'home' ) {
						return { ...player, x:25, y:63 }
					} else if ( homeGuest === 'away' ){
						return { ...player, x:75, y:37 }
					}

				case 'ldmf':
					if ( homeGuest === 'home' ) {
						return { ...player, x:25, y:37 }
					} else if ( homeGuest === 'away' ){
						return { ...player, x:75, y:63 }
					} 

				case 'rcmf':
					if ( homeGuest === 'home' ) {
						return { ...player, x:30, y:65 }
					} else if ( homeGuest === 'away' ){
						return { ...player, x:70, y:35 }
					}

				case 'lcmf':
					if ( homeGuest === 'home' ) {
						return { ...player, x:30, y:35 }
					} else if ( homeGuest === 'away' ){
						return { ...player, x:70, y:65 }
					}

				case 'rcmf3':
					if ( homeGuest === 'home' ) {
						return { ...player, x:30, y:65 }
					} else if ( homeGuest === 'away' ){
						return { ...player, x:70, y:35 }
					}

				case 'lcmf3':
					if ( homeGuest === 'home' ) {
						return { ...player, x:30, y:35 }
					} else if ( homeGuest === 'away' ){
						return { ...player, x:70, y:65 }
					} 

				case 'amf':
					if ( homeGuest === 'home' ) {
						return { ...player, x:35, y:50 }
					} else if ( homeGuest === 'away' ){
						return { ...player, x:65, y:50 }
					} 

				case 'ramf':
					if ( homeGuest === 'home' ) {
						return { ...player, x:35, y:65 }
					} else if ( homeGuest === 'away' ){
						return { ...player, x:65, y:35 }
					} 

				case 'lamf':
					if ( homeGuest === 'home' ) {
						return { ...player, x:35, y:35 }
					} else if ( homeGuest === 'away' ){
						return { ...player, x:65, y:65 }
					} 

				case 'rb':
					if ( homeGuest === 'home' ) {
						return { ...player, x:18, y:90 }
					} else if ( homeGuest === 'away' ){
						return { ...player, x:82, y:10 }
					}

				case 'lb':
					if ( homeGuest === 'home' ) {
						return { ...player, x:18, y:10 }
					} else if ( homeGuest === 'away' ){
						return { ...player, x:82, y:90 }
					} 
				
				case 'rb5':
					if ( homeGuest === 'home' ) {
						return { ...player, x:23, y:90 }
					} else if ( homeGuest === 'away' ){
						return { ...player, x:77, y:10 }
					}

				case 'lb5':
					if ( homeGuest === 'home' ) {
						return { ...player, x:23, y:10 }
					} else if ( homeGuest === 'away' ){
						return { ...player, x:77, y:90 }
					} 

				case 'lcb':
					if ( homeGuest === 'home' ) {
						return { ...player, x:15, y:30 }
					} else if ( homeGuest === 'away' ){
						return { ...player, x:85, y:70 }
					} 

					
				case 'rcb':
					if ( homeGuest === 'home' ) {
						return { ...player, x:15, y:70 }
					} else if ( homeGuest === 'away' ){
						return { ...player, x:85, y:30 }
					}

				case 'lcb3':
					if ( homeGuest === 'home' ) {
						return { ...player, x:17, y:27 }
					} else if ( homeGuest === 'away' ){
						return { ...player, x:83, y:73 }
					} 

				case 'rcb3':
					if ( homeGuest === 'home' ) {
						return { ...player, x:17, y:73 }
					} else if ( homeGuest === 'away' ){
						return { ...player, x:83, y:27 }
					} 

				case 'cb':
					if ( homeGuest === 'home' ) {
						return { ...player, x:15, y:50 }
					} else if ( homeGuest === 'away' ){
						return { ...player, x:85, y:50 }
					} 
				
				case 'cf':
					if ( homeGuest === 'home' ) {
						return { ...player, x:45, y:50 }
					} else if ( homeGuest === 'away' ){
						return { ...player, x:55, y:50 }
					} 

				case 'lw':
					if ( homeGuest === 'home' ) {
						return { ...player, x:40, y:10 }
					} else if ( homeGuest === 'away' ){
						return { ...player, x:60, y:90 }
					} 

				case 'rw':
					if ( homeGuest === 'home' ) {
						return { ...player, x:40, y:90 }
					} else if ( homeGuest === 'away' ){
						return { ...player, x:60, y:10 }
					} 

				case 'lwf':
					if ( homeGuest === 'home' ) {
						return { ...player, x:47, y:31 }
					} else if ( homeGuest === 'away' ){
						return { ...player, x:53, y:69 }
					} 

				case 'rwf':
					if ( homeGuest === 'home' ) {
						return { ...player, x:47, y:69 }
					} else if ( homeGuest === 'away' ){
						return { ...player, x:53, y:31 }
					} 

				case 'lwb':
					if ( homeGuest === 'home' ) {
						return { ...player, x:30, y:10 }
					} else if ( homeGuest === 'away' ){
						return { ...player, x:70, y:90 }
					} 
				case 'rwb':
					if ( homeGuest === 'home' ) {
						return { ...player, x:30, y:90 }
					} else if ( homeGuest === 'away' ){
						return { ...player, x:70, y:10 }
					} 

				case 'dmf':
					if ( homeGuest === 'home' ) {
						return { ...player, x:23, y:50 }
					} else if ( homeGuest === 'away' ){
						return { ...player, x:77, y:50 }
					} 

				case 'ss':
					if ( homeGuest === 'home' ) {
						return { ...player, x:45, y:65 }
					} else if ( homeGuest === 'away' ){
						return { ...player, x:55, y:35 }
					} 

				default:
					return { ...player };
			}
		})
		return updatedPlayersArray
	}

}

export default Helpers = new Helpers();