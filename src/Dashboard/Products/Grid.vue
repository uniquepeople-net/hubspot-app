<template>
	<div >
		<FilterInput class="mb-4" @update="updateFilterInput"/>

		<TableData v-if="list" :list="listItems" :labels="['Id', 'Name', 'Update', 'Remove' ]" :data="['id', 'properties.name']"
				   @update="updateItem($event, 'update', 'Update product: ' + $event.properties.name)" 
				   @remove="updateItem($event, 'remove', 'Remove product: ' + $event.properties.name)"
				   @add="updateItem($event, 'add', 'Add product')"/>

		<Dialog v-model:visible="dialog" modal dismissableMask :header="dialogHeader" :style="{ width: '90vw', maxWidth: '576px' }"
				@after-hide="hideDialog()">
			<div class="center-center flex-column">
				<InputText v-model="product.properties.name" placeholder="Name" />
				<Button :label="checkAction(action)[0]" :severity="checkAction(action)[1]" class="mt-3"
						@click="updateProduct(action, product)" :loading="loading"/>
			</div>
		</Dialog>
	</div>
</template>
 
 
<script>
import { mapGetters } from 'vuex'
import TableData from '../Global/TableData.vue'
import Dialog from 'primevue/dialog';
import Divider from 'primevue/divider';
import FilterInput from '../Global/FilterInput.vue';
import InputText from 'primevue/inputtext'

export default {
	created() {
		this.$store.dispatch('products/getProducts', '?limit=10&archived=false' )
	},
	data() {
		return {
			dialog: false,
			dialogHeader: '',
			action: '',
			product: null,
			filterKeyword: ''
		}
	},
	methods: {
		updateItem(event, action, header) {
			this.toggleDialog()
			this.product = event
			this.action = action
			this.dialogHeader = header
		},
		toggleDialog() {
			this.dialog = !this.dialog
		},
		updateFilterInput(event) {
			this.filterKeyword = event
		},
		updateProduct(action, product) {
			this.$store.dispatch('products/updateProduct', { id: product.id, name: product.properties.name, action: action } )
		},
		hideDialog() {
			this.$store.dispatch('products/getProducts', '?limit=10&archived=false' )
		},
		checkAction(action) {
			switch (action) {
				case 'add':
					return ['Add', 'success']
				case 'update':
					return ['Update', 'secondary']
				case 'remove':
					return ['Remove', 'danger']
				default:
					break;
			}
		}
	},
	computed: {
		...mapGetters({ list: 'products/list',
						loading: 'products/loading' }),
		listItems() {
			let keyword = this.filterKeyword
			if ( this.filterKeyword.length > 0 ) {
				return this.list.filter( item => {
					if ( item.id.includes(keyword) || item.properties.name.toLowerCase().includes(keyword)) {
						return item
					}
				})
				
			} else return this.list
		}
	},
	components: { TableData, Dialog, FilterInput, InputText }
}
</script>
 
 
<style lang='scss' scoped>
</style>