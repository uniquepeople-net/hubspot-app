<template>
	<div>
		<div class="d-flex justify-content-center align-items-center vector-slot">
			<slot name="vector"></slot>
		</div>
		<slot name="title"></slot>
		<slot name="description" ></slot>
		<slot name="vector2"></slot>
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
.vector-slot {
	margin: 3rem 0 ;
	height: 160px;
}
</style>