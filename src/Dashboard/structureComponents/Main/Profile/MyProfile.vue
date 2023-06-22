<template>

	<h2>{{ $t('message.Profile') }}</h2>

	<div class="row gy-3 mt-3">
		
		<div class="col-12 col-xl-6 col-xxl-4">
			<DataCard :userData="user" :userUrl="profileUser" :myProfile="true"/>
		</div>

		<div class="col-12 col-xl-6 col-xxl-4">
			<ChangePasswordCard :userId="user.id"/>
		</div>

		<div class="col-12 col-xl-6 col-xxl-4">
			<Card class="card">
				<template #title>
					<div class="card-header"><h5>{{ $t('message.Change') + ' ' + $t('message.Language') }}</h5></div>
				</template>
				<template #content>
					<NavLang />
				</template>
			</Card>
		</div>
		
	</div>
	
</template>
 
 
<script>
	import { mapGetters } from 'vuex'; 
	import NavLang from '../../NavHeader/NavLang.vue';
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
		components: { DataCard, ChangePasswordCard, NavLang }
	}
</script>
 
 
<style lang='scss' scoped>
</style>