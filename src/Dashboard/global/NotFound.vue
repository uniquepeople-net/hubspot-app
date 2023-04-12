<template>
	<div class=" not-found-screen">
		<div class="d-flex align-items-center flex-column pt-5">
	        <a href="https://ufp.sk">
	            <img class="img-ufp" src="https://ufp.sk/wp-content/uploads/2023/04/cropped-logo-transp.png" alt="">
	        </a>
	    </div>
		<div class="mx-3">
			<Card class="card mt-5 mx-auto">
				<template #content>
					<div class="center-center flex-column">
						<div class="text-center p-5 ">
							<h1>404</h1>
							<h2>This page is not found</h2>
						</div>
			
						<Button label="Home" @click="redirect()"/>
					</div>
				</template>
			</Card>
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
			redirect() {
				this.$router.push({ name: 'my-board' })
			}
		},
	}
</script>
 
 
<style lang='scss' scoped>
.not-found-screen {
	width: 100vw;
	height: 100vh;
	.card {
		max-width: 768px;
	}
}
.img-ufp {
    max-width: 120px;
}
</style>