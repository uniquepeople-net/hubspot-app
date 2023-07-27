<template>
	<div>
		<router-link :to="{name: 'specific-post', params: {post_id: post.id}}">
			<img class="carousel-img" :src="post.yoast_head_json.og_image[0].url" :alt="post.title.rendered" />
			<h4 class="text-gt-bold mt-3 mb-1">{{ post.title.rendered }}</h4>
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
		height: 200px;
		object-fit: cover;
		margin: auto;
		border-radius: var(--btn-border-radius);
}

@media( min-width: 576px ) {
	.carousel-img {
			height: 300px;
			object-fit: cover;
			margin: auto;
	}
}
</style>