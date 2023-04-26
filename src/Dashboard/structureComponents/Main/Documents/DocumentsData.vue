<template>
	<Card class="card">
		<template #title>
			<div class="card-header">
				<h5>Documents</h5>
			</div>
		</template>
		<template #content>
			<div v-for="(doc, index) in docs" class="file-wrapper">
				<a :href="doc.url" class="d-flex align-items-center" download>
					<i class="bi bi-cloud-arrow-down icon"></i>
					<p class="file-title w-auto">{{ doc.title }}</p>
				</a>
				<!-- <i class="bi bi-trash px-3" v-if="admin" @click="deleteFile(doc.id)"></i> -->
				<DeleteItem v-if="delete" :delete="delete" :itemId="doc.id" 
								:itemName="doc.title" item="document" url="/api/documents/"
								redirectRoute="docs-all" :callback="'documents/getDocuments'"/>
			</div>
			<p v-if="docs.length === 0" class="text-center m-0">No files</p>
		</template>
	</Card>
</template>
 
 
<script>
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
				console.log(id)
				this.delete = true
			}
		},
		components: { DeleteItem }
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