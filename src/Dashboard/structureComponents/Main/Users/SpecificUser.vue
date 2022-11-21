<template>	
	<div class="row gy-3 mt-3">
		<div class="col-12 col-xl-6 col-xxl-4">
			<PersonalCard v-if="instatTeam" :photo="instatUser.photo" :firstname="instatUser.firstname" :lastname="instatUser.lastname" 
						  :position="instatUser.position1_name" :teamname="instatTeam.name" :teamphoto="instatTeam.photo"/>
		</div>
		<div class="col-12 col-xl-6 col-xxl-4">
			<DataCard v-if="specificUser" :userData="specificUser" 
					  :userUrl="specificUserUrl" :delete="true"/>
		</div>

		<div class="col-12 col-xl-6 col-xxl-4">
			<ChangePasswordCard />
		</div>
	</div>
</template>
 
 
<script>
	import { mapGetters } from 'vuex'; 
	import DataCard from './DataCard.vue';
	import PersonalCard from './PersonalCard.vue';
	import ChangePasswordCard from './ChangePasswordCard.vue';

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
		components: { PersonalCard, DataCard, ChangePasswordCard },
	}
</script>
 
 
<style lang='scss' scoped>
</style>