<template>

	<div class="sidebar-x">
		<i class="pi pi-bars"></i>
	</div>

</template>
 
 
<script>
	export default {
		data() {
			return {
			}
		},
		methods: {
 
		},
	}
</script>
 
 
<style lang='scss' scoped>
	.sidebar-x {
		position: absolute;
		top: 35px;
		left: 1rem;
		padding: 0rem 1rem;
		//border: 1px solid #6c757d;
		border-radius: 8px;
		z-index: 999;
		cursor: pointer;
		& i {
			font-size: 24px;
			margin-top: 7px;
		}
	}
</style>