<template>
	<h4 class="mb-4">Email Editor</h4>
	<div class="row g-3">
		<div class="col-12 col-md-8">
			<Card class="card">
				<template #title>
					<h6>Subject</h6>
					<div class="inputgroup">
						<InputText id="subject" v-model="v$.subject.$model" :class="{'p-invalid':v$.subject.$invalid && submitted}" 
										name="Subject" placeholder="Subject"/>							
						<InputError :validator="v$.subject" :submitted="submitted" replace="Subject"></InputError>					
					</div>
				</template>
				<template #content>
					<Editor v-model="v$.value.$model" :editorStyle="`height:320px; padding:0;`" :class="{'p-invalid':v$.value.$invalid && submitted}"/>
					<InputError :validator="v$.value" :submitted="submitted" replace="Content"></InputError>					
				</template>
				<template #footer>
					<FileUploadCard @files="uploadedFiles($event)"/>
				</template>
			</Card>
		</div>
		
		<div class="col-12 col-md-4">
			<Card class="card h-100">
				<template #title>
					<h5 class="card-header">Choosed Users</h5>
				</template>
				<template #content>
					<Listbox :options="emails" optionLabel="name" style="width:100%" listStyle="max-height:300px"/>
					<Button label="Send" icon="bi bi-send-check" class="p-button-raised p-button-success mt-3" @click="sendEmails(!v$.$invalid)"/>
				</template>
			</Card>	
		</div>		
	</div>		
</template>
 
 
<script>
	import { required, minLength } from "@vuelidate/validators";
	import { useVuelidate } from "@vuelidate/core";
	import { mapGetters } from 'vuex';
	import { toRaw } from 'vue';
	import Editor from 'primevue/editor'
	import Listbox from 'primevue/listbox';
	import FileUploadCard from './FileUploadCard.vue';

	export default {
		setup: () => ({ v$: useVuelidate() }),
		data() {
			return {
				value: '<h2>Create new email</h2>',
				files: null,
				subject: '',
				invalidContent: false,
				submitted: false,
			}
		},
		validations() {
			return {
				subject: { required, minLength: minLength(3) },
				value: { required, minLength: minLength(3) },
			}
		},
		methods: {
			async sendEmails(isFormValid) {

				this.submitted = true;

				if (!isFormValid) {
					return;
				}

				const data = new FormData()
				
				this.files && this.files.map( file =>  {
					data.append('files[]', file)
				})

				data.append('subject', this.subject)
				data.append('content', this.value)
				data.append('replyName', this.user.name)
				data.append('replyEmail', this.user.email)
				data.append('fromUserId', this.user.id)

				this.emails.map( email => {
					data.append('recipients[]', email.email )
					data.append('toNames[]', email.name )
					data.append('toIds[]', email.id )
				})

				await User.refreshedToken();

				await axios.post( DOMAIN_URL + '/api/bulk-emails', data, {
					headers: {
							Authorization: 'Bearer ' + User.getToken(),							
							'Content-Type': 'multipart/form-data'							
					}
				}).then( response => console.log(response))
			},
			uploadedFiles(e) {
				this.files = e;
			}
		},
		computed: {
			...mapGetters({ emails: 'appData/getUsers',
							user: 'user/user' }),
		},
		components: { Editor, Listbox, FileUploadCard }
	}
</script>
 
 
<style lang='scss' scoped>
.inputgroup input {
	width: 100%;
}
.invalid {
	border: 1px solid var(--red-600);
}
.error-msg, .p-error {
	font: {
		size: 1rem;
		weight: 400;
	}
	color: var(--red-600);
}
</style>