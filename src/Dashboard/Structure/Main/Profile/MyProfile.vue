<template>

	<h2>{{ $t('message.Profile') }}</h2>

	<div class="row gy-3 mt-3">
		
		<div class="col-12 col-xl-6 col-xxl-4">
			<DataCard :userData="user" :userUrl="profileUser" :myProfile="true"/>
		</div>

		<div class="col-12 col-xl-6 col-xxl-4">
			<ChangePasswordCard :userId="user.id"/>
		</div>
		
	</div>
	
</template>
 
 
<script>
	import { mapGetters } from 'vuex'; 
	import ChangePasswordCard from '../Users/ChangePasswordCard.vue';
	import DataCard from '../Users/DataCard.vue';

	export default {
		data() {
			return {
			}
		},
		methods: {
 
		},
		computed: {
			...mapGetters({ user: 'user/user',
							profileUser: 'links/profileUser' }),
		},
		components: { DataCard, ChangePasswordCard }
	}
</script>
 
 
<style lang='scss' scoped>
</style>