<template>
		<router-link :to="{name: 'specific-post', params: {post_id: post.id}}" class="row">
			<div class="col-8">
				<h4 class="text-link mb-0">{{ post.title.rendered }}</h4>
				<span class="text-light-gray">{{formatDateToSk(post.modified)}}</span>
			</div>
			<div class="col-4 center-center">
				<img class="carousel-img" :src="post.yoast_head_json.og_image[0].url" :alt="post.title.rendered" />
			</div>
		</router-link>
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
	height: 90px;
	object-fit: cover;
	border-radius: var(--btn-border-radius);
}
@media( min-width: 576px ) {
	.carousel-img {
		height: 120px;
		margin: auto;
	}
}
</style>