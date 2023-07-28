<template>
	<div>
		<PostsCarousel />
		<SquareMenu class="mt-4"/>
	</div>
</template>
 
 
<script>
	import PostsCarousel from "../News/PostsCarousel.vue"
	import SquareMenu from './SquareMenu.vue'

	export default {
		data() {
			return {
				}
		},
		methods: {
			
		},
		components: { PostsCarousel, SquareMenu }
	}
</script>
 
 
<style lang='scss' scoped>
</style>