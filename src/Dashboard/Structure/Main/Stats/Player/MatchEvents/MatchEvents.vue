<template>
	<div>
		<h5 class="text-value">{{ $t('message.MatchEvents') }}</h5>
		<TabView>
			<TabPanel v-for="stat in stats" :header="stat.title">

				<component v-if="stat.data" :is="stat.component" :data="stat.data" :match="matchData"/>
				<LoadingIcon v-if="!stat.data" :title="stat.title.toLowerCase()" />

			</TabPanel>				
		</TabView>
		<Divider class="divider-light mt-1"/>
	</div>
</template>
 
 
<script>
	import { mapGetters } from 'vuex';
	import TabView from 'primevue/tabview';
	import TabPanel from 'primevue/tabpanel';
	import LoadingIcon from '../../../../../global/LoadingIcon.vue';
	import PassesEvents from './PassesEvents.vue';
	import ShotEvents from './ShotEvents.vue';
	import CooperationEvents from './CooperationEvents.vue';

	export default {
		props: {
			matchId: Number, 
			playerId: Number,
			matchData: Object
		},
		created() {
			this.$store.dispatch('stats/getPlayerEvent', { matchId: this.matchId, playerId: this.playerId, primary: 'pass' })
			this.$store.dispatch('stats/getPlayerEvent', { matchId: this.matchId, playerId: this.playerId, primary: 'shot' })
		},
		data() {
			return {	
			}
		},
		methods: {
 
		},
		computed: {
			...mapGetters({ passes: "stats/playerPasses",
							shots: "stats/playerShots" }),
			stats() {
				return [
					{ title: this.$i18n.t('message.Passes').toUpperCase(), component: PassesEvents, data: this.passes },
					{ title: this.$i18n.t('message.Cooperation').toUpperCase(), component: CooperationEvents, data: this.passes },
					{ title: this.$i18n.t('message.Shots').toUpperCase(), component: ShotEvents, data: this.shots },
				]
			},

		},
		components: { TabView, TabPanel, PassesEvents, LoadingIcon, ShotEvents, CooperationEvents }
	}
</script>
 
 
<style lang='scss' scoped>
</style>