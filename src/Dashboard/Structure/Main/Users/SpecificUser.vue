<template>	
	<div class="row gy-3 mt-3">
		<BackButton :title="$t('message.user')" :route="'all-users'" class="mb-4"/>

		<div class="col-12 col-xl-5">
			<PersonalCard v-if="instatTeam"
						  :user="specificUser"/>

			<ChangePasswordCard />
		</div>
		<div class="col-12 col-xl-7">
			<DataCard v-if="specificUser" :userData="specificUser" 
					  :userUrl="specificUserUrl" :admin="true" :myProfile="false"/>
		</div>

		<div class="col-12 col-xl-6 col-xxl-4">
			
		</div>
	</div>
</template>
 
 
<script>
	import { mapGetters } from 'vuex'; 
	import DataCard from './DataCard.vue';
	import PersonalCard from './PersonalCard.vue';
	import ChangePasswordCard from './ChangePasswordCard.vue';
	import BackButton from '../../../global/BackButton.vue';

	export default {
		created() {
			this.$store.dispatch("specificUser/getSpecificUser", this.id);
		},
		data() {
			return {
				id: this.$route.params.user_id
			}
		},
		computed: {
			...mapGetters({ specificUser: 'specificUser/user',
							specificUserUrl: 'links/specificUser', 
							instatUser: 'specificUser/instatUser',
							instatTeam: 'specificUser/instatTeam' }),
		},
		components: { PersonalCard, DataCard, ChangePasswordCard, BackButton  },
	}
</script>
 

<style lang='scss' scoped>
</style>