<template>
	<div class="sidebar-menu">
		<ul class="menu">
						
			<component v-for="(item, index) in items"
					:key="index"
					:is="item.component" 
					:title="item.title"
					:icon="item.iconClass"
					:hasSub="item.submenu ? 'has-sub' : ''"
					:submenu="item.submenu"
					:link="item.link"
					:permissions="item.permissions"
					:userRoleId="user.user.role_id">
			</component>

		</ul>
	</div>
</template>
 
 
<script>
	import { mapState } from 'vuex';

	import SidebarTitle from './SidebarTitle.vue';
	import SidebarItem from './SidebarItem.vue';
	import { sidebarMenu } from '../../../Helpers/sidebar-menu';

	export default {
		data() {
			return {
      			items: sidebarMenu,
			}
		},
		computed: {
			...mapState(['user']),
		},
		components: { SidebarTitle, SidebarItem }
	}
</script>
 
 
<style lang='scss' scoped>
</style>