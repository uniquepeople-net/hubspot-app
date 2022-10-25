<template>
	<div id="sidebar" class="active">
		<div class="sidebar-wrapper active">
			<SidebarHeader />
			<SidebarBody />
		</div>
	</div>
</template>
 
 
<script>
	import SidebarBody from './SidebarBody.vue'
	import SidebarHeader from './SidebarHeader.vue'
	
	export default {
		components: { SidebarHeader, SidebarBody },
	}
</script>
 
 
<style lang='scss' scoped>
</style>