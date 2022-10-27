export const sidebarMenu = [
	{
		'component': 'SidebarTitle',
		'title': 'Menu'
	},
	{
		'component': 'SidebarItem',
		'title': 'Dashboard',
		'iconClass': 'bi-collection',
		'link': '/'
	},
	{
		'component': 'SidebarItem',
		'title': 'Instat',
		'iconClass': 'bi-bar-chart',
		'submenu': [
			{ 
				'subtitle': 'By Match',
				'sublink': 'instat-by-match',
			},
			{
				'subtitle': 'By Season',
				'sublink': 'instat-by-season',
			}
		]
	},
	{
		'component': 'SidebarItem',
		'title': 'Users',
		'iconClass': 'bi-people',
		'permissions': [1],
		'submenu': [
			{
				'subtitle': 'All Users',
				'sublink': 'all-users',
			},
			{ 
				'subtitle': 'Add New User',
				'sublink': 'add-new-user',
			},
		]
	}
]

