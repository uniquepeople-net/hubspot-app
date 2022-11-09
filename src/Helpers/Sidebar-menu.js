export const sidebarMenu = (checkRole, sidebarHide) => {
	
	return [
	{
		label: 'Dashboard',
		icon: 'bi-collection',
		to:	'/',
		command: () => sidebarHide()
	},
	{
		label: 'Instat',
		icon: 'bi-bar-chart',
		items: [
			{ 
				label: 'By Match',
				to: '/stats',
				command: () => sidebarHide()
			},
			{
				label: 'By Season',
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
	}
]}

