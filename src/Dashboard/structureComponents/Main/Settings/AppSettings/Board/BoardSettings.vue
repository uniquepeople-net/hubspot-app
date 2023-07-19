<template>
	<div>
		<Card class="card">
			<template #title>
				<div class="card-header d-flex justify-content-between align-items-center">
					<h5>{{ $t('message.Board') }}</h5>
				</div>
			</template>
			<template #content>
				<div class="row">
					<div class="col-12 col-xl-6">
						<Groups />
					</div>
					<div class="col-12 col-xl-6">
						<GroupsAdd />
					</div>
				</div>
			</template>
		</Card>
	</div>
</template>
 
 
<script>
	import Groups from './Groups.vue'
	import GroupsAdd from './GroupsAdd.vue'
	
	export default {
		data() {
			return {
				}
		},
		methods: {
			
		},
		components: { Groups, GroupsAdd },
	}
</script>
 
 
<style lang='scss' scoped>
</style>