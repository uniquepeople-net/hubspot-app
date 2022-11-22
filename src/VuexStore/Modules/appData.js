import { toRaw  } from 'vue'

export default {
	namespaced: true,
	state: () => ({
		activeSidebar: false,
		choosedEmails: null
	}),

	mutations: {
		SETACTIVESIDEBAR( state, data ) {
			state.activeSidebar = data;
		},
		SETEMAILS( state, data ) {
			state.choosedEmails = data;
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
		},
		setChoosedEmails( context, data ) {
			context.commit("SETEMAILS", data)
		}
	},

	getters: {
		activeSidebar(state) {
			return state.activeSidebar
		},
		getEmails(state) {
			return toRaw(state.choosedEmails)
		}
	}
}

