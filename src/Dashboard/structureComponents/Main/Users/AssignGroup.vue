<template>
	<div class="row">
		<div class="col-12 col-md-6 col-xl-4">
			<Card class="card">
				<template #title>
					<h5 class="card-header">Groups</h5>
				</template>
				<template #content>
					<MultiSelect v-model="selectedGroups" :options="groups" class="multi-select" 
								 optionLabel="name" placeholder="Select Group"/>
				</template>
				<template #footer>
					<ul class="groups-list">
						<li v-for="group in selectedGroups">{{group.name}}</li>
					</ul>
				</template>
			</Card>
		</div>
		<div class="col-12 col-md-6 col-xl-4">
			<Card class="card h-100">
				<template #title>
					<h5 class="card-header">Choosed Users</h5>
				</template>
				<template #content>
					<Listbox :options="users" optionLabel="name" style="width:100%" listStyle="max-height:300px"/>
					<Button label="Assign" icon="bi bi-tags" class="p-button-raised p-button-success mt-3" @click=""/>
				</template>
			</Card>	
		</div>	
	</div>	
</template>
 
 
<script>
	import { mapGetters } from 'vuex'
	import Listbox from 'primevue/listbox';
	import MultiSelect from 'primevue/multiselect';

	export default {
		created() {
			this.$store.dispatch("groups/getGroups");
		},
		data() {
			return {
				selectedGroups: null,
			}
		},
		methods: {
 
		},
		computed: {
			...mapGetters({ users: 'appData/getUsers',
							groups: 'groups/groups' })
		},
		components: { Listbox, MultiSelect }
	}
</script>
 
 
<style lang='scss' scoped>
.multi-select {
	width: 100%;
}
.groups-list {
	list-style: none;
	li {
		line-height: 2rem;
		font-weight: 500;
	}
}
</style>