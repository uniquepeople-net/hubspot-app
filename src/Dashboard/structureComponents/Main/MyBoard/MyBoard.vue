<template>
	<div>
		<PostsCarousel />
		<NewsCard />
		<PLayerSeasonStats />	
	</div>
</template>
 
 
<script>
	import NewsCard from '../FootballNews/NewsCard.vue'
	import PLayerSeasonStats from '../Stats/PlayerData/PLayerSeasonStats.vue'
	import PostsCarousel from './PostsCarousel.vue'
	
	export default {
		data() {
			return {
				
				}
		},
		methods: {
			
		},
		components: { PostsCarousel, NewsCard, PLayerSeasonStats },
	}
</script>
 
 
<style lang='scss' scoped>
</style>