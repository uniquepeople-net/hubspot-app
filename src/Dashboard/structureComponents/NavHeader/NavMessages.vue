<template>
	<li class="nav-item dropdown me-1">
		<a class="nav-link active dropdown-toggle text-gray-600 position-relative" href="#" data-bs-toggle="dropdown" aria-expanded="false" @click="toggle" aria-haspopup="true" aria-controls="overlay_menu">
			<i class="bi bi-envelope bi-sub fs-4"></i>
			<Badge v-if="unreadEmailsCount > 0" :value="unreadEmailsCount" severity="info" class="position-absolute top-0 start-0"/>
		</a>
	</li>
	<Menu id="overlay_menu" ref="menu" :model="items" :popup="true" class="mt-2 p-0">
		<template #item>			
			<h5 class="email-title mb-0">Emails</h5>		
			<div class="email-menu mx-0 my-2">
				<ul v-if="unreadEmails">
					<li v-for="(email, key) in unreadEmails" class="spec-email">{{ email.reply_name }}</li>
				</ul>
				<div v-if="!unreadEmails.length" class="no-emails">No new emails</div>
			</div>
		
			<router-link to="/emails/inbox">
				<div class="email-footer">
					<h6 class="mb-0">Inbox</h6>
				</div>
			</router-link>			
		</template>
	</Menu>
</template>
 
 
<script>
	import { mapGetters } from 'vuex';

	export default {
		data() {
			return {	                   
				items: [
					{ label: 'No New Emails' },
				]
			}
		},
		methods: {
			toggle(event) {
				this.$refs.menu.toggle(event);
			},
		},
		computed: {
			...mapGetters({ emails: 'emails/emails',
							unreadEmails: 'emails/unreadEmails',
							unreadEmailsCount: 'emails/unreadEmailsCount' }),
		},
	}
</script>
 
 
<style lang='scss' scoped>
.email-title, .email-footer {
	padding: 0.75rem 1rem;
	background: #dee2e6;
}
.email-menu {
	padding: 0 1rem;
	.no-emails {
		margin: 1rem 0
	}
	.spec-email {
		line-height: 2rem;
	}
}
</style>