<template>
	<div>
		<div class="d-flex justify-content-between align-items-center mb-4">
			<h5>{{ $t('message.Members') }}</h5>
		</div>
		<Skeleton v-if="!members" height="2rem" class="mb-2"></Skeleton>
		<DataTable v-if="members" :value="members" >
			<Column field="name" header="Name"></Column>
			<Column field="position" header="Position"></Column>
			<Column field="phone_num" header="Phone number"></Column>
			<Column field="email" header="Email"></Column>
			<Column field="description" header="description"></Column>
			<Column field="image_url" header="Image">	
				<template #body="{data}">
					<div v-if="data.image_url" class="member-img"><img :src="data.image_url" alt="" /></div>
				</template>
			</Column>
			<Column header="Groups">
				<template #body="{data}">
					<span>{{ data.groups ? data.groups.join(', ') : '' }}</span>
				</template>
			</Column>
			<Column style="width:50px">
				<template #body="slotProps">
					<DeleteItem :delete="true" :itemId="slotProps.data.id" 
								:itemName="slotProps.data.name" callback="boardSet/getBoardMembers"
								item="board member" url="/api/settings-board-members/" redirectRoute="app-settings">
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
			this.$store.dispatch('boardSet/getBoardMembers')
		},
		data() {
			return {
			}
		},
		methods: {
 
		},
		computed: {
			...mapGetters({ members: 'boardSet/boardMembers' })
		},
		components: { DeleteItem }
	}
</script>
 
 
<style lang='scss' scoped>
.member-img {
	img {
		width: 50px;
		height: 50px;
	}
}
</style>