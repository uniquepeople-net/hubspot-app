<template>	
	<DataTable v-if="emails" :value="emails" :paginator="true" class="p-datatable-customers card" :rows="10" :loading="loading"
		dataKey="id" :rowHover="true" v-model:selection="selectedEmail" v-model:filters="filters" filterDisplay="menu" 
		paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" 
		:rowsPerPageOptions="[10,25,50,100]" currentPageReportTemplate="Showing {first} to {last} of {totalRecords} users"
		:globalFilterFields="['reply_name', 'reply_email', 'subject']" responsiveLayout="scroll">
		<template #header>
			<h5 class="mb-3">Emails</h5>			
			<div class="d-flex flex-column flex-sm-row justify-content-between align-items-center">
				<span class="p-input-icon-left mb-3 mb-sm-0">
					<i class="pi pi-search" />
					<InputText v-model="filters['global'].value" placeholder="Keyword Search" />
				</span>
				<Button type="button" icon="pi pi-filter-slash" label="Clear filters" class="p-button-outlined" @click="clearFilter()"/>
			</div>
		</template>

		<template #empty>
			No emails found.
		</template>

		<template #loading>			
			<ProgressSpinner strokeWidth="3"/>			
		</template>

		<Column selectionMode="multiple" headerStyle="width: 3rem"></Column>

		<Column headerStyle="width: 4rem; text-align: center" bodyStyle="text-align: center; overflow: visible">
			<template #body="{data}">
				<router-link :to="{name: 'specific-email', params: {email_id: data.id}}">
					<Button type="button" icon="pi pi-eye" class="p-button-rounded p-button-warning"></Button>
				</router-link> 
			</template>
		</Column>

		<Column field="reply_name" header="Name" sortable style="min-width: 14rem">
			<template #body="{data}">
				<p class="m-0" :class="!Boolean(data.is_opened) && 'fw-bold'">{{data.reply_name}}</p>
			</template>
			<template #filter="{filterModel}">
				<InputText type="text" v-model="filterModel.value" class="p-column-filter" placeholder="Search by name"/>
			</template>			
		</Column>
		
		<Column field="reply_email" header="Address" sortable style="min-width: 8rem">
			<template #body="{data}">
				<p class="m-0" :class="!Boolean(data.is_opened) && 'fw-bold'">{{data.reply_email}}</p>
			</template>
			<template #filter="{filterModel}">
				<InputText type="text" v-model="filterModel.value" class="p-column-filter" placeholder="Search by email"/>
			</template>
		</Column>

		<Column field="subject" header="Subject" sortable style="min-width: 8rem">
			<template #body="{data}">
				<p class="m-0" :class="!Boolean(data.is_opened) && 'fw-bold'">{{data.subject}}</p>
			</template>
			<template #filter="{filterModel}">
				<InputText type="text" v-model="filterModel.value" class="p-column-filter" placeholder="Search by email"/>
			</template>
		</Column>

		<Column field="created_at_formatted" header="Date" sortable dataType="date" style="min-width: 8rem">
			<template #body="{data}">
				{{data.created_at_formatted}}
			</template>
			<template #filter="{filterModel}">
				<Calendar v-model="filterModel.value" dateFormat="dd/mm/yy" placeholder="dd/mm/yyyy" />
			</template>
		</Column>

		
	</DataTable>
</template>
 
 
<script>
	import { FilterMatchMode, FilterOperator } from 'primevue/api';
	import { mapGetters } from 'vuex';
	import TriStateCheckbox from 'primevue/tristatecheckbox';
	import Calendar from 'primevue/calendar';

	export default {
		created() {
			let userId = this.$store.getters['user/user'].id
			this.$store.dispatch("emails/getEmails", userId);
			this.initFilters();
			this.loading = true			
		},
		data() {
			return {
				selectedEmail: null,
				filters: null,
				loading: false,
				userData: []
			}
		},
		methods: {
			clearFilter() {
				this.initFilters();
			},
			initFilters() {
				this.filters = {
					'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
					'reply_name': {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},
					'reply_email': {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},
					'subject': {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},
					'created_at_formatted': {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.DATE_IS}]},
					//'fee': {value: null, matchMode: FilterMatchMode.EQUALS},
				}
			}
		},
		computed: {
			...mapGetters({ emails: 'emails/emails' }),
		},
		watch: {
			emails: function (data) {
				this.userData = data
				this.loading = false
			},
		},
		components: { TriStateCheckbox, Calendar }
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
</style>