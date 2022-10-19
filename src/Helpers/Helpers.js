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

}

export default Helpers = new Helpers();