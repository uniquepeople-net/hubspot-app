<template>
	
	<Sidebar v-model:visible="visibleLeft" class="sidebar" :modal="sidebarModal">
		<template v-slot:header class="sidebar-slot-header">
			<div class="logo">
				<a href="https://ufp.sk"><img src="../../../../assets/images/logo/logo.png" alt="Logo" srcset="" /></a>
			</div>
		</template>

		<PanelMenu v-if="items" :model="items"/>
	</Sidebar>

	<SidebarBurger @click="visibleLeft = true"/>
			
</template>
 
 
<script>	
	import SidebarBurger from './SidebarBurger.vue';
	import { mapGetters } from 'vuex';
	import { sidebarMenu } from '../../../Helpers/Sidebar-menu';

	export default {
		mounted() {
			this.checkwindowWidth()		
		},
		data() {
			return {
				visibleLeft: false,
				items: sidebarMenu( this.showItemByRole, this.checkwindowWidth, this.checkStatsIdexists ),
				sidebarModal: true
			}
		},
		methods: {
			showItemByRole() {
				return this.user.role_id === 1 ? true : false
			},
			checkwindowWidth() {
				let windowWidth = window.innerWidth;
				if ( windowWidth >= 991 ) {
					this.visibleLeft = true
					this.sidebarModal = false
				} else {
					this.visibleLeft = false
					this.sidebarModal = true
				}	
			},
			checkStatsIdexists() {
				return this.user.instat_id ? true : false
			}
		},
		computed: {
			...mapGetters({ user: 'user/user' }),
		},
		watch: {
			visibleLeft: function(data) {
				this.$store.dispatch("appData/setActiveSidebar", data)
			}
		},
		components: { SidebarBurger },
	}
</script>
 
 
<style lang='scss'>
.sidebar {
	width: 12rem !important;
	border-radius: 0 50px 0 0;	
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
		& .p-panelmenu-header-link {
			position: relative;
			flex-direction: column;
			& .p-menuitem-icon {
				font-size: 1.7rem;
				margin: 0;
			}
			& .p-panelmenu-icon {
				position: absolute;
				right: .5rem;
				top: 0;
				bottom: 0;
				margin: auto;
				display: flex;
				align-items: center;
			}
		}
	}
	.p-menuitem-text {
		font-weight: 500;
	}
	.pi-chevron-right, .pi-chevron-down {
		order: 3;
		margin-left: auto;
	}
}
</style>