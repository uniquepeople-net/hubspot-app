<template>
	<Carousel :value="posts" :numVisible="3" :numScroll="1" :showNavigators="false" 
			  :responsiveOptions="responsiveOptions" class="custom-carousel" :circular="false" 
			  :autoplayInterval="7000" :showIndicators="true">
		<template #header>
			<h5 class="mb-4">{{$t("message.ufpNews")}}</h5>
		</template>
		<template #item="slotProps">
			
				<div class="post-item">
					<a :href="slotProps.data.link">
						<div class="post-item-content text-center">
							<div class="mb-3">
								<img class="carousel-img" :src="slotProps.data.yoast_head_json.og_image[0].url" :alt="slotProps.data.title.rendered" />
							</div>
							<div>
								
									<h5 class="mb-1">{{slotProps.data.title.rendered}}</h5>
														
							</div>
						</div>
					</a>
				</div>
			
		</template>
	</Carousel>

	<LoadingIcon v-if="!posts"/>

</template>
 
 
<script>
	export default {
		created() {
			axios.get('https://ufp.sk/wp-json/wp/v2/posts')
				.then( response => this.posts = response.data )
				.catch( error => {
					Toast.fire({
						icon: 'error',
						timer: 5000,
						title: "Couldn't load UPF feed"
					})
				} )
		},
		data() {
			return {
				posts: null,
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
	}
</script>
 
 
<style lang='scss' scoped>
.custom-carousel {
	:deep(.carousel-img) {
		width: 100%;
		height: 200px;
		object-fit: cover;
		margin: auto;
		border-radius: 15px;
	}
}

@media( min-width: 576px ) {
	.custom-carousel {
		:deep(.carousel-img) {
			width: 90%;
			height: 350px;
			object-fit: cover;
			margin: auto;
		}
	}
}
</style>