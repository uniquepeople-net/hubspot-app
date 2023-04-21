<template>
	<TabView class="tab-view">
		<TabPanel header="LINEUPS">
			<LineUps :matchId="id"/>
		</TabPanel>
		<TabPanel header="STATS">
			<AdvancedMatchStats v-if="stats" :stats="stats"/>
		</TabPanel>
		<TabPanel header="VIDEO">
			
		</TabPanel>
	</TabView>
</template>
 
 
<script>
	import { mapGetters } from 'vuex'
	import TabView from 'primevue/tabview'
	import TabPanel from 'primevue/tabpanel'
	import LineUps from './LineUps.vue'
	import AdvancedMatchStats from './AdvancedMatchStats.vue'

	export default {
		props: ['id'],
		mounted() {
			this.$store.dispatch("stats/getMatchStats", this.id )
			//this.$store.dispatch("stats/getMatchVideo", this.id )
		},
		data() {
			return {
			}
		},
		watch: {
			id: function (data) {
				this.$store.dispatch("stats/getMatchStats", this.id )
				//this.$store.dispatch("stats/getMatchVideo", this.id )
			},
		},
		computed: {
			...mapGetters({ stats: 'stats/matchStats' })
		},
		components: { TabView, TabPanel, LineUps, AdvancedMatchStats }
	}
</script>
 
 
<style lang='scss' scoped>
.tab-view {
	:deep(.p-tabview-panels) {
		padding-left: 0;
		padding-right: 0;
	}
}
</style>