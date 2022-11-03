<template>
	
	<Sidebar v-model:visible="visibleLeft" class="sidebar">
		<template v-slot:header class="sidebar-slot-header">
			<div class="logo">
				<a href="https://ufp.sk"><img src="../../../../assets/images/logo/logo.png" alt="Logo" srcset="" /></a>
			</div>
		</template>

		<PanelMenu :model="items" />
	</Sidebar>

	<SidebarBurger @click="visibleLeft = true"/>
			
</template>
 
 
<script>	
	import SidebarBurger from './SidebarBurger.vue';
	import { mapGetters } from 'vuex';
	import { sidebarMenu } from '../../../Helpers/Sidebar-menu';

	export default {
		mounted() {
			let windowWidth = window.innerWidth;
			windowWidth >= 999 ? this.visibleLeft = true : this.visibleLeft = false			
		},
		data() {
			return {
				visibleLeft: false,
				items: sidebarMenu( this.showItemByRole )
			}
		},
		methods: {
			showItemByRole() {
				return this.user.role_id === 1 ? true : false
			}
		},
		computed: {
			...mapGetters({ user: 'user/user' }),
		},
		components: { SidebarBurger },
	}
</script>
 
 
<style lang='scss'>
.sidebar {
	border-radius: 0 50px 50px 0;	
	.p-sidebar-header {
		justify-content: space-between;
		.logo img {
			width: 65px;
		}
	}
	.p-sidebar-content {
		& .p-panelmenu.p-component {
			margin-top: 1rem;
		}
	}
	.p-menuitem-text {
		font-weight: 400;
	}
}
</style>