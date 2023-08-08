<template>
	<div>
		<BackButton title="TOP 11" route="my-board" class="mb-4"/>

		<TabView class="tab-view sm-width-screen" v-if="top11">
			<TabPanel v-for="gender in top11.genders" :header="gender.gender.toUpperCase()">
					
				<Top11Items :items="gender.topelevens"/>
				
			</TabPanel>		
		</TabView>

		<LoadingIcon v-if="!top11"/>
	</div>
</template>
 
 
<script>
	import { mapGetters } from 'vuex'
	import TabView from 'primevue/tabview'
	import TabPanel from 'primevue/tabpanel'
	import Top11Items from './Top11Items.vue'
	import BackButton from '../../../global/BackButton.vue'

	export default {
		created() {
			this.$store.dispatch("surveys/getSurveysTop11");
		},
		data() {
			return {
			}
		},
		methods: {
 
		},
		computed: {
			...mapGetters({ top11: 'surveys/surveysTop11' })
		},
		components: { TabView, TabPanel, Top11Items, BackButton }
	}
</script>
 
 
<style lang='scss' scoped>
.tab-view {
	:deep(.p-tabview-nav-container) {
		margin-bottom: 1rem;
	}
	:deep(.p-tabview-panels) {
		padding-left: 0;
		padding-right: 0;
	}
	:deep(.p-tabview-nav li .p-tabview-nav-link:not(.p-disabled):focus) {
		box-shadow: unset;
	}
	:deep(.p-tabview-header) {
		flex: 1;
		.p-tabview-nav-link {
			justify-content: center;
		}
	}
}
</style>