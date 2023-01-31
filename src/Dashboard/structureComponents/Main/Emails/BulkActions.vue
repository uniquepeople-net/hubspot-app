<template>
	<div class="mb-4 mb-sm-0">
		<div class="d-flex justify-content-between justify-content-sm-start">
			<Dropdown v-model="selectedAction" :options="actions" optionLabel="name" placeholder="Select an Action" />
			<Button v-if="selectedAction" :label="selectedAction.name" :icon="selectedAction.icon" 
					class="p-button-raised p-button-danger ms-3" @click="commitAction(selectedAction.route)"
					:disabled="selectedAction && (!selected || selected.length === 0)"/>
		</div>
		<small class="error" v-if="selectedAction && (!selected || selected.length === 0)">No emails chosen</small>
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
					{ name: 'Delete Emails', code: 'delete', icon: 'bi bi-trash', route: 'delete-emails' },
				]
			}
		},
		methods: {
			commitAction(route) {
				let emails = []
				let recipients = [] 
	
				if ( this.selected ) {
					toRaw(this.selected).map( sel => emails.push(sel.id))
					toRaw(this.selected).map( sel => recipients.push(sel.recipients[0].id))

					let data = {
						emails: emails,
						recipients: recipients,
						userId: [this.user.id]
					}

					console.log(data)
					

					axios.post( this.deleteEmailsUrl, data, {
							headers: {
								Authorization: 'Bearer ' + User.getToken()
							}
						}).then( response => {
							this.$store.dispatch("emails/getEmails", this.user.id);
							this.$emit('resetSelected', null);
						})
				}
			}
		},
		computed: {
			...mapGetters({ deleteEmailsUrl: 'links/deleteEmails',
							user: 'user/user' })
		}
	}
</script>
 
 
<style lang='scss' scoped>
.error {
	color: var(--red-600);
}
</style>