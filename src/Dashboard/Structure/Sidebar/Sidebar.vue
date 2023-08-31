<template>
	
	<SidebarBurger @click="visibleLeft = true"/>

	<Sidebar v-model:visible="visibleLeft" class="sidebar" :modal="sidebarModal" :dismissable="sidebarModal">
		<!-- <template v-slot:header class="sidebar-slot-header">
			<div class="logo">
				<a href="https://ufp.sk"><img src="https://ufp.sk/wp-content/uploads/2023/04/cropped-logo-transp.png" alt="Logo" srcset="" /></a>
			</div>
		</template> -->
		<template v-slot:closeicon>
			<BackButton class="sidebar-back-btn" title="Menu" position="static"/>
		</template>

		<PanelMenu v-model:expandedKeys="expandedKeys" v-if="items" :model="items" 
				   ref="panelMenu" @panel-open="onPanelClick" />
	</Sidebar>


	<SidebarTimer v-if="restTrialTime" class="trial-timer" :timeInSeconds="restTrialTime"/>

</template>
 
 
<script>	
	import SidebarBurger from './SidebarBurger.vue';
	import { mapGetters } from 'vuex';
	import { sidebarMenu } from '../../../Helpers/Sidebar-menu';
	import SidebarTimer from './SidebarTimer.vue';
	import BackButton from '../../global/BackButton.vue';

	export default {
		mounted() {
			this.sidebarHide()
			//this.expandedKeys = this.items
			this.expandedKeys = sidebarMenu( this.showItemByRole(), this.sidebarHide(), this.checkStatsIdexists, this.$i18n )				
			
			this.$nextTick(() => {
				//this.expandActivePanel()
				this.expandAll()
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
			sidebarHide() {
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
				const panelMenu = this.$refs.panelMenu
				const routeName = this.$route.name
				const routeMatched = this.$route.matched
				
				let foundedObj;
				routeMatched.reverse().some( r => {
					const findObj = this.items.find(obj => {

						if (obj.to && obj.to.name.includes( r.name )) {
							return true;
						}
						if (obj.items) {
							const foundItem = obj.items.find(item => item.to && item.to.name.includes( r.name ));
							return foundItem !== undefined;
						}
						return false;
					});

					if( findObj ) {
						foundedObj = findObj
					}
				})

				this.expandedKeys = foundedObj

				if ( this.expandedKeys ) {
					this.expandNode(this.expandedKeys);
				}
			},
			expandNode(node) {
				if (node.items && node.items.length) {					
					this.expandedKeys[node.key] = true;

					for (let child of node.items) {
						this.expandNode(child);
					}
				}
			},
			expandAll() {
				this.items.forEach(item => {
					this.expandNode(item);
				});
			},
			onPanelClick(event) {
				/* this.expandedKeys = event.item
				this.expandNode(event.item)	 */			
			}
		},
		computed: {
			...mapGetters({ user: 'user/user' }),
			items() { 				
				return sidebarMenu( this.showItemByRole(), this.sidebarHide, this.checkStatsIdexists, this.$i18n )
			},
			restTrialTime() {
				let currentDate = Date.now();
				let trialDate = new Date(this.user.trial_date);
				let diffInMilliseconds = currentDate - trialDate;

				let diffInMinutes = Math.floor(diffInMilliseconds / 60000);

				// Set time to trial in minutes ( 10080 minutes = 1 week )
				const trialTime = 10080;
				let restTime = trialTime - diffInMinutes;

				if ( this.user.fee || this.user.fee_finish_date ) return 0

				if ( restTime <= 0 ) {
					return 0.5
				} else {
					let timeInSeconds = restTime * 60
					return timeInSeconds
				}
			}
		},
		watch: {
			visibleLeft: function(data) {
				this.$store.dispatch("appData/setActiveSidebar", data)
			}
		},
		components: { SidebarBurger, SidebarTimer, BackButton }
	}
</script>


<style lang='scss'>
.sidebar.p-sidebar {
	width: 15rem !important;
	box-shadow: var(--card-shadow) 1.95px 1.95px 0px;
	background: var(--card-bg);
	.sidebar-back-btn {
		position: static;
	}
	.router-link-active-exact {
		background: var(--gray-100);
		//transition: all .2s;
		//transform: scaleX(1.1);
		//box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
		//box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px;
		//box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
		//box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
		//box-shadow: var(--teal-50) 0px 4px 16px 0px inset, rgba(17, 17, 26, 0.05) 0px 8px 32px 0px;
		//border-radius: 8px;
	}
	& .p-sidebar-header {
		justify-content: space-between;
		.p-sidebar-icon {
			width: auto;
			color: var(--main-dark);
		}
		.p-sidebar-icon:enabled:hover, .p-sidebar-icon:focus {
			background: unset;
			box-shadow: unset;
		}
		/* .logo img {
			width: 65px;
		} */
	}
	& .p-sidebar-content {
		& .p-panelmenu.p-component {
			.p-panelmenu-header {
				position: relative;
			}
			.p-panelmenu-header:focus {
				border: 0;
			}
			.p-panelmenu-panel {
				margin-bottom: .7rem;
				.p-panelmenu-header-content {
					border: 0;
					//border-radius: 8px;
					box-shadow: unset;
				}
				.p-toggleable-content {
					margin-left: 2px;
					.p-panelmenu-content {
						border-radius: 0 0 8px 8px;
						border: 0;
						padding: 0;
						background: var(--card-bg);
					}
					.p-menuitem-icon {
						font-size: 1.2rem;
						margin: -0.35rem;
					}
				}
			}
			.p-panelmenu-header-content {
				background-color: unset;
			}
		}
		.p-panelmenu-header-action {
			position: relative;
			flex-direction: column;
			color: var(--main-dark);
			padding: .5rem 1rem .5rem 0;
			svg {
				visibility: hidden;
			}
			.p-menuitem-text {
				font-weight: 600;
				font-size: 24px;
				width: 100%;
			}
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
			& .p-menuitem-link {
				padding: .5rem 0;
				border-bottom: 1px solid var(--text-light-color);
				display: flex;
				flex-direction: row-reverse;
				justify-content: space-between;
			}
			& .p-menuitem-text {
				font-size: 18px;
				font-weight: 400;
				line-height: 150%;
				text-align: left;
			}
		}
	}
	.pi-chevron-right, .pi-chevron-down {
		order: 3;
		margin-left: auto;
	}
}
.trial-timer {
	position: absolute;
	width: 100%;
	display: flex;
	justify-content: center;
}
@media ( max-width: 576px ) {
	.sidebar.p-sidebar {
		width: 576px !important;
		background: var(--main-white);
		& .p-sidebar-content {
			& .p-panelmenu.p-component {
				margin-top: 0rem;
				.p-panelmenu-panel .p-toggleable-content .p-panelmenu-content {
					background: var(--main-white);
				}
			}
			.p-panelmenu-header-action { 
				.p-menuitem-icon {
					font-size: 1.2rem;
				}
			}
		}
		
	}
}
</style>