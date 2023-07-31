<template>
	<div>
		<Button label="Add document" icon="bi bi-file-earmark-plus" class="p-button-raised p-button-info" @click="addNewDoc"/>
		
		<TabView class="tab-view sm-width-screen mt-3" v-if="categories">
			<TabPanel v-for="category in categories" :header="category.name">
					
					<DocumentsData v-if="category.documents" :docs="category.documents" class="mt-5" :admin="true" :delete="true"/>
				
			</TabPanel>		
		</TabView>
		
		<LoadingIcon v-if="!categories"/>
	</div>
</template>
 
 
<script>
	import { mapGetters } from 'vuex'
	import TabView from 'primevue/tabview'
	import TabPanel from 'primevue/tabpanel'
	import DocumentsData from '../../Documents/DocumentsData.vue';
	
	export default {
		created() {
			//this.$store.dispatch("documents/getDocuments")
			this.$store.dispatch("documents/getDocsCategories")			
		},
		methods: {
			addNewDoc() {
				this.$router.push({ name: 'add-new-doc' })
			}
		},
		computed: {
			...mapGetters({ categories: 'documents/docsCategories' })
		},
		components: { DocumentsData, TabView, TabPanel }
	}
</script>
 
 
<style lang='scss' scoped>
.tab-view {
	:deep(.p-tabview-nav-container) {
		margin-bottom: 1rem;
	}
	:deep(.p-tabview-panels) {
		padding-left: 0;
		padding-right: 0;
	}
	margin-bottom: 5rem;
	:deep(.p-tabview-nav li .p-tabview-nav-link:not(.p-disabled):focus) {
		box-shadow: unset;
	}
	:deep(.p-tabview-header) {
		flex: 1;
		.p-tabview-nav-link {
			justify-content: center;
		}
	}
}
</style>