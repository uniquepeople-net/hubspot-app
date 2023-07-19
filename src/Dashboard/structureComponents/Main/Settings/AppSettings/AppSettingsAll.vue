<template>
	<div>
		<EmailsSettings />
		<BoardSettings class="mt-4"/>
	</div>
</template>
 
 
<script>
	import BoardSettings from './Board/BoardSettings.vue'
	import EmailsSettings from './Emails/EmailsSettings.vue'

	export default {
		data() {
			return {
				}
		},
		methods: {
			
		},
		components: { EmailsSettings, BoardSettings },
	}
</script>
 
 
<style lang='scss' scoped>
</style>