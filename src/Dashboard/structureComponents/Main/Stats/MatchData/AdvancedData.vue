<template>
	<TabView class="tab-view">
		<TabPanel header="LINEUPS">
			<LineUps :matchId="id"/>
		</TabPanel>
		<TabPanel header="STATS">
			
		</TabPanel>
		<TabPanel header="VIDEO">
			<p>
				Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim
				ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi.
			</p>
		</TabPanel>
	</TabView>
</template>
 
 
<script>
	import TabView from 'primevue/tabview'
	import TabPanel from 'primevue/tabpanel'
	import LineUps from './LineUps.vue'

	export default {
		props: ['id'],
		mounted() {
			this.$store.dispatch("stats/getMatchVideo", this.id )
		},
		data() {
			return {
			}
		},
		watch: {
			id: function (data) {
				this.$store.dispatch("stats/getMatchVideo", this.id )
			},
		},
		components: { TabView, TabPanel, LineUps }
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