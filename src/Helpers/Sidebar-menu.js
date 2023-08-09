export const sidebarMenu = (checkRole, sidebarHide, isInstat, i18n) => {
	
	return [
	/* {
		key: '1',
		label: i18n.t("message.myboard"),
		to:	{ name: 'my-board', params: { lang: i18n.locale } },
		class: 'my-board-t',	// for testing purpose
		command: () => sidebarHide()
	}, */
	{
		key: '2',
		label: i18n.t("message.stats"),
		visible: isInstat,
		class: 'instat-t',		// for testing purpose
		items: [
			{ 
				label: i18n.t("message.player"),
				to: { name: 'player', params: { lang: i18n.locale } },
				icon: 'pi pi-angle-right',
				command: () => sidebarHide()
			},
			{ 
				label: i18n.t("message.match"),
				to: { name: 'match', params: { lang: i18n.locale } },
				icon: 'pi pi-angle-right',
				command: () => {
					sidebarHide()
				}
			},
		]
	},
	{
		key: '3',
		label: i18n.t("message.General"),
		class: 'general-t',		// for testing purpose
		items: [
			{
				label: i18n.t("message.News"),
				to:	{ name: 'news', params: { lang: i18n.locale } },
				icon: 'pi pi-angle-right',
				command: () => {
					//localStorage.setItem('menu', true)
					sidebarHide()
				}
			},
		]
	},
	{
		key: '4',
		label: i18n.t("message.users"),
		visible: checkRole,
		class: 'users-t',		// for testing purpose
		items: [
			{
				label: i18n.t("message.allUsers"),
				to: {name: 'all-users'},
				icon: 'pi pi-angle-right',
				command: () => sidebarHide()
			},
			{ 
				label: i18n.t("message.addNewUser"),
				to: {name: 'add-new-user'},
				icon: 'pi pi-angle-right',
				command: () => sidebarHide()				
			},
		]
	},
	{
		key: '5',
		label: 'Info',
		/* icon: 'bi bi-info-circle', */
		class: 'info-t',		// for testing purpose
		items: [
			{ 
				label: i18n.t("message.Emails"),
				to: {name: 'inbox'},
				icon: 'pi pi-angle-right',
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
				icon: 'pi pi-angle-right',
				command: () => sidebarHide()
			},
			{
				label: 'Highlights',
				to: {name: 'news-rumors-video'},
				icon: 'pi pi-angle-right',
				command: () => sidebarHide()
			},
		]
	}, */
	{
		key: '7',
		label: i18n.t("message.Settings"),
		/* icon: 'bi-gear-wide-connected', */
		visible: checkRole,
		class: 'settings-t',		// for testing purpose
		/* to:	'/settings',
		command: () => sidebarHide() */
		items: [
			{
				label: i18n.t("message.Documents"),
				to: {name: 'docs-all'},
				icon: 'pi pi-angle-right',
				command: () => sidebarHide()
			},
			{
				label: i18n.t("message.Groups"),
				to: {name: 'groups-all'},
				icon: 'pi pi-angle-right',
				command: () => sidebarHide()
			},
			{
				label: i18n.t("message.Products"),
				to: {name: 'products-all'},
				icon: 'pi pi-angle-right',
				command: () => sidebarHide()
			},
			{
				label: i18n.t("message.Surveys"),
				to: {name: 'surveys-all'},
				icon: 'pi pi-angle-right',
				command: () => sidebarHide()
			},
			{
				label: 'App',
				to: {name: 'app-settings'},
				icon: 'pi pi-angle-right',
				command: () => sidebarHide()
			},
		]
	},
	{
		key: '8',
		label: i18n.t("message.Help"),
		/* icon: 'bi-phone', */
		class: 'contact-t',		// for testing purpose
		/* to:	'/settings',
		command: () => sidebarHide() */
		items: [
			{
				label: i18n.t("message.Contact"),
				to: {name: 'info-ufp'},
				icon: 'pi pi-angle-right',
				command: () => sidebarHide()
			},
			{
				label: i18n.t("message.Documents"),
				to: { name: 'documents', params: { lang: i18n.locale } },
				icon: 'pi pi-angle-right',
				class: 'documents-t',		// for testing purpose
				command: () => sidebarHide()
			},
			{
				label: "FAQ",
				to: { name: 'faq' },
				icon: 'pi pi-angle-right',
				class: 'faq-t',		// for testing purpose
				command: () => sidebarHide()
			},
		]
	},
	{
		key: '9',
		label: /* i18n.t("message.Legal") */'Legal',
		class: 'legal-t',		// for testing purpose
		items: [
			{
				label: i18n.t("message.TermsOfUseN"),
				to: {name: 'legal-terms'},
				icon: 'pi pi-angle-right',
				command: () => sidebarHide()
			},
			{
				label: i18n.t("message.PrivacyPolicyN"),
				to: {name: 'legal-privacy'},
				icon: 'pi pi-angle-right',
				command: () => sidebarHide()
			},
		]
	}
]}

