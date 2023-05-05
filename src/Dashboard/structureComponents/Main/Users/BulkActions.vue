<template>
	<div class="mb-4 mb-sm-0">
		<div class="d-flex justify-content-between justify-content-sm-start">
			<Dropdown v-model="selectedAction" :options="actions" optionLabel="name" placeholder="Select an Action" />
			<Button v-if="selectedAction" :label="selectedAction.name" :icon="selectedAction.icon" 
					class="p-button-raised p-button-success ms-3" @click="commitAction(selectedAction.route)"
					:disabled="selectedAction && (!selected || selected.length === 0)"/>
		</div>
		<small class="error" v-if="selectedAction && (!selected || selected.length === 0)">No users chosen</small>
	</div>
</template>
 
 
<script>
	import { mapGetters } from 'vuex'
	import { toRaw  } from 'vue'

	export default {
		props: {
			selected: Array
		},
		data() {
			return {
				selectedAction: null,
				actions: [
					{ name: 'Send Email', code: 'email', icon: 'bi bi-envelope', route: 'send-emails' },
					{ name: 'Assign Group', code: 'a-group', icon: 'bi bi-tags', route: 'assign-group' },
					{ name: 'Detach Group', code: 'd-group', icon: 'bi bi-x-circle', route: 'detach-group' },
				]
			}
		},
		methods: {
			commitAction(route) {
				let users = [] 
	
				if ( this.selected ) {
					toRaw(this.selected).map( sel => {
						let findedUser = this.usersAll.find( i => i.id === sel.id ) 
						users.push(findedUser)
					})
					this.$store.dispatch("appData/setChoosedUsers", users);
					this.$router.push({ name: route })
				}
			}
		},
		computed: {
			...mapGetters({ usersAll: 'users/getUsers' })
		}
	}
</script>
 
 
<style lang='scss' scoped>
.error {
	color: var(--red-600);
}
</style>