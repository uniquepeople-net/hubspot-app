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
			let groupUserUrl = context.rootGetters['links/groupUser']

			await User.refreshedToken();

			await axios.get(url, {
				headers: {
					Authorization: 'Bearer ' + User.getToken()
				}
			}).then( response => {
				context.commit("SETUSERS", response.data)			 
			})

			await axios.get( groupUserUrl, {
				headers: {
					Authorization: 'Bearer ' + User.getToken()
				}
			}).then( response => {
				let users = context.rootGetters['users/getUsers']
				let groupUser = response.data
				
				groupUser.map( group => {
					users.find( f => {
						
						if (f.id === group.user_id) {
							if ( f.groups === undefined || f.groups.length == 0) {
								f.groups = []
							}
							f.groups.push(group.group)									
						}
					})
				})

				context.commit("SETUSERS", users)
					
			})
			
		},
	},

	getters: {
		getUsers(state) {
			return JSON.parse(JSON.stringify(state.users))
		}
	}
}