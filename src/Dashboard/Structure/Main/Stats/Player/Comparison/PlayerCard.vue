<template>
	<div class="player-comp-card h-100 d-flex flex-column">
		<h5 class="header-main-bold mb-0">{{ firstName ? firstName.toUpperCase() : firstName }}</h5>
		<h5 class="text-gt-bold">{{ lastName ? lastName.toUpperCase() : lastName }}</h5>
		<div class="d-flex align-items-center">
			<img class="club-logo" :src="clubImgSrc" alt="" />
			<span class="text-sm-notice ms-2">{{ clubName }}</span>
		</div>
		<div class="text-end mt-auto">
			<img class="img" :src="playerImgSrc" alt="">
		</div>	
	</div>
</template>
 
 
<script>
	export default {
		props: [ 'firstName', 'lastName', 'clubName', 'clubImgSrc' , 'playerImgSrc' ],
		data() {
			return {
			}
		},
		methods: {
 
		},
	}
</script>
 
 
<style lang='scss' scoped>
.player-comp-card {
	.club-logo {
		height: 38px;
		width: auto;
	}
	.img {
		height: 80px; 
		width: auto;
	}
}
</style>