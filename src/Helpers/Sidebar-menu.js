export const sidebarMenu = (checkRole, sidebarHide, isInstat) => {
	
	return [
	{
		label: 'My board',
		icon: 'bi-collection',
		to:	'/my-board',
		command: () => sidebarHide()
	},
	{
		label: 'Instat',
		icon: 'bi-bar-chart',
		visible: isInstat,
		items: [
			{ 
				label: 'By Match',
				to: '/stats',
				command: () => sidebarHide()
			}
		]
	},
	{
		label: 'Users',
		icon: 'bi-people',
		visible: checkRole,
		items: [
			{
				label: 'All Users',
				to: {name: 'all-users'},
				command: () => sidebarHide()
			},
			{ 
				label: 'Add New User',
				to: {name: 'add-new-user'},
				command: () => sidebarHide()				
			},
		]
	},
	{
		label: 'Info',
		icon: 'pi pi-info-circle',
		items: [
			{
				label: 'UFP',
				to: {name: 'info-ufp'},
				command: () => sidebarHide()
			},
			{ 
				label: 'Emails',
				to: {name: 'inbox'},
				command: () => sidebarHide()				
			},
		]
	},
	{
		label: 'Settings',
		icon: 'bi-collection',
		visible: checkRole,
		/* to:	'/settings',
		command: () => sidebarHide() */
		items: [
			{
				label: 'Payments',
				to: {name: 'payments'},
				command: () => sidebarHide()
			},
		]
	}
]}

