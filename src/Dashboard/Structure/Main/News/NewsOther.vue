<template>
	<div class="news-other">
		<h4 class="text-value mb-4">{{ $t('message.MissedNews') }}</h4>
		<NewsSmall v-for="post in filteredPosts" :key="post.id" :post="post" class="mb-3"/>
	</div>
</template>
 
 
<script>
import NewsSmall from './NewsSmall.vue'

	export default {
		props: {
			excludedId: Number,
			posts: Array
		},
		data() {
			return {
				}
		},
		methods: {
			
		},
		computed: {
			filteredPosts() {
				let filteredPosts = this.posts.filter( post => post.id !== this.excludedId )
				return filteredPosts.slice(0, 4)
			}
		},
		components: { NewsSmall },
	}
</script>
 
 
<style lang='scss' scoped>
.news-other {
	max-width: 576px;
	margin: auto;
}
</style>