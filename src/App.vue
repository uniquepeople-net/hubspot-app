<template>

	<router-view></router-view>

</template>

<script>

export default {
	mounted() {

		/*axios.post('http://localhost:80/api/login' , /* { 
			name: 'puser',
			email: 'puser@u.sk',
			password: 'password',
			password_confirmation: 'password' 
		} */
		/*{ 
			email: 'puser@u.sk',
			password: 'password',			
		}
		/* { headers: {
			Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vYXV0aF9uZ2lueC9hcGkvbG9naW4iLCJpYXQiOjE2NjYwMDY0NzAsImV4cCI6MTY2NjAxMDA3MCwibmJmIjoxNjY2MDA2NDcwLCJqdGkiOiJ4cDh4YzBoM3RDcFNlYTVVIiwic3ViIjoiMjMiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.Ldg_ZnkWhm927H4HylgTv7DLx9hsPwcyb4ELyAJvQAg' }
		} */
		/*).then( response => console.log(response))*/
		
	},
	
	
	
	data() {
		return {

		}
	},
}
</script>

<style lang="scss" scoped>
  /* #app {
    font-size: 18px;
    font-family: 'Roboto', sans-serif;
    color: rgb(43, 59, 13);
  } */
</style>
