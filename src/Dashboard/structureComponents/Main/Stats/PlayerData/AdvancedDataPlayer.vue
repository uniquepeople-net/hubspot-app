<template>
	<TabView class="tab-view">
		<TabPanel :header="$t('message.PERSONAL')">
			<AdvancedPlayerStats v-if="playerStats" :stats="playerStats"/>
		</TabPanel>
		<TabPanel :header="$t('message.TEAM')">
		</TabPanel>
		<TabPanel header="VIDEO">
			
		</TabPanel>
	</TabView>
</template>
 
 
<script>
	import { mapGetters } from 'vuex'
	import TabView from 'primevue/tabview'
	import TabPanel from 'primevue/tabpanel'
	import AdvancedPlayerStats from './AdvancedPlayerStats.vue'

	export default {
		props: ['id'],
		mounted() {
			//this.$store.dispatch("stats/getMatchStats", this.id )
			//this.$store.dispatch("stats/getMatchVideo", this.id )
		},
		data() {
			return {
			}
		},
		/* watch: {
			id: function (data) {
				this.$store.dispatch("stats/getMatchStats", this.id )
				//this.$store.dispatch("stats/getMatchVideo", this.id )
			},
		}, */
		computed: {
			...mapGetters({ playerStats: 'stats/playerStats' })
		},
		components: { TabView, TabPanel, AdvancedPlayerStats }
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