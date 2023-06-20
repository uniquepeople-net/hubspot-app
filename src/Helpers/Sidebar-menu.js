export const sidebarMenu = (checkRole, sidebarHide, isInstat, i18n) => {
	
	return [
	{
		key: '1',
		label: i18n.t("message.myboard"),
		icon: 'bi-collection',
		to:	{ name: 'my-board', params: { lang: i18n.locale } },
		class: 'my-board-t',	// for testing purpose
		command: () => sidebarHide()
	},
	{
		key: '2',
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
		key: '3',
		label: i18n.t("message.Documents"),
		icon: 'bi bi-file-earmark-text',
		to: { name: 'documents', params: { lang: i18n.locale } },
		class: 'documents-t',		// for testing purpose
		command: () => sidebarHide()
	},
	{
		key: '4',
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
		key: '5',
		label: 'Info',
		icon: 'bi bi-info-circle',
		class: 'info-t',		// for testing purpose
		items: [
			{ 
				label: i18n.t("message.Emails"),
				to: {name: 'inbox'},
				command: () => sidebarHide()				
			},
		]
	},
	/* {
		key: '6',
		label: i18n.t("message.Footballnews"),
		icon: 'bi bi-cup-hot',
		class: 'news-t',		// for testing purpose
		items: [
			{
				label: i18n.t("message.NewsRumors"),
				to: {name: 'news-rumors'},
				command: () => sidebarHide()
			},
			{
				label: 'Highlights',
				to: {name: 'news-rumors-video'},
				command: () => sidebarHide()
			},
		]
	}, */
	{
		key: '7',
		label: i18n.t("message.Settings"),
		icon: 'bi-gear-wide-connected',
		visible: checkRole,
		class: 'settings-t',		// for testing purpose
		/* to:	'/settings',
		command: () => sidebarHide() */
		items: [
			{
				label: i18n.t("message.Documents"),
				to: {name: 'docs-all'},
				command: () => sidebarHide()
			},
			{
				label: i18n.t("message.Groups"),
				to: {name: 'groups-all'},
				command: () => sidebarHide()
			},
			{
				label: i18n.t("message.Products"),
				to: {name: 'products-all'},
				command: () => sidebarHide()
			},
			{
				label: i18n.t("message.Surveys"),
				to: {name: 'surveys-all'},
				command: () => sidebarHide()
			},
			{
				label: 'App',
				to: {name: 'app-settings'},
				command: () => sidebarHide()
			},
		]
	},
	{
		key: '8',
		label: i18n.t("message.Contact"),
		icon: 'bi-phone',
		class: 'contact-t',		// for testing purpose
		/* to:	'/settings',
		command: () => sidebarHide() */
		items: [
			{
				label: "UFP",
				to: {name: 'info-ufp'},
				command: () => sidebarHide()
			},
		]
	}
]}

