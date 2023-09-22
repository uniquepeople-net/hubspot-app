<template>
	<div class="searched-item mt-2 center-center justify-content-between">
		<div class="d-flex align-items-center">
			<img class="img me-2" :src="imgSrc" :alt="name">
			<span>
				<p class="mb-0 text-data">{{ name }}</p>
				<div class="d-flex">
					<img v-if="imgSrcClub" class="team-logo me-2" :src="imgSrcClub" :alt="team">
					<p class="mb-0 text-sm-notice">{{ team }}</p>
				</div>
			</span>
		</div>
		<Plus class="plus"/>
	</div>
</template>
 
 
<script>
	import Plus from '../../Vectors/Plus.vue'
	
	export default {
		props: [ 'imgSrc', 'imgSrcClub', 'name', 'team' ],
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
	cursor: pointer;
	.img {
		height: 44px;
		width: auto;
		min-width: 44px;
	}
	.text-sm-notice {
		color: var(--text-light-color);
	}
	.plus {
		color: var(--main-dark);
	}
	.team-logo {
		height: 15px;
		width: 15px;
	}
}
</style>