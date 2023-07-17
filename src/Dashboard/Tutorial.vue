<template>
	<div>
		<TabView class="tutorial-steps" v-model:activeIndex="active" ref="tabview">
			<TabPanel >
				<template #header>
					<CircleFull v-if="active >= 0" />
				</template>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
					consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
				</p>
			</TabPanel>
			<TabPanel >
				<template #header>
					<CircleFull v-if="active >= 1" />
					<CircleBorder v-if="active < 1" />
				</template>
				<p>
					Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim
					ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi.
				</p>
			</TabPanel>
			<TabPanel >
				<template #header>
					<CircleFull v-if="active >= 2" />
					<CircleBorder v-if="active < 2" />
				</template>
				<p>
					At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui
					officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.
				</p>
			</TabPanel>
			<TabPanel >
				<template #header>
					<CircleFull v-if="active >= 3" />
					<CircleBorder v-if="active < 3" />
				</template>
				<p>
					At vero eos distinctio.
				</p>
			</TabPanel>
			<TabPanel >
				<template #header>
					<CircleFull v-if="active >= 4" />
					<CircleBorder v-if="active < 4" />
				</template>
				<p>
					distinctio. Nam libero tempore.
				</p>
			</TabPanel>
			
		</TabView>
		<Button label="Next" class="btn-black" @click="activeTab"/>
	</div>
</template>
 
 
<script>
	import TabView from 'primevue/tabview';
	import TabPanel from 'primevue/tabpanel';
	import CircleBorder from './structureComponents/Main/Stats/Vectors/CircleBorder.vue';
	import CircleFull from './structureComponents/Main/Stats/Vectors/CircleFull.vue';

	export default {
		mounted() {
			this.tabsCount = this.$refs.tabview.tabs.length
		},
		data() {
			return {
				tabsCount: 0, 
				active: 0,
			}
		},
		methods: {
			activeTab() {
				this.active = this.active < (this.tabsCount - 1) ? this.active + 1 : this.active
			}
		},
		components: { TabView, TabPanel, CircleBorder, CircleFull }
	}
</script>
 
 
<style lang='scss' scoped>
.tutorial-steps {
	display: flex;
	flex-direction: column-reverse;
}
</style>