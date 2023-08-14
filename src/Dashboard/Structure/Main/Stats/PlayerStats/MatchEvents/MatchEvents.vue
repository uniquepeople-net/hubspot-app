<template>
	<div>
		<h5 class="text-value">{{ $t('message.MatchEvents') }}</h5>
		<TabView>
			<TabPanel v-for="stat in stats" :header="stat.title">

					<div class="text-center">
						<Pitch />
					</div>
				
			</TabPanel>				
		</TabView>
		<Divider class="divider-light mt-1"/>
	</div>
</template>
 
 
<script>
	import TabView from 'primevue/tabview';
	import TabPanel from 'primevue/tabpanel';
import Pitch from '../../Vectors/Pitch.vue';

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
		components: { TabView, TabPanel, Pitch }
	}
</script>
 
 
<style lang='scss' scoped>
</style>