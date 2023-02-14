export const sidebarMenu = (checkRole, sidebarHide, isInstat) => {
	
	return [
	{
		label: 'My board',
		icon: 'bi-collection',
		to:	'/my-board',
		class: 'my-board-t',	// for testing purpose
		command: () => sidebarHide()
	},
	{
		label: 'Instat',
		icon: 'bi-bar-chart',
		visible: isInstat,
		class: 'instat-t',		// for testing purpose
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
		class: 'users-t',		// for testing purpose
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
		icon: 'bi bi-info-circle',
		class: 'info-t',		// for testing purpose
		items: [
			{ 
				label: 'Emails',
				to: {name: 'inbox'},
				command: () => sidebarHide()				
			},
		]
	},
	{
		label: 'Football news',
		icon: 'bi bi-cup-hot',
		class: 'news-t',		// for testing purpose
		items: [
			{
				label: 'News & Rumors ',
				to: {name: 'news-rumors'},
				command: () => sidebarHide()
			},
		]
	},
	{
		label: 'Settings',
		icon: 'bi-gear-wide-connected',
		visible: checkRole,
		class: 'settings-t',		// for testing purpose
		/* to:	'/settings',
		command: () => sidebarHide() */
		items: [
			{
				label: 'Payments',
				to: {name: 'products'},
				command: () => sidebarHide()
			},
			{
				label: 'Groups',
				to: {name: 'groups-all'},
				command: () => sidebarHide()
			},
		]
	},
	{
		label: 'Contact',
		icon: 'bi-phone',
		class: 'contact-t',		// for testing purpose
		/* to:	'/settings',
		command: () => sidebarHide() */
		items: [
			{
				label: 'UFP',
				to: {name: 'info-ufp'},
				command: () => sidebarHide()
			},
		]
	}
]}

