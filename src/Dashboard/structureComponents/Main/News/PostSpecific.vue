<template>
	<div>
		<div v-if="post" class="spec-post">
			<h4 class="text-bg-bold">{{ post.title.rendered }}</h4>
			<div class="d-flex justify-content-between mt-4">
				<span class="text-light-gray">{{formatDateToSk(post.modified)}}</span>
				<span>
					{{ $t('message.Share') }}
					<Share class="ms-1"/>
				</span>
			</div>
			<div class="position-relative img-wrapper my-4">
				<img class="carousel-img" :src="post.yoast_head_json.og_image[0].url" :alt="post.title.rendered" />
			</div>
			<div v-html="post.content.rendered"></div>

			<Divider />

			<Video v-if="checkVideoExists(post.content.rendered)" 
						   :src="'empty'" 
						   :width="320"
						   :height="200"
						   :poster="'empty'"/>

		</div>

		<LoadingIcon v-if="!post" />
	</div>
</template>
 
 
<script>
	import { mapGetters } from 'vuex'
	import LoadingIcon from '../../../global/LoadingIcon.vue';
	import Video from '../../../global/Video.vue';
	import Share from '../Stats/Vectors/Share.vue';

	export default {
		created() {
			this.$store.dispatch("news/getSpecArticle", this.id);
		},
		unmounted() {
			this.$store.dispatch("news/clearArticle");
		},
		data() {
			return {
				id: this.$route.params.post_id
			}
		},
		methods: {
			formatDateToSk(date) {
				return Helpers.formatDateToSk(date)
			},
			checkVideoExists(content) {
				const youtubeVideoRegex = /https?:\/\/(?:www\.)?youtube(?:-nocookie)?\.(?:com|be)\/(?:watch\?v=|embed\/|v\/|watch\?.+&v=)?([\w-]{11})/gi;
				const matches = content.match(youtubeVideoRegex);
				
				console.log(matches)
				

				if (matches) {
					return matches;
					let videoUrl = matches.map(match => this.getEmbeddedVideoUrl(match));
				}
			},
			getEmbeddedVideoUrl(url) {
				const videoId = this.extractVideoIdFromUrl(url);
				return `https://www.youtube.com/embed/${videoId}`;
			},
			extractVideoIdFromUrl(url) {
				const videoIdRegex = /https?:\/\/(?:www\.)?youtube(?:-nocookie)?\.(?:com|be)\/(?:watch\?v=|embed\/|v\/|watch\?.+&v=)?([\w-]{11})/;
				const match = url.match(videoIdRegex);
				return match ? match[1] : '';
			},
		},
		computed: {
			...mapGetters({ post: 'news/specificPost' })
		},
		components: { Share, Video },
	}
</script>
 
 
<style l
LoadingIconang='scss' scoped>
.spec-post {
	position: relative;
	max-width: 576px;
	margin: auto;
	.img-wrapper {
		height: 210px;
		.carousel-img {
			height: 210px;
			width: calc(100% + 2rem);
			object-fit: cover;
			position: absolute;
			left: -1rem;
		}
	}
}
@media( min-width: 576px ) {
	.spec-post {
		.carousel-img {
			height: 300px;
		}
	}
}
</style>