<template>
	<div class="news-page">
		
		<!-- <PLayerSeasonStats v-if="user.instat_id"/> -->
		<NewsMain v-if="posts" :post="posts[0]"/>

		<Divider v-if="posts" class="my-4"/>

		<NewsSubMain v-if="posts" v-for="post in subMainPosts" :key="post.id" :post="post"/>

		<Divider v-if="posts" class="my-4"/>

		<NewsSmall v-if="posts" v-for="post in smallPosts" :key="post.id" :post="post" class="mb-3"/>

		<div class="text-center mt-5">
			<Button v-if="posts" :label="$t('message.More')" class="btn-black" :loading="loading" @click="loadMore"/>
		</div>
		<LoadingIcon v-if="!posts" :title="$t('message.posts')"/>
	</div>
</template>
 
 
<script>
	import PLayerSeasonStats from '../Stats/PlayerData/PLayerSeasonStats.vue'
	import { mapGetters } from 'vuex'
	import NewsMain from './NewsMain.vue'
	import NewsSubMain from './NewsSubMain.vue'
	import LoadingIcon from '../../../global/LoadingIcon.vue'
	import NewsSmall from './NewsSmall.vue'

	export default {
		created() {
			this.$store.dispatch("news/getUfpNews");
		},
		data() {
			return {
				page: 2
			}
		},
		methods: {
			loadMore() {
				this.$store.dispatch("news/loadMoreUfpNews", this.page);
				this.page += 1
			}
		},
		computed: {
			...mapGetters({ user: 'user/user',
							posts: 'news/ufpNews',
							loading: 'news/loading' }),
			subMainPosts() {
				return this.posts.filter( ( post, index ) => index === 1 || index === 2 )
			},
			smallPosts() {
				return this.posts.filter( ( post, index ) => index !== 0 && index !== 1 && index !== 2 )
			}
		},
		components: { PLayerSeasonStats, NewsMain, NewsSubMain, LoadingIcon, NewsSmall },
	}
</script>
 
<style lang='scss' scoped>
.news-page {
	max-width: 576px;
	margin: auto;
}

</style>