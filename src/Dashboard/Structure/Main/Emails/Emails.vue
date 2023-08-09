<template>
	<div>
		<BackButton :title="$t('message.Emails')" class="mb-4" route="my-board"/>
		<router-view :key="$route.fullPath" v-if="emails" :emails="emails"></router-view>
		<LoadingIcon v-if="!emails"/>
	</div>
</template>
 
 
<script>
	import { mapGetters } from 'vuex';
	import BackButton from '../../../global/BackButton.vue';

	export default {
		created() {
			let userId = this.$store.getters['user/user'].id
			this.$store.dispatch("emails/getEmails", userId);
		},
		computed: {
			...mapGetters({ emails: 'emails/emails' }),
		},
		components: { BackButton },
	}
</script>
 
 
<style lang='scss' scoped>
</style>