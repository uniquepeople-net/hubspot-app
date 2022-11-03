export const sidebarMenu = (checkRole) => [
	{
		label: 'Dashboard',
		icon: 'bi-collection',
		to:	'/'
	},
	{
		label: 'Instat',
		icon: 'bi-bar-chart',
		items: [
			{ 
				label: 'By Match',
			},
			{
				label: 'By Season',
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
				to: {name: 'all-users'}
			},
			{ 
				label: 'Add New User',
				to: {name: 'add-new-user'}
			},
		]
	}
]

