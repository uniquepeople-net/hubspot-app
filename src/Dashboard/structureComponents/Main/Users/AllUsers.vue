<template>
	
	<DataTable v-if="users" :value="userData" :paginator="true" class="p-datatable-customers card" :rows="10" :loading="loading"
		dataKey="id" :rowHover="true" v-model:selection="selectedUsers" v-model:filters="filters" filterDisplay="menu" 
		paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[10,25,50]"
		currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
		:globalFilterFields="['name']" responsiveLayout="scroll">
		<template #header>
				<div class="d-flex justify-content-between align-items-center">
				<h5 class="m-0">Users</h5>
				<span class="p-input-icon-left">
					<i class="pi pi-search" />
					<InputText v-model="filters['global'].value" placeholder="Keyword Search" />
				</span>
				</div>
		</template>
		<template #empty>
			No users found.
		</template>
		<template #loading>
			
		<ProgressSpinner strokeWidth="3"/>
			
		</template>
		<Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
		<Column field="name" header="Name" sortable style="min-width: 14rem">
			<template #body="{data}">
				{{data.name}}
			</template>
			<template #filter="{filterModel}">
				<InputText type="text" v-model="filterModel.value" class="p-column-filter" placeholder="Search by name"/>
			</template>			
		</Column>
		
		<Column field="fee" header="Fee" sortable :filterMenuStyle="{'width':'8rem'}" style="min-width: 8rem">
			<template #body="{data}">
				<span :class="'fee-badge fee-' + data.fee">{{data.fee}}</span>
			</template>
			
		</Column>

		<Column field="is_admin" header="State" sortable :filterMenuStyle="{'width':'8rem'}" style="min-width: 8rem">
			<template #body="{data}">
				<span :class="'state-badge state-' + data.is_admin">{{ stateUser(data.is_admin) }}</span>
			</template>
		</Column>

		<Column headerStyle="width: 4rem; text-align: center" bodyStyle="text-align: center; overflow: visible">
			<template #body="{data}">
				<router-link :to="{name: 'specific-user', params: {user_id: data.id}}">
					<Button type="button" icon="pi pi-cog"></Button>
				</router-link> 
			</template>
		</Column>

		<template #footer>
			<Button label="Add new user" icon="pi pi-user-plus" class="p-button-raised p-button-info" @click="addUserLink"/>
		</template>

	</DataTable>

</template>
 
 
<script>
	import { FilterMatchMode,FilterOperator } from 'primevue/api';
	import { mapGetters } from 'vuex';

	export default {
		created() {
			this.$store.dispatch("users/getUsers");
			this.loading = true
		},
		data() {
			return {
				selectedUsers: null,
				filters: {
					'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
					'name': {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},
				},
				loading: false,
				userData: []
			}
		},
		methods: {
			addUserLink() {
				this.$router.push({name: 'add-new-user'})
			},
			stateUser(data) {
				return data === 1 ? 'admin' : 'user'
			}

		},
		computed: {
			...mapGetters({ users: 'users/getUsers' }),
		},
		watch: {
			users: function (data) {
				this.userData = data
				this.loading = false
			},
		},
	}
</script>
 
 
<style lang="scss">
@keyframes p-progress-spinner-color {
	0% {
		stroke: #b4d4ff;
	}
	100% {
		stroke: #ffffff;
	}
}
</style>