<template>
	<div>
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
				<div v-html="formatEmailBody(email.body)"></div>
			</template>
		</Card>  

		<LoadingIcon v-if="!email"/>
	</div>
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
		methods: {
			formatEmailBody(body) {
				if ( this.email.dynamic && this.email.dynamic.length ) {
					this.email.dynamic.map( d => {
						body = body.replace(new RegExp(d.value, 'g'), this.user[d.name] )
						
					})
					return body
				} else return body
			}
		},
		computed: {
			...mapGetters({ specificEmail: 'emails/specificEmail',
							user: 'user/user' }),
			email() {
				return this.specificEmail[0]
			}
		} 
	}
</script>
 
 
<style lang='scss' scoped>
.spec-email {
	max-width: 1400px;
	margin: auto;
}
.subhead {
	font-weight: 300;
}
</style>