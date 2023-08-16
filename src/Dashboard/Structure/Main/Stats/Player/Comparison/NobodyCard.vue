<template>
	<div class="nobody-card h-100" @click="addPlayer">
		<div>
			<h5 class="text-gt-bold mb-0">ADD A PLAYER</h5>
			<Plus />
		</div>
		<div class="text-end">
			<img class="img" src="../../../../../../../assets/images/silhouette2.png" alt="">
		</div>		
	</div>
</template>
 
 
<script>
	import Plus from '../../Vectors/Plus.vue'

	export default {
		data() {
			return {
				}
		},
		methods: {
			addPlayer() {
				this.$emit('addPlayer', true)
			}
		},
		components: { Plus },
	}
</script>
 
 
<style lang='scss' scoped>
.nobody-card { 
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	cursor: pointer;
	.text-gt-bold {
		color: var(--text-light-color);
	}
	.img {
		height: 80px; 
		width: auto;
	}
}
</style>