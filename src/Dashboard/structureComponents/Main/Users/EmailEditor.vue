<template>
	<div>
		<Dialog v-model:visible="showMessage" :breakpoints="{ '960px': '80vw' }" :style="{ width: '30vw' }" position="top">
			<div class="flex align-items-center flex-column pt-6 px-3">
				<i v-if="response.message" class="pi pi-check-circle" :style="{fontSize: '4rem', color: 'var(--green-400)' }"></i>
				<i v-if="response.error" class="pi pi-times-circle" :style="{fontSize: '4rem', color: 'var(--red-400)' }"></i>
				<h5 v-if="response.message" class="mt-3">{{ response.message }}</h5>
				<h6 v-if="response.error" v-for="(error, index) in response.error" class="mt-3">{{ index + ': ' + error[0].replace('validation.', '') }}</h6>
				<h6 v-if="!response" class="mt-3">
					Emails sent!
				</h6>
			</div>
			<template #footer>
				<div class="flex justify-content-center">
					<Button label="OK" @click="toggleDialog" class="p-button-text" />
				</div>
			</template>
		</Dialog>

		<h4 class="mb-4">{{ $t('message.EmailEditor')}}</h4>
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
						<Editor v-model="v$.value.$model" :class="{'p-invalid':v$.value.$invalid && submitted}" ref="editor"/>
						<Button @click="toggleMode" plain text raised class="d-block ms-auto">{{ editorMode }}</Button>
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
						<Listbox :options="emails" :optionLabel="labelTemplate" style="width:100%" listStyle="max-height:300px"
								v-model="v$.emails.$model" :class="{'p-invalid':v$.emails.$invalid && submitted}"/>
						<InputError :validator="v$.emails" :submitted="submitted" replace="Users"></InputError>					

						<Button label="Send" :disabled="!emails" icon="bi bi-send-check" :loading="loading" class="p-button-raised p-button-success mt-3" @click="sendEmails(!v$.$invalid)"/>
					</template>
				</Card>	
			</div>

			<div class="col-12 col-md-6">
				<DynamicData :submitted="submitted" @dynamicArr="emitDynamicArr"/>
			</div>

			<div class="col-12 col-md-6">
				<EmailTemplates @prependTemplate="prependTemplate" @appendTemplate="appendTemplate" :content="value"/>
			</div>

		</div>
	</div>		
</template>
 
 
<script>
	import { required, minLength } from "@vuelidate/validators";
	import { useVuelidate } from "@vuelidate/core";
	import { mapGetters } from 'vuex';
	import { toRaw } from 'vue';
	import Delta from 'quill-delta';
	import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html';
	import { compile, convert } from 'html-to-text';
	import Editor from 'primevue/editor'
	import Listbox from 'primevue/listbox';
	import FileUploadCard from './FileUploadCard.vue';
	import EmailTemplates from './EmailTemplates.vue';
	import DynamicData from './DynamicData.vue';

	export default {
		setup: () => ({ v$: useVuelidate() }),
		data() {
			return {
				value: `<div>
							<div>
								<img src="https://api.QRGenerator.sk/by-square/pay/qr.png?iban=SK2709000000005112386457&amount=40&currency=EUR&vs={$_dynamic_var_symbol_$}&payment_note=ufp-clenske-2023&due_date=2023-06-03&size=256&transparent=false" alt="QR kod"/>
							</div>
							<h3 style="font-weight:bold;">Únia futbalových profesionálov</h3>
							<div><img src="https://ufp.sk/wp-content/uploads/2023/04/cropped-logo-transp.png" alt="logo Ufp"></div>
							<h4>Miletičova 5, 821 08 Bratislava</h4>
							<h4>info@ufp.sk</h4>
							<h4>ufp.sk</h4>
						</div>`,
				files: null,
				subject: '',
				submitted: false,
				loading: false,
				showMessage: false,
				editorMode: 'HTML',
				dynamicArr: [],
				selectedDynamicData: null,
				response: null
			}
		},
		validations() {
			return {
				subject: { required, minLength: minLength(3) },
				value: { required, minLength: minLength(3) },
				emails: { required }
			}
		},
		methods: {
			async sendEmails(isFormValid) {
				this.submitted = true;
				let someEmptyDynamic = this.dynamicArr.some( d => d.data === '' || d.value === '' )

				if (!isFormValid || someEmptyDynamic ) {
					return;
				}
				
				this.loading = true;

				setTimeout(() => {
					this.showMessage = true
				}, 2500)

				const data = new FormData()
				
				this.files && this.files.map( file =>  {
					data.append('files[]', file)
				})

				data.append('subject', this.subject)
				data.append('content', this.value)
				data.append('replyName', this.user.name)
				data.append('replyEmail', this.user.email)
				data.append('fromUserId', this.user.id)

				Helpers.appendArrToFormData(this.dynamicArr, data, 'dynamic')
				Helpers.appendArrToFormData(this.emails, data, 'users')

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
				}).then( response => {
					this.response = response.data
					this.toggleDialog()
					this.loading = false
				}).catch( error => {
						Toast.fire({
							icon: 'error',
							title: 'Unable to send email(s)'
						})
					})
			},
			uploadedFiles(e) {
				this.files = e;
			},
			toggleDialog() {
				this.showMessage = !this.showMessage
				//this.$router.push({ name: 'all-users' })
			},
			labelTemplate(data) {
				return data ? data.name + ' ' + data.surname : ''
			},
			toggleMode() {
				const editor = this.$refs.editor.quill;
				const mode = this.editorMode;
				if (mode === 'HTML') {
					const delta = new Delta().insert(editor.root.innerHTML);
					editor.setContents(delta);
					this.editorMode = 'Plain Text';
				} else {
					const delta = editor.getContents();
					const converter = new QuillDeltaToHtmlConverter(delta.ops);
					const html = converter.convert()
	
					const options = {
						wordwrap: 130,
						preserveNewlines: true
					};
					const text = convert(html, options);
					
					editor.pasteHTML(text);
					//editor.root.innerHTML = text;
					this.editorMode = 'HTML';
				}
			},
			emitDynamicArr(e) {
				this.dynamicArr = e
			},
			prependTemplate(data) {
				this.value = data + this.value			
			},
			appendTemplate(data) {
				this.value = this.value + data
			}
		},
		computed: {
			...mapGetters({ emails: 'appData/getUsers',
							user: 'user/user' }),
		},
		components: { Editor, Listbox, FileUploadCard, EmailTemplates, DynamicData }
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