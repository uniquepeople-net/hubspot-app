<template>
	<TabMenu :model="items" />
</template>
 
 
<script>
	import TabMenu from 'primevue/tabmenu'

	export default {
		data() {
			return {
				items: [
					{label: 'Hot', icon: 'bi bi-fire',
						command: (event) => {
							this.$store.dispatch("news/resetNews");
							this.$store.dispatch("news/getRedditNews", 'hot');
						}
					},
					{label: 'New', icon: 'bi bi-circle',
						command: (event) => {
							this.$store.dispatch("news/resetNews");
							this.$store.dispatch("news/getRedditNews", 'new');
						}
					},
					{label: 'Top', icon: 'bi bi-graph-up-arrow',
						command: (event) => {
							this.$store.dispatch("news/resetNews");
							this.$store.dispatch("news/getRedditNews", 'top');
						}
					},
				]
			}
		},
		methods: {
 
		},
		components: { TabMenu }
	}
</script>
 
 
<style lang='scss' scoped>
</style>