<template>
	<div>
		<div v-for="(doc, index) in docs" class="file-wrapper main-bar p-3 sm-width-screen mb-3 bg-card-custom">
			<a :href="doc.url" class="d-flex align-items-center" download>
				<Document />
				<p class="file-title w-auto text-data">{{ doc.title }}</p>
			</a>
			<!-- <i class="bi bi-trash px-3" v-if="admin" @click="deleteFile(doc.id)"></i> -->
			<DeleteItem v-if="delete" :delete="delete" :itemId="doc.id" 
							:itemName="doc.title" item="document" url="/api/documents/"
							redirectRoute="docs-all" :callback="'documents/getDocsCategories'"/>
		</div>
		<p v-if="docs.length === 0" class="text-center m-0">No files</p>
	</div>
</template>
 
 
<script>
	import Document from '../Stats/Vectors/Document.vue';
	import DeleteItem from '../Users/DeleteItem.vue';

	export default {
		props: {
			docs: Array,
			admin: Boolean,
			delete: Boolean
		},
		data() {
			return {
				
			}
		},
		methods: {
			deleteFile(id) {
				this.delete = true
			}
		},
		components: { DeleteItem, Document }
	}
</script>
 
 
<style lang='scss' scoped>
.card {
	max-width: 976px;
	margin: auto;
}
.file-wrapper {
	display: flex;
	align-items: center;
	justify-content: space-between;
	border-bottom: 1px solid var(--bluegray-100);
	.icon {
		font-size: 2rem;
		color: var(--bluegray-500);
	}
	.bi-trash {
		margin-left: auto;
		font-size: 1.5rem;
		color: var(--red-600);
		cursor: pointer;
	}
	.file-title {
		display: inline-block;
		margin: 0 1rem;
	}
}

</style>