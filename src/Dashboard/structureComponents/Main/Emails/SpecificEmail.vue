<template>
	<Card v-if="email" class="card spec-email">
		<template #title>
			<div class="card-header">
				<h5><span class="subhead">Subject:</span> {{email.subject}}</h5>
				<h5><span class="subhead">From:</span> {{email.reply_name}}</h5>
				<h5><span class="subhead">From (email):</span> {{email.reply_email}}</h5>
				<h6><span class="subhead">Date:</span> {{email.created_at_formatted}}</h6>
			</div>
		</template>
		<template #content>
			<div v-html="email.body"></div>
		</template>
		<div>specific email {{ emailId }}</div>
	</Card>
</template>
 
 
<script>
	import { mapGetters } from 'vuex';

	export default {
		created() {
			let emailId = parseInt(this.$route.params.email_id)

			this.$store.dispatch("emails/setSpecificEmail", emailId );
			
			let specificEmail = this.$store.getters['emails/specificEmail'];

			let recipientId = specificEmail[0].recipients[0].id
			
			this.$store.dispatch("emails/getSpecificEmail", { recipientId: recipientId, emailId: emailId });
		},
		computed: {
			...mapGetters({ specificEmail: 'emails/specificEmail' }),
			emailId() {
				return this.$route.params.email_id
			},
			email() {
				return this.specificEmail[0]
			}
		} 
	}
</script>
 
 
<style lang='scss' scoped>
.spec-email {
	max-width: 1200px;
}
.subhead {
	font-weight: 300;
}
</style>