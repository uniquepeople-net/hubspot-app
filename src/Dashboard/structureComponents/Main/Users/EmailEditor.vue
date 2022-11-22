<template>
	<h4 class="mb-4">Email Editor</h4>
	<div class="row g-5">
		<Editor v-model="value" editorStyle="height:320px; padding:0;" 
				class="col-12 col-md-8" @text-change="textChange($event)"/>
		
		<Card class="col-12 col-md-4 card" @click="textChange($event)">
			<template #title>
				<h5 class="card-header">Choosed Users</h5>
			</template>
			<template #content>
				<Listbox :options="emails" optionLabel="name" style="width:100%" listStyle="max-height:300px"/>
				<Button label="Send to all users" icon="bi bi-send-check" class="p-button-raised p-button-info" @click="sendEmails($event)"/>
			</template>
		</Card>	
	</div>	

	
</template>
 
 
<script>
	import { mapGetters } from 'vuex';
	import Editor from 'primevue/editor'
	import Listbox from 'primevue/listbox';

	export default {
		data() {
			return {
				 value: '<div>Welcome to PrimeVue <b>Editor</b></div><div><br></div>',				
			}
		},
		methods: {
			sendEmails() {
				let data = {
					content: this.value,
					recipients: this.emails.map( email => email.email )
				}
				
				axios.post( DOMAIN_URL + '/api/bulk-emails', data, {
					headers: {
							Authorization: 'Bearer ' + User.getToken()
					}
				}).then( response => console.log(response))			
			},
			textChange(event) {
				console.log(event)	
			}
		},
		computed: {
			...mapGetters({ emails: 'appData/getEmails' }),
		},
		components: { Editor, Listbox }
	}
</script>
 
 
<style lang='scss' scoped>
</style>