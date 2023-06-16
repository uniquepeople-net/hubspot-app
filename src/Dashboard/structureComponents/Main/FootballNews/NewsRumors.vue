<template>
	<div class="news">
		<TabMenu class="mb-4"/>
	
		<Card v-if="redditNews" class="mb-1" v-for="news in redditNews">
			<template #header>
				<span class="ms-3 fw-light">{{ timeBeforePosted(news.data.created_utc) }}  ago</span>
			</template>
			<template #title>
				<h5>{{ news.data.title }}</h5>
				<span class="news-link fw-lighter"><a :href="news.data.url">{{ linkToNews(news.data.url) }} <i v-if="linkToNews(news.data.url)" class="bi bi-box-arrow-up-right"></i></a></span>
			</template>
			<template #content>
				<div class="media-wrapper">
					<Video v-if="checkVideoExists(news.data.secure_media)" 
						   :src="news.data.secure_media.reddit_video.fallback_url" 
						   :width="news.data.secure_media.reddit_video.width"
						   :height="news.data.secure_media.reddit_video.height"
						   :poster="news.data.secure_media.reddit_video.scrubber_media_url"/>
					
					<img class="news-img" :src="news.data.url" alt="">

					<Tweet v-if="checkTwitterExists(news.data.secure_media)" :tweet-id="tweetId(news.data.secure_media.oembed.url)" cards="visible" class="tweet">
						<template v-slot:loading>
							<div class="spinner-grow" role="status"></div>
						</template>
					</Tweet>				
				</div>
				
			</template>
		</Card>

		<LoadingIcon v-if="!redditNews"/>
		
	</div>
</template>
 
 
<script>
	import { mapGetters } from 'vuex'
	import TabMenu from './TabMenuNews.vue';
	import Video from '../../../global/Video.vue';
	import Tweet from 'vue-tweet'

	export default {
		created() {
			this.$store.dispatch("news/getRedditNews", 'hot');
		},
		data() {
			return {
				currentTime: Date.now(),
				player: null
			}
		},
		methods: {
			timeBeforePosted(time) {				
				return Helpers.timeBeforePosted(time)
			},
			linkToNews(link) {
				if (Helpers.isValidHttpUrl(link)) {
					let url = new URL(link)
					let truncatedUrl = (url.hostname + url.pathname).slice(0, 25) + '...'		
					return truncatedUrl
				} else return ''
			},
			checkVideoExists(data) {
				var check = (data || {}).reddit_video;
				return check
			},
			checkTwitterExists(data) {
				var check = ((data || {}).oembed|| {}).provider_name === 'Twitter' ? true : false;
				return check
			},
			tweetId(url) {
				let tweetId = url.substring(url.lastIndexOf('/') + 1)
				return tweetId.toString()	
			}

		},
		computed: {
			...mapGetters({ redditNews: 'news/redditNews' })			
		},
		components: { TabMenu, Video, Tweet }

	}
</script>
 
 
<style lang='scss' scoped>
.news {
	max-width: 768px;
	margin: auto;
	.news-link {
		margin-left: 2rem;
		font-size: .8rem;
		color: var(--cyan-500);
	}
	.media-wrapper {
		display: flex;
		justify-content: center;
	}
	.news-img {
		width: auto;
		max-height: 320px;
		max-width: 100%;
	}
	:deep(.tweet) {
		width: 100%;
	}
}
</style>