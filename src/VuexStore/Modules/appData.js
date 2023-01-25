import { toRaw  } from 'vue'

export default {
	namespaced: true,
	state: () => ({
		activeSidebar: false,
		choosedUsers: null
	}),

	mutations: {
		SETACTIVESIDEBAR( state, data ) {
			state.activeSidebar = data;
		},
		SETUSERS( state, data ) {
			state.choosedUsers = data;
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
		setChoosedUsers( context, data ) {
			context.commit("SETUSERS", data)
		}
	},

	getters: {
		activeSidebar(state) {
			return state.activeSidebar
		},
		getUsers(state) {
			return toRaw(state.choosedUsers)
		}
	}
}

