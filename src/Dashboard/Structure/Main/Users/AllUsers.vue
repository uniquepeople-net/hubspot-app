<template>	
	<div>
		<BackButton :title="$t('message.users')" :route="'my-board'" class="mb-4"/>
		<DataTable v-if="users" :value="userData" :paginator="true" class="p-datatable-customers card" :rows="10" :loading="loading"
			dataKey="id" :rowHover="true" v-model:selection="selectedUsers" v-model:filters="filters" filterDisplay="menu" 
			paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" 
			:rowsPerPageOptions="[10,25,50]" :currentPageReportTemplate="`${$t('message.Showing')} {first} ${$t('message.to')} {last} ${$t('message.of')} {totalRecords} ${$t('message.usersov')}`"
			:globalFilterFields="['name', 'surname', 'club']" responsiveLayout="scroll">
			<template #header>			
				<div class="d-flex flex-column flex-sm-row justify-content-between align-items-center">
					<span class="p-input-icon-left mb-3 mb-sm-0">
						<i class="pi pi-search" />
						<InputText v-model="filters['global'].value" :placeholder="$t('message.KeywordSearch')" />
					</span>
					<Button type="button" icon="pi pi-filter-slash" :label="$t('message.ClearFilters')" class="btn-border" @click="clearFilter()"/>
				</div>
				<Divider />
				<div class="filter-num d-flex align-items-center">
					{{ $t('message.SelectFrom') }}:
					<InputNumber v-model="selectFrom" class="select-num mx-3" :min="1" :max="users.length"/> 
					{{ $t('message.SelectTo') }}:
					<InputNumber v-model="selectTo" class="select-num mx-3" :min="1" :max="users.length"/>
					<Button :label="$t('message.Select')" @click="filterNumber" class="btn-black"></Button>
				</div>
			</template>
			<template #empty>
				No users found.
			</template>
			<template #loading>			
				<LoadingIcon />
			</template>
			<Column header="#" headerStyle="width:3rem">
				<template #body="slotProps">
					{{ slotProps.index + 1 }}
				</template>
			</Column>
			<Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
			<Column field="name" :header="$t('message.Name')" sortable style="min-width: 14rem">
				<template #body="{data}">
					{{data.name}}
				</template>
				<template #filter="{filterModel}">
					<InputText type="text" v-model="filterModel.value" class="p-column-filter" placeholder="Search by name"/>
				</template>			
			</Column>
			<Column field="surname" :header="$t('message.Surname')" sortable style="min-width: 14rem">
				<template #body="{data}">
					{{data.surname}}
				</template>
				<template #filter="{filterModel}">
					<InputText type="text" v-model="filterModel.value" class="p-column-filter" placeholder="Search by surname"/>
				</template>			
			</Column>
	
			<Column field="club" :header="$t('message.Club')" sortable style="min-width: 14rem">
				<template #body="{data}">
					{{data.club}}
				</template>
				<template #filter="{filterModel}">
					<InputText type="text" v-model="filterModel.value" class="p-column-filter" placeholder="Search by club"/>
				</template>			
			</Column>
			
			<Column field="fee" :header="$t('message.Fee')" dataType="boolean" sortable :filterMenuStyle="{'width':'8rem'}" style="min-width: 8rem">
				<template #body="{data}">
					<i class="pi" :class="{'true-icon pi-check-circle': data.fee, 'false-icon pi-times-circle': !data.fee}"></i>
				</template>
				<template #filter="{filterModel}">
					<TriStateCheckbox v-model="filterModel.value" inputId="checkbox" />
					<label class="ps-3" for="checkbox">{{filterModel.value == null ? '' : statePay(filterModel.value)}}</label>
				</template>
			</Column>
	
			<Column field="is_admin" :header="$t('message.State')" dataType="boolean" sortable :filterMenuStyle="{'width':'8rem'}" style="min-width: 8rem">
				<template #body="{data}">
					<Badge :value="stateUser(data.is_admin)" :severity="stateBadge(data.is_admin)"/>
				</template>
			</Column>
	
			<Column field="active_member" :header="$t('message.Activity')" dataType="boolean" sortable :filterMenuStyle="{'width':'8rem'}" style="min-width: 8rem">
				<template #body="{data}">
					<i class="pi" :class="{'true-icon pi-check-circle': data.active_member, 'false-icon pi-times-circle': !data.active_member}"></i>
				</template>
				<template #filter="{filterModel}">
					<TriStateCheckbox v-model="filterModel.value" inputId="checkbox-a" />
					<label class="ps-3" for="checkbox-a">{{filterModel.value == null ? '' : stateActive(filterModel.value)}}</label>
				</template>
			</Column>
	
			<Column field="groups" :header="$t('message.Groups')" sortable style="min-width: 14rem">
				<template #body="{data}">
					{{formatGroups(data.groups)}}
				</template>
				<template #filter="{filterModel}">
					<InputText type="text" v-model="filterModel.value" class="p-column-filter" placeholder="Search by groups"/>
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
				<div class="d-flex flex-column flex-sm-row justify-content-between">
					<BulkActions :selected="selectedUsers"/>
					<Button :label="$t('message.addNewUser')" icon="pi pi-user-plus" class="p-button-raised btn-border-radius btn-black" @click="addNewUser"/>
				</div>
			</template>
		</DataTable>
	</div>
