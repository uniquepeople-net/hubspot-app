<template>
	<div v-for="item in items" class="mb-3" :key="item.id">
		<router-link :to="{name: 'specific-top', params: {top_id: item.id} }" :item="item">
			<h5 class="text-value mb-3">{{item.season.season}}</h5>
			<div>
				<img :src="item.image_url" :alt="item.season.season" class="w-100">
			</div>
		</router-link>
	</div>		
</template>
 
 
<script>
	export default {
		props: {
			items: Array
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
</style>