<template>
	<div>
		<Button label="Add document" icon="bi bi-file-earmark-plus" class="p-button-raised p-button-info" @click="addNewDoc"/>
		<DocumentsData v-if="docs" :docs="docs" class="mt-5" :admin="true" :delete="true"/>
		<LoadingIcon v-if="!docs"/>
	</div>
</template>
 
 
<script>
	import { mapGetters } from 'vuex'
	import DocumentsData from '../../Documents/DocumentsData.vue';
	
	export default {
		created() {
			this.$store.dispatch("documents/getDocuments")		
		},
		methods: {
			addNewDoc() {
				this.$router.push({ name: 'add-new-doc' })
			}
		},
		computed: {
			...mapGetters({ docs: 'documents/documents' })
		},
		components: { DocumentsData }
	}
</script>
 
 
<style lang='scss' scoped>
</style>