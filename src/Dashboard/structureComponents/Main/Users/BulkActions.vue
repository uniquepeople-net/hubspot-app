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
					{ name: 'Assign Group', code: 'group', icon: 'bi bi-tags', route: 'assign-group' }
				]
			}
		},
		methods: {
			commitAction(route) {
				let users = [] 
	
				if ( this.selected ) {
					toRaw(this.selected).map( sel => users.push(sel))
					this.$store.dispatch("appData/setChoosedUsers", users);
					this.$router.push({ name: route })
				}
			}
		},
	}
</script>
 
 
<style lang='scss' scoped>
.error {
	color: var(--red-600);
}
</style>