<template>
	<FileUpload name="files[]" url="http://localhost:80/api/bulk-emails" @upload="onAdvancedUpload($event, $ev)" 
				:multiple="true" accept="image/*,application/pdf" :maxFileSize="16000000" :fileLimit="fileLimit ? fileLimit : 20"
				@select="onSelectedFiles" :showUploadButton="false" @remove="onRemoveFile" @clear="onClearAllFiles"
				invalidFileSizeMessage="Max file size is 16MB" :invalidFileLimitMessage="`Max number of files is ${fileLimit}`"
				invalidFileTypeMessage="Invalid file type">		
		<template #content>
                <ul v-if="uploadedFiles && uploadedFiles[0]">
                    <li v-for="file of uploadedFiles[0]" :key="file">{{ file.name }} - {{ file.size }} bytes</li>
                </ul>
        </template>

			
		<template #empty>
			<div class="d-flex align-items-center justify-content-center flex-row">
				<p class="m-0">Drag and drop files to here to upload.</p>
				<i class="pi pi-cloud-upload border-2 ms-5 border-circle2 text-8xl text-400 border-400" />
			</div>
		</template>
	</FileUpload>
</template>
 
 
<script>
	import FileUpload from 'primevue/fileupload';

	export default {
		props: {
			fileLimit: Number
		},
		data() {
			return {
				uploadedFiles: [],
				files: [],
				totalSize: 0,
				totalSizePercent: 0,
			}
		},
		methods: {
			onSelectedFiles(event) {
				this.files = event.files;
				this.files.forEach((file) => {
					this.totalSize += parseInt(this.formatSize(file.size));
				});	
				this.$emit('files', this.files )			
        	},
			onRemoveFile(event) {
				this.files = event.files
				this.files.forEach((file) => {
					this.totalSize += parseInt(this.formatSize(file.size));
				});	
				this.$emit('files', this.files )
			},
			onClearAllFiles(clear) {
				this.files = []
				this.$emit('files', this.files )
			},
			formatSize(bytes) {
				if (bytes === 0) {
					return '0 B';
				}

				let k = 1000,
					dm = 3,
					sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
					i = Math.floor(Math.log(bytes) / Math.log(k));

				return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
			}
        },
		components: { FileUpload }
	}
</script>
 
 
<style lang='scss' scoped>
::v-deep(.custom-progress-bar) {
	.p-progressbar-value {
		background-color: #f44336;
	}
}
.pi-cloud-upload {
	font-size: 1.5rem;
}
</style>