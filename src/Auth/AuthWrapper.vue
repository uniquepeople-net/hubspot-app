<template>
	<div id="auth">
		<div class="row h-100">
			<div class="col-lg-5 col-12">
				<div id="auth-left">
					<div class="auth-logo text-center">
						<a href="https://ufp.sk"><img src="https://ufp.sk/wp-content/uploads/2023/04/cropped-logo-transp.png" alt="Logo" class="logo"/></a>
					</div>
					
					<slot name="title"></slot>
				
					<slot name="body"></slot>
					
				</div>
			</div>
			<div class="col-lg-7 d-none d-lg-block">
				<div id="auth-right"></div>
			</div>
		</div>
	</div>
</template>
 
 
<script>
	export default {
		data() {
			return {
			}
		},
		methods: {
 
		},
	}
</script>
 
 
<style lang='scss' scoped>
	body{background-color:#fff}
	#auth{height:100vh;overflow-x:hidden}
	#auth #auth-right{background:url(../../assets/images/4853433.png?45649b87e0b3f50bfa1372c6cdb4595f),linear-gradient(90deg,#2d499d,#3f5491);height:100%}
	#auth #auth-left{padding:5rem 8rem}
	#auth #auth-left .auth-title{font-size:4rem;margin-bottom:1rem}
	#auth #auth-left .auth-subtitle{color:#a8aebb;font-size:1.7rem;line-height:2.5rem}
	#auth #auth-left .auth-logo{margin-bottom:3rem}
	#auth #auth-left .auth-logo img{height:5rem}
	@media screen and (max-width:767px) {
		#auth #auth-left{padding:5rem}
	}
	@media screen and (max-width:576px) { 
		#auth #auth-left{padding:4rem 3rem}
	}
</style>