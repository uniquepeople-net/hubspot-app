<template>
	<div>
		<PostsCarousel />
		<NewsCard />
		<PLayerSeasonStats v-if="user.instat_id"/>	
	</div>
</template>
 
 
<script>
	import NewsCard from '../FootballNews/NewsCard.vue'
	import PLayerSeasonStats from '../Stats/PlayerData/PLayerSeasonStats.vue'
	import PostsCarousel from './PostsCarousel.vue'
	import { mapGetters } from 'vuex'
	
	export default {
		data() {
			return {
				
				}
		},
		methods: {
			
		},
		computed: {
			...mapGetters({ user: 'user/user' })
		},
		components: { PostsCarousel, NewsCard, PLayerSeasonStats },
	}
</script>
 
 
<style lang='scss' scoped>
</style>