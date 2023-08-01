<template>
	<Card class="card">
		<template #title>
			<div class="card-header d-flex justify-content-between align-items-center">
				<h5>{{ $t('message.Board') }}</h5>
				<OpenBlockIcon :collapsed="collapsed" @click="() => { collapsed = !collapsed }" />
			</div>
		</template>
		<template #content v-if="collapsed">
			<div class="row">
				<div class="col-12 col-xl-6 mb-4 mb-xl-0">
					<Groups />
				</div>
				<div class="col-12 col-xl-6 add-bg p-1">
					<GroupsAdd />
				</div>

				<Divider class="my-5"/>
				
				<div class="col-12 mb-4">
					<Members />
				</div>
				<div class="col-12 add-bg p-1">
					<MembersAdd />
				</div>
			</div>
		</template>
	</Card>
</template>
 
 
<script>
	import Groups from './Groups.vue'
	import GroupsAdd from './GroupsAdd.vue'
	import Members from './Members.vue'
	import MembersAdd from './MembersAdd.vue'
	import OpenBlockIcon from '../../../../../global/OpenBlockIcon.vue'

	export default {
		data() {
			return {
				collapsed: false
			}
		},
		methods: {
			
		},
		components: { Groups, GroupsAdd, Members, MembersAdd, OpenBlockIcon },
	}
</script>
 
 
<style lang='scss' scoped>
</style>