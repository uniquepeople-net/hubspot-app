<template>
	<Dialog v-model:visible="showMessage" :breakpoints="{ '960px': '80vw' }" :style="{ width: '30vw' }" position="top">
		<div class="flex align-items-center flex-column pt-6 px-3">
			<i v-if="response.message" class="pi pi-check-circle" :style="{fontSize: '4rem', color: 'var(--green-400)' }"></i>
			<i v-if="response.error" class="pi pi-times-circle" :style="{fontSize: '4rem', color: 'var(--red-400)' }"></i>
			<h5 v-if="response.message" class="mt-3">{{ response.message }}</h5>
			<h6 v-if="response.error" v-for="(error, index) in response.error" class="mt-3">{{ index + ': ' + error[0] }}</h6>
		</div>
		<template #footer>
			<div class="flex justify-content-center">
				<Button label="OK" @click="toggleDialog" class="p-button-text" />
			</div>
		</template>
    </Dialog>

	<div class="row">
		<div class="col-12 col-md-6 col-xl-4">
			<Card class="card">
				<template #title>
					<h5 class="card-header">Groups</h5>
				</template>
				<template #content>
					<MultiSelect v-model="selectedGroups" :options="groupsToDeatch(users)" class="multi-select" 
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
					<Listbox :options="users" :optionLabel="labelTemplate" style="width:100%" listStyle="max-height:300px"/>
					<div class="mt-3">
						<Button label="Detach" icon="bi bi-tags" class="p-button-raised p-button-success" 
						        @click="submitAssign" :disabled="loading"/>
						<div v-if="loading" class="spinner-grow position-absolute" role="status"></div>
					</div>

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
				showMessage: false,
				response: null,
				loading: false,
			}
		},
		methods: {
			submitAssign() {
				let data = {
					users: this.users,
					groups: this.selectedGroups
				}

				if ( this.selectedGroups && this.users ) {
					this.loading = true
					axios.post( this.detachGroupsUrl, data, {
							headers: {
								Authorization: 'Bearer ' + User.getToken()
							}
						}).then( response => {
							this.loading = false
							this.response = response.data
							this.toggleDialog()							
						}).catch( error => {
							this.loading = false
							Toast.fire({
								icon: 'error',
								timer: 5000,
								title: "Unable to detach group(s)"
							})
						})
				} else {
					Toast.fire({
						icon: 'error',
						timer: 5000,
						title: "Groups or users are empty"
					})
				}
			},
			toggleDialog() {
				this.showMessage = !this.showMessage;
        	},
			groupsToDeatch(users) {
				let userGroups = []
				users && users.map( user => {
					user.groups.map( group => {
						let existsItem = userGroups.some( g => g.name === group.name )
						if ( !existsItem ) {
							userGroups.push({...group})
						}
					})
				})
				return userGroups
			},
			labelTemplate(data) {
				let groups = data.groups.map( g => g.name )
				return data ? data.name + ' ' + data.surname + ' - ( ' + groups + ' )' : ''
			},
		},
		computed: {
			...mapGetters({ users: 'appData/getUsers',
							detachGroupsUrl: 'links/detachGroups' })
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