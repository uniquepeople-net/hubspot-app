<template>
	<div class="mt-4">
		<h5 class="text-value">{{ $t('message.YourMatchStats') }}</h5>
		<TabView>
			<TabPanel v-for="stat in stats" :header="stat.title">

				<GridCard :gradient="160" class="individual-stat" bgSize="4rem" padding=".5rem 1rem">
					<template #content>
						<StatBarMain title="Passes total" :value="5"/>
						<Divider class="divider my-1"/>
						<StatBarSub title="Succesful passes to final third" :value="5" :total="8"/>
					</template>	
				</GridCard>	
				
			</TabPanel>				
		</TabView>
		<Divider class="divider-light mt-1"/>
	</div>
</template>
 
 
<script>
	import TabView from 'primevue/tabview';
	import TabPanel from 'primevue/tabpanel';
	import GridCard from '../../../../global/GridCard.vue';
	import StatBarMain from '../Global/StatBarMain.vue';
	import StatBarSub from '../Global/StatBarSub.vue';

	export default {
		data() {
			return {
				stats: [
					{ title: this.$i18n.t('message.KEYSTATS'),  },
					{ title: this.$i18n.t('message.DISTRIBUTION'),  },
					{ title: this.$i18n.t('message.ATTACKING'),  },
					{ title: this.$i18n.t('message.DEFENDING'),  },
					{ title: this.$i18n.t('message.DUELS'),  },
					{ title: this.$i18n.t('message.DISCIPLINARY'),  },
				]
			}
		},
		methods: {

		},
		components: { TabView, TabPanel, GridCard, StatBarMain, StatBarSub }
	}
</script>

 
<style lang='scss' scoped>
.individual-stat {
	border-radius: var(--btn-border-radius);
	:deep(.p-divider-horizontal)::before {
		border-top: 1px solid var(--main-dark);
	}
}
</style>