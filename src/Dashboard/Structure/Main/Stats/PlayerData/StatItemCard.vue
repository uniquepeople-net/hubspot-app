<template>
	<div class="app-card stat-item-card">
		<div class="d-flex align-items-center">
			<slot name="icon"></slot>
			<span class="ms-3">{{title}}</span>
		</div>
		<p class="text-gt-bold mt-2 mb-0">{{value}}</p>
	</div>
</template>
 
 
<script>
	import Stadion from '../Vectors/Stadion.vue'
	
	export default {
		props: ['title', 'value'],
		data() {
			return {
				}
		},
		methods: {
			
		},
		components: { Stadion },
	}
</script>
 
 
<style lang='scss' scoped>
.stat-item-card {
	padding: .5rem 1rem;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}
</style>