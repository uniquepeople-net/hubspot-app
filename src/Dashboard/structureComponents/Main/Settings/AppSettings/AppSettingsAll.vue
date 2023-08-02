<template>
	<div>
		<EmailsSettings />
		<BoardSettings class="mt-5"/>
		<FAQSettings class="mt-5"/>
		<Top11Settings class="mt-5"/>
	</div>
</template>
 
 
<script>
	import BoardSettings from './Board/BoardSettings.vue'
	import EmailsSettings from './Emails/EmailsSettings.vue'
	import FAQSettings from './FAQ/FAQSettings.vue'
	import Top11Settings from './Top11/Top11Settings.vue'

	export default {
		data() {
			return {
				}
		},
		methods: {
			
		},
		components: { EmailsSettings, BoardSettings, FAQSettings, Top11Settings },
	}
</script>
 
 
<style lang='scss' scoped>
</style>