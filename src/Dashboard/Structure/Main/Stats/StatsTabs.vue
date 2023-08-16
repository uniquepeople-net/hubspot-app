<template>
	<div class="stats-tabs ufp-tabs">
		<TabView>
			<TabPanel :header="$t('message.PLAYER')">
					
				<PlayerStats />
				
			</TabPanel>		
			<TabPanel :header="$t('message.TEAM')">
					
				<MatchStats />
				
			</TabPanel>		
		</TabView>
	</div>
</template>
 
 
<script>
	import { mapGetters } from 'vuex';
	import TabView from 'primevue/tabview';
	import TabPanel from 'primevue/tabpanel';
	import PlayerStats from './PlayerStats/PlayerStats.vue';
	import MatchStats from './MatchStats/MatchStats.vue'
	

	export default {
		data() {
			return {
			}
		},
		methods: {
 
		},
		computed: {
			...mapGetters({ user: 'user/user',
							match: 'stats/matchDetails',
							matches: 'stats/playerMatches',
							seasons: 'stats/playerCareer' }),
		},
		components: { TabView, TabPanel, PlayerStats, MatchStats }
	}
</script>
 
 
<style lang='scss' scoped>
.stats-tabs {
	max-width: 768px;
	margin: auto;
	:deep(.p-tabview-panels) {
		padding-left: 0;
		padding-right: 0;
	}
}
</style>