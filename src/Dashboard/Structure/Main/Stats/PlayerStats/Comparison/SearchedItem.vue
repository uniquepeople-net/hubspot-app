<template>
	<div class="searched-item mt-2 center-center justify-content-between">
		<div class="d-flex align-items-center">
			<img class="img" :src="imgSrc" :alt="name">
			<span>
				<p class="mb-0 text-data">{{ name }}</p>
				<p class="mb-0 text-sm-notice">{{ position }}</p>
			</span>
		</div>
		<Plus class="plus"/>
	</div>
</template>
 
 
<script>
	import Plus from '../../Vectors/Plus.vue'
	
	export default {
		props: [ 'imgSrc', 'name', 'position' ],
		data() {
			return {
				}
		},
		methods: {
			
		},
		components: { Plus },
	}
</script>
 
 
<style lang='scss' scoped>
.searched-item {
	.img {
		height: 64px;
		width: auto;
	}
	.text-sm-notice {
		color: var(--text-light-color);
	}
	.plus {
		color: var(--main-dark);
	}
}
</style>