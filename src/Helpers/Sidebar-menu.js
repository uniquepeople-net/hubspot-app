export const sidebarMenu = (checkRole, sidebarHide, isInstat, i18n) => {
	
	return [
	{
		label: i18n.t("message.myboard"),
		icon: 'bi-collection',
		to:	{ name: 'my-board', params: { lang: i18n.locale } },
		class: 'my-board-t',	// for testing purpose
		command: () => sidebarHide()
	},
	{
		label: i18n.t("message.stats"),
		icon: 'bi-bar-chart',
		visible: isInstat,
		class: 'instat-t',		// for testing purpose
		items: [
			{ 
				label: i18n.t("message.match"),
				to: { name: 'match', params: { lang: i18n.locale } },
				command: () => sidebarHide()
			},
			{ 
				label: i18n.t("message.player"),
				to: { name: 'player', params: { lang: i18n.locale } },
				command: () => sidebarHide()
			}
		]
	},
	{
		label: i18n.t("message.documents"),
		icon: 'bi bi-file-earmark-text',
		to: { name: 'documents', params: { lang: i18n.locale } },
		class: 'documents-t',		// for testing purpose
		command: () => sidebarHide()
	},
	{
		label: i18n.t("message.users"),
		icon: 'bi-people',
		visible: checkRole,
		class: 'users-t',		// for testing purpose
		items: [
			{
				label: i18n.t("message.allUsers"),
				to: {name: 'all-users'},
				command: () => sidebarHide()
			},
			{ 
				label: i18n.t("message.addNewUser"),
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
				label: 'Documents',
				to: {name: 'docs-all'},
				command: () => sidebarHide()
			},
			{
				label: 'Groups',
				to: {name: 'groups-all'},
				command: () => sidebarHide()
			},
			{
				label: 'Products',
				to: {name: 'products-all'},
				command: () => sidebarHide()
			},
			{
				label: 'Surveys',
				to: {name: 'surveys-all'},
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

