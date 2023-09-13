<template>
	<div class="goal-net">
		<img src="../../../../../../../assets/images/Goal-Net-c.png" alt="" width="366">
		<span class="shot">x</span>
	</div>
</template>
 
 
<script>
	export default {
		props: {
			shot: Object,
			zone: String,

		},
		data() {
			return {
			}
		},
		methods: {
 
		},
	}
</script>
 
 
<style lang='scss' scoped>
.goal-net {
	position: relative;
	padding-top: 3rem;
	.shot {
		position: absolute;
	}
}
</style>