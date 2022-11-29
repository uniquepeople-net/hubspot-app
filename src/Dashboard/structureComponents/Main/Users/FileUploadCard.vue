<template>
	<FileUpload name="data[]" url="https://www.primefaces.org/upload.php" @upload="onAdvancedUpload($event)" 
				:multiple="true" accept="image/*,application/pdf" :maxFileSize="1000000">
		
		
		<template #content>
			<ul v-if="uploadedFiles && uploadedFiles[0]">
				<li v-for="file of uploadedFiles[0]" :key="file">{{ file.name }} - {{ file.size }} bytes</li>
			</ul>
		</template>
		<template #empty>
			<div class="d-flex justify-content-evenly align-items-center">
				<p class="m-0">Drag and drop files to here to upload.</p>
				<i class="pi pi-cloud-upload" style="font-size:2rem;"/>
			</div>
		</template>
    </FileUpload>
</template>
 
 
<script>
	import ProgressBar from 'primevue/progressbar';
	import FileUpload from 'primevue/fileupload';

	export default {
		data() {
			return {
				uploadedFiles: [],
				files: [],
				totalSize: 0,
				totalSizePercent: 0
			}
		},
		methods: {
			onAdvancedUpload() {
				Toast.fire({
					icon: 'info',
					title: 'File Uploaded'
				})
			},
		},
		components: { FileUpload, ProgressBar }
	}
</script>
 
 
<style lang='scss' scoped>
::v-deep(.custom-progress-bar) {
	.p-progressbar-value {
		background-color: #f44336;
	}
}
</style>