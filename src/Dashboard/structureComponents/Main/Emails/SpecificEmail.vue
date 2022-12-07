<template>
	<div>specific email {{ emailId }}</div>
</template>
 
 
<script>
	export default {
		created() {
			let emailId = parseInt(this.$route.params.email_id)

			this.$store.dispatch("emails/setSpecificEmail", emailId );
			
			let specificEmail = this.$store.getters['emails/specificEmail'];

			let recipientId = specificEmail[0].recipients[0].id
			
			this.$store.dispatch("emails/getSpecificEmail", { recipientId: recipientId, emailId: emailId });
		},
		data() {
			return {
				//emailId: this.$route.params.email_id			
			}
		},
		methods: {
 
		},
		computed: {
			emailId() {
				return this.$route.params.email_id
			}, 
			
		} 
	}
</script>
 
 
<style lang='scss' scoped>
</style>