<template>
	<div>
		<router-view v-if="isTrial"></router-view>
		<BlockedPage v-if="!isTrial"/>
	</div>
</template>
 
 
<script>
	import { mapGetters } from 'vuex';
	import BlockedPage from '../../../global/BlockedPage.vue'

	export default {
		computed: {
			...mapGetters({ user: 'user/user' }),
			isTrial() {
				return Helpers.isTrial(this.user.trial_date, this.user.fee, this.user.fee_finish_date)
			}
		},
		components: { BlockedPage }
	}
</script>
 
 
<style lang='scss' scoped>

</style>