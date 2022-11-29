<template>
	<h4 class="mb-4">Email Editor</h4>
	<div class="row g-3">
		<div class="col-12 col-md-8">
			<Card class="card">
				<template #content>
					<Editor v-model="value" editorStyle="height:320px; padding:0;" 
						@text-change="textChange($event)"/>
				</template>
				<template #footer>
					<FileUploadCard />
				</template>
			</Card>
		</div>
		
		<div class="col-12 col-md-4">
			<Card class="card h-100" @click="textChange($event)">
				<template #title>
					<h5 class="card-header">Choosed Users</h5>
				</template>
				<template #content>
					<Listbox :options="emails" optionLabel="name" style="width:100%" listStyle="max-height:300px"/>
					<Button label="Send to all users" icon="bi bi-send-check" class="p-button-raised p-button-info mt-3" @click="sendEmails($event)"/>
				</template>
			</Card>	
		</div>		
	</div>		
</template>
 
 
<script>
	import { mapGetters } from 'vuex';
	import Editor from 'primevue/editor'
	import Listbox from 'primevue/listbox';
	import FileUploadCard from './FileUploadCard.vue';

	export default {
		data() {
			return {
				 value: '<h2>Create new email</h2>',				
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
		components: { Editor, Listbox, FileUploadCard }
	}
</script>
 
 
<style lang='scss' scoped>
</style>