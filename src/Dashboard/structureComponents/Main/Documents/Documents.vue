<template>
	<div>
		<DocumentsData v-if="docs" :docs="docs" :admin="false"/>
		<LoadingIcon v-if="!docs" :error="error"/>
	</div>
</template>
 
 
<script>
	import { mapGetters } from 'vuex'
	import DocumentsData from './DocumentsData.vue'

	export default {
		created() {
			this.$store.dispatch("documents/getDocuments")		
		},
		computed: {
			...mapGetters({ docs: 'documents/documents',
							error: 'documents/error' })
		},
		components: { DocumentsData }
	}
</script>
 
 
<style lang='scss' scoped>
</style>