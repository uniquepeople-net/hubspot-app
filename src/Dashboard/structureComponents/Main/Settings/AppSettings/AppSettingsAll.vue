<template>
	<div>
		<EmailsSettings />
		<BoardSettings class="mt-4"/>
		<FAQSettings class="mt-4"/>
	</div>
</template>
 
 
<script>
	import BoardSettings from './Board/BoardSettings.vue'
	import EmailsSettings from './Emails/EmailsSettings.vue'
	import FAQSettings from './FAQ/FAQSettings.vue'

	export default {
		data() {
			return {
				}
		},
		methods: {
			
		},
		components: { EmailsSettings, BoardSettings, FAQSettings },
	}
</script>
 
 
<style lang='scss' scoped>
</style>