<template>
	<div>
		<BackButton :title="$t('message.Emails')" class="mb-4" route="inbox"/>
		<Card v-if="email" class="card spec-email">
			<template #title>
				<div class="p-0">
					<h5 class="text-data-bold"><span class="subhead text-link">Subject:</span> {{email.subject}}</h5>
					<h5 class="text-data-bold"><span class="subhead text-link">From:</span> {{email.reply_name}}</h5>
					<h5 class="text-data-bold"><span class="subhead text-link">From (email):</span> {{email.reply_email}}</h5>
					<h5 class="text-data-bold"><span class="subhead text-link">Date:</span> {{email.created_at_formatted}}</h5>
				</div>
				<Divider />
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
	import BackButton from '../../../global/BackButton.vue';

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
		},
		components: { BackButton } 
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