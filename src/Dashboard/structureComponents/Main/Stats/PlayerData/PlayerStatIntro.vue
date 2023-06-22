<template>
	<div class="app-card intro-card">
		<div>
			<h1 class="header-light text-start">{{ userDetails.lastName.toUpperCase() }}</h1>
			<div class="img-wrapper mt-4">
				<img :src="userDetails.currentTeam.imageDataURL" :alt="userDetails.currentTeam.officialName">
				<span class="ms-2 text-sm-bold">{{userDetails.currentTeam.officialName}}</span>
			</div>
		</div>
		<img v-if="userDetails.imageDataURL" class="photo" :src="userDetails.imageDataURL" :alt="userDetails.lastName">
		<img v-if="!userDetails.imageDataURL" class="photo" src="../../../../../../assets/images/sihouette.png" :alt="userDetails.lastName">
	</div>
</template>
 
 
<script>
	import { mapGetters } from 'vuex';

	export default {
		data() {
			return {
			}
		},
		computed: {
			...mapGetters({ userDetails: 'stats/playerDetails' })
		},
	}
</script>
 
 
<style lang='scss' scoped>
.intro-card {
	padding: 1rem .5rem;
	position: relative;
	.img-wrapper {
		max-width: 60%;
		display: flex;
		align-items: center;
		img {
			width: 2.5rem;
		}
		span {
			max-width: 18em;
		}
	}
	.photo {
		position: absolute;
		right: 0;
		bottom: 0;
	}
}
</style>