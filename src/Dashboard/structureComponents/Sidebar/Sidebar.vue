<template>
	

	<Sidebar v-model:visible="visibleLeft" class="sidebar" :modal="sidebarModal" :dismissable="sidebarModal">
		<template v-slot:header class="sidebar-slot-header">
			<div class="logo">
				<a href="https://ufp.sk"><img src="https://ufp.sk/wp-content/uploads/2023/04/cropped-logo-transp.png" alt="Logo" srcset="" /></a>
			</div>
		</template>

		<PanelMenu v-model:expandedKeys="expandedKeys" v-if="items" :model="items" 
				   ref="panelMenu" @panel-open="onPanelClick" />
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
			this.$nextTick(() => {
				this.expandActivePanel()
			});
		},
		data() {
			return {
				visibleLeft: false,
				sidebarModal: true,
				expandedKeys: null
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
			},
			expandActivePanel() {				
				const panelMenu = this.$refs.panelMenu;
				const routeName = this.$route.name

				const foundObject = this.items.find(obj => {
					if (obj.to && obj.to.name === routeName) {
						return true;
					}
					if (obj.items) {
						const foundItem = obj.items.find(item => item.to && item.to.name === routeName);
						return foundItem !== undefined;
					}
					return false;
				});

				this.expandedKeys = foundObject
				this.expandNode(this.expandedKeys);
			},
			expandNode(node) {
				if (node.items && node.items.length) {
					this.expandedKeys[node.key] = true;

					for (let child of node.items) {
						this.expandNode(child);
					}
				}
			},
			onPanelClick(event) {
				this.expandedKeys = event.item
				this.expandNode(event.item)				
			}
		},
		computed: {
			...mapGetters({ user: 'user/user' }),
			items() { 
				return sidebarMenu( this.showItemByRole, this.checkwindowWidth, this.checkStatsIdexists, this.$i18n )
			}
		},
		watch: {
			visibleLeft: function(data) {
				this.$store.dispatch("appData/setActiveSidebar", data)
			}
		},
		components: { SidebarBurger }
	}
</script>


<style lang='scss'>
.sidebar {
	width: 12rem !important;
	border-radius: 0 50px 0 0;
	.router-link-active-exact {
		background: var(--bluegray-100);
		transition: all .2s;
		//transform: scaleX(1.1);
		box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
		//box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px;
		//box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
		//box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
		box-shadow: var(--teal-50) 0px 4px 16px 0px inset, rgba(17, 17, 26, 0.05) 0px 8px 32px 0px;
		}
	& .p-sidebar-header {
		justify-content: space-between;
		.logo img {
			width: 65px;
		}
	}
	& .p-sidebar-content {
		& .p-panelmenu.p-component {
			margin-top: 1rem;
		}
		.p-panelmenu-header-action {
			position: relative;
			flex-direction: column;
			& .p-menuitem-icon {
				font-size: 1.7rem;
				margin: 0 !important;
			}
			& .p-submenu-icon {
				position: absolute;
				right: .5rem;
				top: 0;
				bottom: 0;
				margin: auto;
				display: flex;
				align-items: center;
			}
		}
		& .p-submenu-list {
			& .p-menuitem-text {
				font-weight: 400;
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
@media ( max-width: 576px ) {
	.p-sidebar {
		& .p-sidebar-content {
			& .p-panelmenu.p-component {
				margin-top: 0rem;
			}
			.p-panelmenu-header-action { 
				padding: .8rem !important;
				.p-menuitem-icon {
					font-size: 1.2rem;
				}
				.p-menuitem-text {
					font-size: .8rem;
				}

			}
			.p-menuitem-link {
				font-size: .8rem;
			}
		}
		
	}
}
</style>