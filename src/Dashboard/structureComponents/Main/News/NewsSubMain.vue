<template>
	<div class="mb-4">
		<router-link :to="{name: 'specific-post', params: {post_id: post.id}}">
			<img class="carousel-img" :src="post.yoast_head_json.og_image[0].url" :alt="post.title.rendered" />
			<h4 class="text-link mt-2 mb-0">{{ post.title.rendered }}</h4>
			<span class="text-light-gray">{{formatDateToSk(post.modified)}}</span>
		</router-link>
	</div>
</template>
 
 
<script>
	export default {
		props: {
			post: Object
		},
		data() {
			return {
			}
		},
		methods: {
			formatDateToSk(date) {
				return Helpers.formatDateToSk(date)
			}
		},
	}
</script>
 
 
<style lang='scss' scoped>
.carousel-img {
		width: 100%;
		height: 140px;
		object-fit: cover;
		margin: auto;
		border-radius: 4px;
}

@media( min-width: 576px ) {
	.carousel-img {
		height: 250px;
		object-fit: cover;
		margin: auto;
	}
}
</style>