</template>
 
 
<script>
	import { FilterMatchMode, FilterOperator } from 'primevue/api';
	import { mapGetters } from 'vuex';
	import TriStateCheckbox from 'primevue/tristatecheckbox';
	import BulkActions from './BulkActions.vue';
	import InputNumber from 'primevue/inputnumber';
import BackButton from '../../../global/BackButton.vue';

	export default {
		created() {
			this.$store.dispatch("users/getUsers");
			this.initFilters();
			this.loading = true
		},
		data() {
			return {
				selectedUsers: null,
				selectFrom: null,
				selectTo: null,
				filters: null,
				loading: false,
				userData: []
			}
		},
		methods: {
			addNewUser() {
				this.$router.push({name: 'add-new-user'})
			},
			stateUser(data) {
				return data ? 'admin' : 'user'
			},
			stateBadge(data) {
				return data ? 'warning' : 'secondary'
			},
			statePay(data) {
				return data ? 'Paid' : 'Not Paid'
			},
			stateActive(data) {
				return data ? 'Active' : 'Inactive'
			},
			clearFilter() {
				this.initFilters();
			},
			initFilters() {
				this.filters = {
					'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
					'name': {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},
					'surname': {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},
					'club': {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},
					'fee': {value: null, matchMode: FilterMatchMode.EQUALS},
					'active_member': {value: null, matchMode: FilterMatchMode.EQUALS},
					'groups': {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.CONTAINS}]},
				}
			},
			formatGroups(groups) {
				if ( groups ) {
					return groups.join(', ')	
				}
			},
			filterNumber() {
				this.selectedUsers = null
				return this.selectedUsers = this.users.filter( ( item, index ) => ( index + 1 )  >= this.selectFrom && ( index + 1 ) <= this.selectTo )
			}
		},
		computed: {
			...mapGetters({ users: 'users/getUsers' }),
		},
		watch: {
			users: function (data) {
				if (data) {
					this.userData = data.map( d => {
						let groups = ''
						if ( d.groups ) {
							groups = d.groups.map( g => {
								return g.name
							})
						}
						return { ...d, groups: groups }
					})
					this.loading = false
				}
			},
		},
		components: { TriStateCheckbox, BulkActions, InputNumber, BackButton }
	}
</script>
 
 
<style lang="scss" scoped>
.true-icon, .false-icon {
	font-size: 1.2rem;
}
.true-icon {
	color: var(--green-700);
}
.false-icon {
	color: var(--red-600)
}
.filter-num {
	.select-num {
		:deep(.p-inputnumber-input) {
			width: 5rem;
			height: 2.5rem;
		}
	}
	.btn-black {
		width: auto;
		height: 2.5rem;
	}
}
:deep(.p-datatable-header) {
	background: var(--main-white);
	.btn-border {
		width: auto;
		height: 2.5rem;
	}
}
</style>