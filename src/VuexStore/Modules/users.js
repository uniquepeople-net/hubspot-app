import axios from "axios";
import User from "../../Helpers/User";
import user from "./user";

export default {
	namespaced: true,
	state: () => ({
		users: null,
	}),

	mutations: {
		SETUSERS( state, data ) {
			state.users = data;
			state.users.map( user => {
				user.fee = Boolean( user.fee )
				user.is_admin = Boolean( user.is_admin )
				user.active_member = Boolean( user.active_member )
			})
		},
		RESETSTATE ( state ) {
			// Merge rather than replace so we don't lose observers
			// https://github.com/vuejs/vuex/issues/1118
			Object.assign(state, { 
				users:{},
			})
		}
	},

	actions: {
		async getUsers(context) {
			let url = context.rootGetters['links/getAllUsers']

			await User.refreshedToken();

			await axios.get(url, {
				headers: {
					Authorization: 'Bearer ' + User.getToken()
			}})
			.then( response => {

				context.commit("SETUSERS", response.data)			 
			})
			
		},
	},

	getters: {
		getUsers(state) {
			return JSON.parse(JSON.stringify(state.users))
		}
	}
}