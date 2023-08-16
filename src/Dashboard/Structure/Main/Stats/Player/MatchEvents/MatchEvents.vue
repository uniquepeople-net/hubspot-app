<template>
	<div>
		<h5 class="text-value">{{ $t('message.MatchEvents') }}</h5>
		<TabView>
			<TabPanel v-for="stat in stats" :header="stat.title">

				<Pitch class="mb-4"/>
				
				<PassDetails name="Gresko" time="32:44"/>
					

			</TabPanel>				
		</TabView>
		<Divider class="divider-light mt-1"/>
	</div>
</template>
 
 
<script>
	import TabView from 'primevue/tabview';
	import TabPanel from 'primevue/tabpanel';
	import Pitch from './Pitch.vue';
	import PassDetails from './PassDetails.vue';
	import Accordion from 'primevue/accordion';
	import AccordionTab from 'primevue/accordiontab';

	export default {
		data() {
			return {
				stats: [
					{ title: this.$i18n.t('message.PASSES'),  },
				]
			}
		},
		methods: {
 
		},
		components: { TabView, TabPanel, Pitch, PassDetails, Accordion, AccordionTab }
	}
</script>
 
 
<style lang='scss' scoped>
</style>