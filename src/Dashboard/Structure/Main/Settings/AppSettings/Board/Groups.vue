<template>
	<div>
		<Skeleton v-if="!groups" height="2rem" class="mb-2"></Skeleton>
		<DataTable v-if="groups" :value="groups" >
			<Column field="name" header="Name"></Column>
			<Column field="order" header="Order"></Column>
			<Column style="width:50px">
				<template #body="slotProps">
					<DeleteItem :delete="true" :itemId="slotProps.data.id" 
								:itemName="slotProps.data.name" callback="boardSet/getBoardGroups"
								item="board group" url="/api/settings-board/" redirectRoute="app-settings">
					</DeleteItem>
				</template>
			</Column>
		</DataTable>
	</div>
</template>
 
 
<script>
	import { mapGetters } from 'vuex'
	import DeleteItem from '../../../Users/DeleteItem.vue'

	export default {
		created() {
			this.$store.dispatch('boardSet/getBoardGroups')
		},
		data() {
			return {
			}
		},
		methods: {
 
		},
		computed: {
			...mapGetters({ groups: 'boardSet/boardGroups' })
		},
		components: { DeleteItem }
	}
</script>
 
 
<style lang='scss' scoped>
</style>