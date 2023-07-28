<template>
	<div class="spec-post">
		<BackButton class="mb-4" route="news-list" :title="$t('message.News')" position="relative"/> 

		<div v-if="post" >
			<h4 class="text-bg-bold">{{ post.title.rendered }}</h4>
			<div class="d-flex justify-content-between mt-4">
				<span class="text-light-gray">{{formatDateToSk(post.modified)}}</span>
				<span class="share-btn">
					{{ $t('message.Share') }}
					<Share class="ms-1"/>
				</span>
			</div>
			<div class="position-relative img-wrapper my-4">
				<img class="carousel-img" :src="post.yoast_head_json.og_image[0].url" :alt="post.title.rendered" />
			</div>
			<div v-html="content"></div>


			<Galleria v-if="images" :value="images" :responsiveOptions="responsiveOptions" :circular="true" containerStyle="max-width: 800px">
				<template #item="slotProps">
					<Image :src="fullSizeImage(slotProps.item.imageSrc)" :alt="post.title.rendered" imageStyle="width: 100%; display: block" preview class="w-100"/>
				</template>
				<template #thumbnail="slotProps">
					<img :src="slotProps.item.imageSrc" :alt="post.title.rendered" style="display: block; width:100%" />
				</template>
			</Galleria>
			
			<Divider class="my-4"/>
		</div>

		<NewsOther v-if="posts && post" :excludedId="post.id" :posts="posts"/>

		<LoadingIcon v-if="!post" />
	</div>
</template>
 
 
<script>
	import { mapGetters } from 'vuex'
	import LoadingIcon from '../../../global/LoadingIcon.vue';
	import Share from '../Stats/Vectors/Share.vue';
	import Galleria from 'primevue/galleria';
	import Image from 'primevue/image';
	import NewsOther from './NewsOther.vue';

	import { ref, watchEffect, getCurrentInstance  } from 'vue';
	import { useRoute } from 'vue-router';
	import { useStore } from 'vuex';
	import BackButton from '../../../global/BackButton.vue';

	export default {
		setup() {
			const route = useRoute();
			const currentPath = ref(route.path);
			const currentParams = ref(route.params);

    		const store = useStore()

			// Watch for changes in the router path and route parameters
			watchEffect(() => {
				if (currentPath.value !== route.path) {
					// The router path has changed, perform your logic here
					store.dispatch("news/clearArticle");
					store.dispatch("news/getSpecArticle", route.params.post_id);
					currentPath.value = route.params; // Update the currentPath ref for future comparison
				}
			});
			// Other setup logic for your component
			return {};
		},
		created() {
			this.$store.dispatch("news/getSpecArticle", this.id);
			this.$store.dispatch("news/getUfpNews");
		},
		unmounted() {
			this.$store.dispatch("news/clearArticle");
		},
		data() {
			return {
				id: this.$route.params.post_id,
				responsiveOptions: [
					{
						breakpoint: '991px',
						numVisible: 4
					},
					{
						breakpoint: '767px',
						numVisible: 3
					},
					{
						breakpoint: '575px',
						numVisible: 2
					}
				],
			}
		},
		methods: {
			formatDateToSk(date) {
				return Helpers.formatDateToSk(date)
			},
			fullSizeImage(url) {
				return url.replace('thumbs/thumbs_', '')
			},
		},
		computed: {
			...mapGetters({ post: 'news/specificPost',
							posts: 'news/ufpNews', }),
			images() {
				const regex = /<(img)[^>]*\bsrc=["']([^"']+)["']/g;				
				const images = [];
				let match;

				while ((match = regex.exec(this.post.content.rendered)) !== null) {
					images.push({imageSrc: match[2]});
				}
				return images
			},
			content() {
				const regex = /<(img)[^>]*\bsrc=["']([^"']+)["'][^>]*>/g;

				const noImagesContent = this.post.content.rendered.replace(regex, (match, tag, src) => {
				if (src.includes("/gallery/")) {
					// If the image src contains "/gallery/", remove the image tag
					return '';
				} else {
					// Otherwise, keep the image tag as it is
					return match;
				}
				});

				return noImagesContent
			},
		},
		watch: {
		id: function(data) {
			console.log('changed:', this.id) 
			
		}
	},
		components: { Share, LoadingIcon, Galleria, Image, NewsOther, BackButton },
	}
</script>
 
 
<style lang='scss' scoped>
.spec-post {
	position: relative;
	max-width: 576px;
	margin: auto;
	.share-btn {
		cursor: pointer;
	}
	.img-wrapper {
		height: 210px;
		.carousel-img {
			height: 210px;
			width: calc(100% + 2rem);
			max-width: calc(100% + 2rem);
			object-fit: cover;
			position: absolute;
			left: -1rem;
		}
	}
	:deep(.p-image-preview-indicator) {
		max-width: 100% !important;
	}
}

@media( min-width: 576px ) {
	.spec-post {
		.img-wrapper {
			height: 300px;
			.carousel-img {
				height: 300px;
			}
		}
	}
}
</style>