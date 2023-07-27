<template>
	<div>
		<Carousel :value="posts" :showNavigators="false" :showIndicators="false"
				  :responsiveOptions="responsiveOptions" class="custom-carousel" :circular="true" 
				  :autoplayInterval="60000" v-if="posts">
			<template #header>
				<h5 class="text-value mb-4 text-gt-bold">{{$t("message.ufpNews")}}</h5>
			</template>
			<template #item="slotProps">			
					<div class="post-item mx-1 mx-sm-3 card">
						<a :href="slotProps.data.link">
							<div class="post-item-content">
								<div>
									<img class="carousel-img" :src="slotProps.data.yoast_head_json.og_image[0].url" :alt="slotProps.data.title.rendered" />
								</div>
								<div>
									<h6 class="mb-1 p-3">{{slotProps.data.title.rendered}}</h6>					
								</div>
							</div>
						</a>
					</div>	
			</template>
		</Carousel>
	
		<LoadingIcon v-if="!posts" :title="$t('message.posts')"/>
	</div>
</template>
 
 
<script>
	import { mapGetters } from 'vuex'

	export default {
		created() {
			this.$store.dispatch("news/getUfpNews");
		},
		data() {
			return {
				//posts: null,
				responsiveOptions: [
					{
						breakpoint: '3200px',
						numVisible: 4,
						numScroll: 1
					},
					{
						breakpoint: '2000px',
						numVisible: 3,
						numScroll: 1
					},
					{
						breakpoint: '1200px',
						numVisible: 2,
						numScroll: 1
					},
					{
						breakpoint: '576px',
						numVisible: 1,
						numScroll: 1,
					}
				]
			}
		},
		methods: {
 
		},
		computed: {
			...mapGetters({ posts: 'news/ufpNews' })
		}
	}
</script>
 
 
<style lang='scss' scoped>
.custom-carousel {
	:deep(.p-carousel-items-content) {
		padding-bottom: .5rem;
	}
	:deep(.p-carousel-indicators) {
		.p-link {
			min-width: 1.5rem;
			height: 1.5rem;
			border-radius: var(--btn-border-radius);
		}
		.p-highlight button{
			background: var(--input-border-color);
			box-shadow: 0 0 0 0.2rem var(--card-shadow);
		}
	}
	:deep(.carousel-img) {
		width: 100%;
		height: 200px;
		object-fit: cover;
		margin: auto;
	}
	.post-item {
		background: var(--card-bg);
	}
}

@media( min-width: 576px ) {
	.custom-carousel {
		:deep(.carousel-img) {
			height: 300px;
			object-fit: cover;
			margin: auto;
		}
		.post-item {
			height: 100%;
		}
	}
}
</style>