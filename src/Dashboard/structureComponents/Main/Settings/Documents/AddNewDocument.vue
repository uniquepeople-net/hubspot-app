<template>
	<div>
		<Dialog v-model:visible="showMessage" :breakpoints="{ '960px': '80vw' }" :style="{ width: '30vw' }" position="top">
			<div class="flex align-items-center flex-column pt-6 px-3">
				<i v-if="response.message" class="pi pi-check-circle" :style="{fontSize: '4rem', color: 'var(--green-400)' }"></i>
				<i v-if="response.error" class="pi pi-times-circle" :style="{fontSize: '4rem', color: 'var(--red-400)' }"></i>
				<h5 v-if="response.message" class="mt-3">{{ response.message }}</h5>
				<h6 v-if="response.error" v-for="(error, index) in response.error" class="mt-3">{{ index + ': ' + error[0].replace('validation.', '') }}</h6>
			</div>
			<template #footer>
				<div class="flex justify-content-center">
					<Button label="OK" @click="toggleDialog" class="p-button-text" />
				</div>
			</template>
		</Dialog>
	
		<div class="row">
			<div class="col-12 col-md-6">
				<FileUploadCard @files="uploadedFiles($event)"/>
			</div>
	
			<div class="col-12 col-md-6 files-titles" v-if="filesData.length">
				<Card>
					<template #content>
						<div v-for="(item, index) in filesData" class="mt-3">
							<p class="mb-1">{{item.file.name}}</p>
							<InputText v-model="item.title" class="w-100" placeholder="Title"/>
						</div>
					</template>
				</Card>
				<Button label="Upload Documents" :loading="loading" icon="bi bi-send-check" 
					class="ps-3 p-button-raised p-button-success mt-3" @click="uploadDocs"/>
			</div>
		</div>
	</div>
</template>
 
 
<script>
	import FileUploadCard from '../../Users/FileUploadCard.vue';

	export default {
		data() {
			return {
				files: [],
				filesData: [],
				showMessage: false,
				response: null,
				loading: false
			}
		},
		methods: {
			uploadedFiles(e) {
				this.files = e
				this.filesData = this.files.map( file => {
					return { file, title: '' }
				})
			},
			async uploadDocs() {
				this.loading = true
				const data = new FormData()

				this.files && this.files.map( ( file, index ) =>  {
					data.append('files[]', file)
					data.append('title[]', this.filesData[index].title)
				})

				await axios.post( DOMAIN_URL + '/api/documents', data, {
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
						timer: 4000,
						title: "Unable to upload files"
					})
					this.loading = false
				})
			},
			toggleDialog() {
            	this.showMessage = !this.showMessage;
        	},
		},
		components: { FileUploadCard },
	}
</script>
 
 
<style lang='scss' scoped>
.files-titles {
	margin-top : 0;
}
@media (min-width: 576px) {
	.files-titles {
		margin-top : 5rem;
	}
}
</style>