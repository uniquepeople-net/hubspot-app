<template>
	<li class="nav-item dropdown me-3">
		<a class="nav-link active text-gray-600 position-relative" href="#" data-bs-toggle="dropdown" aria-expanded="false" @click="toggle" aria-haspopup="false" aria-controls="overlay_menu">
			<i class="bi bi-envelope bi-sub fs-4"></i>
			<Badge v-if="unreadEmailsCount > 0" :value="unreadEmailsCount" class="position-absolute nav-message-badge center-center"/>
		</a>
	</li>
	<Menu id="overlay_menu" ref="menu" :model="items" :popup="true" class="mt-2 p-0 over_menu">
		<template #item>					
			<div class="email-menu mx-0 my-2">
				<ul v-if="unreadEmails">
					<router-link v-for="(email, key) in unreadEmails" :to="{name: 'specific-email', params: {email_id: email.id}}">
						<li class="spec-email fw-bold">{{ email.reply_name }}</li>
					</router-link>
				</ul>
				<div v-if="!unreadEmails.length" class="no-emails">{{ $t('message.Nonewemails') }}</div>
			</div>
		</template>
		
		<Divider  class="mb-0"/>

		<template #end>
			<router-link :to="{name: 'inbox'}">
				<div class="email-footer">
					<h6 class="mb-0 fw-light">{{ $t('message.Inbox') }}</h6>
				</div>
			</router-link>
		</template>			
	</Menu>
</template>
 
 
<script>
	import { mapGetters } from 'vuex';
	import Divider from 'primevue/divider';

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
		components: { Divider }
	}
</script>
 
 
<style lang='scss' scoped>
.email-title, .email-footer {
	padding: 0.75rem 1rem;
}
.nav-message-badge {
	min-width: 12px;
	max-width: 14px;
	//height: 12px;
	height: 12px;
	font-size: 7px;
	background: var(--red-600);
	top: 10px;
	right: 2px;
	line-height: 12px;
}
.email-menu {
	background: var(--surface-0);
	padding: 0 1rem;
	.no-emails {
		margin: 1rem 0
	}
	.spec-email {
		line-height: 2rem;
	}
}
</style>