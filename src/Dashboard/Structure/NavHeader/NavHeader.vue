<template>
	<header class="mb-3 d-flex justify-content-end">

		<!-- <NavLang class="nav-lang"/> -->

		<nav class="navbar navbar-expand navbar-light navbar-top">
			<div class="container-fluid">
				
				<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
					<span class="navbar-toggler-icon"></span>
				</button>
				<div class="collapse navbar-collapse" id="navbarSupportedContent">
					<ul class="navbar-nav ms-auto mb-lg-0 align-items-center">
						
						<NavWarning v-if="!user.fee" :linkTo="'wallet-checkout'"/>

						<NavMessages />

						<NavProfile />

					</ul>
				</div>
			</div>
		</nav>
	</header>
</template>
 
 
<script>
	import NavMessages from './NavMessages.vue'
	import NavProfile from './NavProfile.vue'
	import NavWarning from './NavWarning.vue'
	import { mapGetters } from 'vuex'
	import NavLang from './NavLang.vue'

	export default {
		created() {
			if ( this.user.instat_id ) {
				this.$store.dispatch("stats/getPlayerDetails", this.user.instat_id);
			}
		},
		computed: {
			...mapGetters({ user: 'user/user' }),
		},
		components: { NavProfile, NavMessages, NavWarning, NavLang },
	}
</script>
 
 
<style lang='scss' scoped>
.nav-lang {
	margin-left: 5rem;
}
/* @media( min-width: 992px ) {
	.nav-lang {
		margin-left: 0rem;
	}
} */
</style>