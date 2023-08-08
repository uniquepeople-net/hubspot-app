<template>
	<div>
		<TabView class="tab-view sm-width-screen" v-if="categories">
			<TabPanel v-for="category in categories" :header="category.name">
					
				<DocumentsData v-if="category.documents" :docs="category.documents" :admin="false"/>
				
			</TabPanel>		
		</TabView>

		<LoadingIcon v-if="!categories" :error="error"/>
	</div>
</template>
 
 
<script>
	import { mapGetters } from 'vuex'
	import TabView from 'primevue/tabview'
	import TabPanel from 'primevue/tabpanel'
	import BackButton from '../../../global/BackButton.vue'
	import DocumentsData from './DocumentsData.vue'

	export default {
		created() {
			//this.$store.dispatch("documents/getDocuments")		
			this.$store.dispatch("documents/getDocsCategories")		
		},
		computed: {
			...mapGetters({ categories: 'documents/docsCategories',
							error: 'documents/error' })
		},
		components: { DocumentsData, BackButton, TabView, TabPanel }
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