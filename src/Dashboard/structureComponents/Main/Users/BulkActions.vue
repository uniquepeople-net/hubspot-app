<template>
	<div class="d-flex justify-content-between justify-content-sm-start mb-4 mb-sm-0">
		<Dropdown v-model="selectedAction" :options="actions" optionLabel="name" placeholder="Select an Action" />
		<Button v-if="selectedAction" :label="selectedAction.name" :icon="selectedAction.icon" 
				class="p-button-raised p-button-success ms-3" @click="commitAction"/>
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
					{ name: 'Send Email', code: 'email', icon: 'bi bi-envelope' }
				]
			}
		},
		methods: {
			commitAction() {
				let emailsArr = [] 
				toRaw(this.selected).map( sel => emailsArr.push(sel.email))

				//console.log(emailsArr);

				this.$router.push({ name: 'send-emails', params: { emails: 'hey'  } })
			}
		},
	}
</script>
 
 
<style lang='scss' scoped>
</style>