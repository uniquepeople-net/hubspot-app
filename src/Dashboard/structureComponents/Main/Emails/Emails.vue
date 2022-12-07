<template>
	<router-view :key="$route.fullPath" v-if="emails"></router-view>
</template>
 
 
<script>
	import { mapGetters } from 'vuex';

	export default {
		created() {
			let userId = this.$store.getters['user/user'].id
			this.$store.dispatch("emails/getEmails", userId);
		},
		computed: {
			...mapGetters({ emails: 'emails/emails' }),
		},
	}
</script>
 
 
<style lang='scss' scoped>
</style>