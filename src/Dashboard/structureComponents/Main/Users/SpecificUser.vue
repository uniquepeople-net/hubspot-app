<template>	
	<div class="row">
		<div class="col-12 col-md-6 mt-3">
			<PersonalCard v-if="instatTeam" :photo="instatUser.photo" :firstname="instatUser.firstname" :lastname="instatUser.lastname" 
						  :position="instatUser.position1_name" :teamname="instatTeam.name" :teamphoto="instatTeam.photo"/>
			
		</div>
	</div>
</template>
 
 
<script>
	import { mapGetters } from 'vuex'; 
	import PersonalCard from './PersonalCard.vue';

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
							instatUser: 'specificUser/instatUser',
							instatTeam: 'specificUser/instatTeam' }),
		},
		components: { PersonalCard },
	}
</script>
 
 
<style lang='scss' scoped>
</style>