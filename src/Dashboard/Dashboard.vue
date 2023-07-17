<template>
	<div v-if="show" class="dashboard">
		<Sidebar />

		<div id="main" :class="activeSidebar ? 'main-active-sidebar' : ''">
			<NavHeader class="navbar"/>	
			
			<router-view></router-view>
			<!-- <router-view v-slot="{ Component }">
				<transition name="fade">
					<component :is="Component" />
				</transition>
			</router-view> -->
		</div>
	</div>
</template>
 
<script>	
	import { mapGetters } from 'vuex'; 
	import Sidebar from './structureComponents/Sidebar/Sidebar.vue'
	import NavHeader from './structureComponents/NavHeader/NavHeader.vue';

	export default {
		created() {	
			if (!User.loggedIn()) {
				this.$router.push({ name: 'intro' })				
			} else {			
				let currentRoute = this.$router.currentRoute._value.name;
				
				// check the first login of newly registered user
				if ( this.loginUser && this.loginUser.first_login === true ) {
					this.$router.push({ name: 'tutorial' })
				} else {
					if ( currentRoute === 'dashboard' ) {
						this.$router.push({ name: 'my-board' })
					} else {
						this.$router.push({ name: currentRoute })
					}
				}
		
				this.$store.dispatch("user/getUser");
			}
			/* const cookies = document.cookie.split('; ');
			const jwtCookie = cookies.find(cookie => cookie.startsWith('jwt='));			
			const token = jwtCookie ? jwtCookie.substring(4) : null;
			console.log(cookies) */
			
		},
		data() {
			return{
				show: false, 
			}
		},
		computed: {
			...mapGetters({ loginUser: 'user/loginUser',
							unAuth: 'user/unAuth',
							user: 'user/user',
							activeSidebar: 'appData/activeSidebar'}),
		},
		watch: {
			user: function (data) {
				if ( data.role_id ) {
					this.show = true
					if ( this.user.instat_id ) {
						this.$store.dispatch('stats/getPlayerDetails', this.user.instat_id )
					}
				}
			},
			unAuth: function(data) {
				if ( data ) {
					this.$router.push({ name: 'logout' })
				}
			}
		},
		components: { NavHeader, Sidebar }
	}
</script>
 
 
<style lang='scss' scoped>
.dashboard {
	//background-color: rgb(243, 243, 243);
	min-height: 100vh;
}
#main {
	padding: 1rem 1rem;
	transition: all .2s ease-in-out;
	.navbar {
		display: flex;
		justify-content: flex-end;
	}
}
@media(min-width: 991px) {
	#main {
		padding: 1rem 2rem;
	}
	.main-active-sidebar {
		margin-left: 12rem;
	}
}
/* .fade-enter-active {
	transition: all .8s;
}
.fade-leave-active {
  	transition: all 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  scale: .99;
} */
</style>
