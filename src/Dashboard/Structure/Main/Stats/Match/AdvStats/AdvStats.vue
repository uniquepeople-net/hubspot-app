<template>
	<div class="mt-5">
		<h5 class="text-value">{{ $t('message.MatchStats') }}</h5>

		<TabView>
			<TabPanel v-for="stat in stats" :header="stat.title">
				<component :is="stat.component"/>
			</TabPanel>				
		</TabView>

		<Divider class="divider-light mt-1"/>

	</div>
</template>
 
 
<script>
	import TabView from 'primevue/tabview';
	import TabPanel from 'primevue/tabpanel';
	import General from './General.vue'

	export default {
		data() {
			return {
				stats: [
					{ title: this.$i18n.t('message.General').toUpperCase(), component: 'General' },
					{ title: this.$i18n.t('message.Shots').toUpperCase(),  },
					{ title: this.$i18n.t('message.Passes').toUpperCase(),  },
					{ title: this.$i18n.t('message.BallPossession').toUpperCase(),  },
					{ title: this.$i18n.t('message.Attack').toUpperCase(),  },
					{ title: this.$i18n.t('message.Defence').toUpperCase(),  },
					{ title: this.$i18n.t('message.Duels').toUpperCase(),  },
					{ title: this.$i18n.t('message.Transitions').toUpperCase(),  },
				]
			}
		},
		methods: {
 
		},
		components: { TabView, TabPanel, General }
	}
</script>
 
 
<style lang='scss' scoped>
</style>