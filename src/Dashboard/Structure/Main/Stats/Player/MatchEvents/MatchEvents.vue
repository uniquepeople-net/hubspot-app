<template>
	<div>
		<h5 class="text-value">{{ $t('message.MatchEvents') }}</h5>
		<TabView scrollable>
			<TabPanel v-for="stat in stats" :header="stat.title">

				<component :is="stat.component" :match="matchData" :title="stat.title.toLowerCase()"
							:playerId="playerId" :matchId="matchId" :primaryParam="stat.primaryParam"/>


			</TabPanel>				
		</TabView>
		<Divider class="divider-light mt-1"/>
	</div>
</template>
 
 
<script>
	import TabView from 'primevue/tabview';
	import TabPanel from 'primevue/tabpanel';
	import PassesEvents from './PassesEvents.vue';
	import ShotEvents from './ShotEvents.vue';
	import CooperationEvents from './CooperationEvents.vue';
	import DuelsEvents from './DuelsEvents.vue';

	export default {
		props: {
			matchId: Number, 
			playerId: Number,
			matchData: Object
		},
		data() {
			return {	
			}
		},
		methods: {
 
		},
		computed: {
			stats() {
				return [
					{ title: this.$i18n.t('message.Passes').toUpperCase(), component: PassesEvents, primaryParam: 'pass' },
					{ title: this.$i18n.t('message.Cooperation').toUpperCase(), component: CooperationEvents, primaryParam: 'pass' },
					{ title: this.$i18n.t('message.Shots').toUpperCase(), component: ShotEvents, primaryParam: 'shot' },
					{ title: this.$i18n.t('message.Duels').toUpperCase(), component: DuelsEvents, primaryParam: 'duel' }
				]
				
			},

		},
		components: { TabView, TabPanel, PassesEvents, ShotEvents, CooperationEvents, DuelsEvents }
	}
</script>
 
 
<style lang='scss' scoped>
</style>