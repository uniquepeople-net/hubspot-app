import axios from "axios";
import User from "../../Helpers/User";

export default {
	namespaced: true,
	state: () => ({
		specificUser: {},
		instatUser: {},
		instatId : null,
		instatTeam: {}
	}),

	mutations: {
		SETUSER( state, data ) {
			state.specificUser = data;
			state.instatId = data.instat_id
		},
		SETINSTATUSER( state, data ) {
			state.instatUser = data.data.row[0]
		},
		SETINSTATTEAM( state, data ) {
			state.instatTeam = data.data.row[0]
		},
		RESETSTATE ( state ) {
			// Merge rather than replace so we don't lose observers
			// https://github.com/vuejs/vuex/issues/1118
			Object.assign(state, { 
				specificUser: {},
				instatUser: {},
				instatId: null,
				instatTeam: {}
			})
		}
	},

	actions: {
		async getSpecificUser(context, id) {
			let specificUser = context.rootGetters['links/specificUser']
			/* let instatBasic = context.rootGetters['links/instatBasic']
			let instatPlayerData = context.rootGetters['links/instatPlayerData']
			let instatOPtions = context.rootGetters['links/instatOPtions']
			let instatTeamData = context.rootGetters['links/instatTeamData'] */

			await User.refreshedToken();

			await axios.get(specificUser + id, {
				headers: {
					Authorization: 'Bearer ' + User.getToken()
			}})
				.then( response => {
					response.data.fee = Boolean(response.data.fee)
					response.data.is_admin = Boolean(response.data.is_admin)
					response.data.active_member = Boolean(response.data.active_member)

					context.commit("SETUSER", response.data)			 
				})
			
			/* let instatId = context.getters.instatId

			await axios.get(instatBasic + instatPlayerData + instatId + instatOPtions)
				.then( response => {
					context.commit("SETINSTATUSER", response.data)
				})

			let instatTeamId = context.getters.instatTeamId

			await axios.get( instatBasic + instatTeamData + instatTeamId + instatOPtions )
				.then( response => {
					context.commit("SETINSTATTEAM", response.data)
				}) */
		}
	},

	getters: {
		user(state) {
			return state.specificUser
		},
		instatUser(state) {
			return state.instatUser
		},
		instatId(state) {
			return state.instatId
		},
		instatTeamId(state) {
			return state.instatUser.club_team_id
		},
		instatTeam(state) {
			return state.instatTeam
		}
	}
}