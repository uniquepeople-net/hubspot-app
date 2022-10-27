<template>
	
	<Sidebar v-model:visible="visibleLeft" class="sidebar-menu">
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
	
	import SidebarBurger from './SidebarBurger.vue'


	export default {
		mounted() {
			let windowWidth = window.outerWidth;
			windowWidth >= 999 ? this.visibleLeft = true : this.visibleLeft = false
		},
		data() {
			return {
				visibleLeft: false,
				items: [
                {
                    label: 'File',
                    icon:'pi pi-fw pi-file',
                },
                {
                    label: 'Edit',
                    icon:'pi pi-fw pi-pencil',
                    items: [
                        {
                            label: 'Left',
                            icon:'pi pi-fw pi-align-left'
                        },
                        {
                            label: 'Right',
                            icon:'pi pi-fw pi-align-right'
                        },
                        {
                            label: 'Center',
                            icon:'pi pi-fw pi-align-center'
                        },
                        {
                            label: 'Justify',
                            icon:'pi pi-fw pi-align-justify'
                        }
                    ]
                },
                {
                    label: 'Users',
                    icon:'pi pi-fw pi-user',
                    items: [
                        {
                            label: 'New',
                            icon:'pi pi-fw pi-user-plus',

                        },
                        {
                            label: 'Delete',
                            icon:'pi pi-fw pi-user-minus',
                        },
                        {
                            label: 'Search',
                            icon:'pi pi-fw pi-users',
                            items: [
                                {
                                    label: 'Filter',
                                    icon:'pi pi-fw pi-filter',
                                    items: [
                                        {
                                            label: 'Print',
                                            icon:'pi pi-fw pi-print'
                                        }
                                    ]
                                },
                                {
                                    icon:'pi pi-fw pi-bars',
                                    label: 'List'
                                }
                            ]
                        }
                    ]
                },
                {
                    label: 'Events',
                    icon:'pi pi-fw pi-calendar',
                    items: [
                        {
                            label: 'Edit',
                            icon:'pi pi-fw pi-pencil',
                            items: [
                                {
                                    label: 'Save',
                                    icon:'pi pi-fw pi-calendar-plus'
                                },
                                {
                                    label: 'Delete',
                                    icon:'pi pi-fw pi-calendar-minus'
                                }
                            ]
                        },
                        {
                            label: 'Archieve',
                            icon:'pi pi-fw pi-calendar-times',
                            items: [
                                {
                                    label: 'Remove',
                                    icon:'pi pi-fw pi-calendar-minus'
                                }
                            ]
                        }
                    ]
                }
            ]
			}
		},
		components: { SidebarBurger },
	}
</script>
 
 
<style lang='scss'>
.sidebar-menu {
	& .p-sidebar-header {
		justify-content: space-between;
		& .logo img {
			width: 65px;
		}	
	}
}

</style>