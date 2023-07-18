<template>
	<div id="auth">
		<div class="row h-100">
			<div class="col-lg-12 col-12">
				<div id="auth-left" class="position-relative">
					<BackButton v-if="!loginPage" class="back-button" route="login"/>
					<NavLang class="auth-lang"/>

					<div class="auth-logo text-center" >
						<a href="https://ufp.sk" v-if="!vectorImg">
							<img src="https://ufp.sk/wp-content/uploads/2023/04/cropped-logo-transp.png" alt="Logo" class="logo"/>
						</a>
						<QuestionPhone  v-if="vectorImg"/>
					</div>

					
					<slot name="title"></slot>
				
					<slot name="body"></slot>
					
					<slot name="footer"></slot>
				</div>
			</div>
			<!-- <div class="col-lg-7 d-none d-lg-block">
				<div id="auth-right"></div>
			</div> -->
		</div>
	</div>
</template>
 
 
<script>
	import BackButton from '../Dashboard/global/BackButton.vue'
	import QuestionPhone from '../Dashboard/structureComponents/Main/Stats/Vectors/QuestionPhone.vue'
	import NavLang from '../Dashboard/structureComponents/NavHeader/NavLang.vue'

	
	export default {
		created() {
			let route = this.$route.name
			if ( route === 'forgot' ) {
				this.vectorImg = true
			}
			if ( route !== 'login' && route !== 'intro') {
				this.loginPage = false
			}
		},
		data() {
			return {
				vectorImg: false,
				loginPage: true
			}
		},
		methods: {
			
		},
		components: { NavLang, QuestionPhone, BackButton },
	}
</script>
 
 
<style lang='scss' scoped>
	body{background-color:#fff}
	#auth{height:100vh;overflow-x:hidden}
	#auth #auth-right{background:url(../../assets/images/4853433.png?45649b87e0b3f50bfa1372c6cdb4595f),linear-gradient(90deg,#2d499d,#3f5491);height:100%}
	#auth #auth-left{padding:5rem 8rem}
	#auth #auth-left .auth-title{font-size:4rem;margin-bottom:1rem}
	#auth #auth-left .auth-subtitle{color:#a8aebb;font-size:1.7rem;line-height:2.5rem}
	#auth #auth-left .auth-logo{margin-bottom:2rem}
	#auth #auth-left .auth-logo img{height:14rem}
	@media screen and (max-width:767px) {
		#auth #auth-left{padding:5rem}
	}
	@media screen and (max-width:576px) { 
		#auth #auth-left{padding:4rem 3rem}
	}
	.auth-lang {
		position: absolute;
		top: 1.5rem;
		right: 1.5rem;
	}
	#auth-left {
		max-width: 768px;
		margin: auto;
	}
</style>