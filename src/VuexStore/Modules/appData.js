export default {
	namespaced: true,
	state: () => ({
		activeSidebar: false
	}),

	mutations: {
		SETACTIVESIDEBAR( state, data ) {
			state.activeSidebar = data;
		},
		RESETSTATE ( state ) {
			// Merge rather than replace so we don't lose observers
			// https://github.com/vuejs/vuex/issues/1118
			Object.assign(state, { 
				activeSidebar: null,
			})
		}
	},

	actions: {
		setActiveSidebar(context, status) {
			context.commit("SETACTIVESIDEBAR", status)
		},
		setDisabledSidebar(context) {
			context.commit("SETACTIVESIDEBAR", false)
		}
	},

	getters: {
		activeSidebar(state) {
			return state.activeSidebar
		}
	}
}