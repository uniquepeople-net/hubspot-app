<template>
	<div>
		<PostsCarousel />
		<NewsCard class="mt-1 mt-lg-3"/>
	</div>
</template>
 
 
<script>
	import NewsCard from '../FootballNews/NewsCard.vue'
	import PostsCarousel from './PostsCarousel.vue'
	
	export default {
		data() {
			return {
				
				}
		},
		methods: {
			
		},
		components: { PostsCarousel, NewsCard },
	}
</script>
 
 
<style lang='scss' scoped>
</style>