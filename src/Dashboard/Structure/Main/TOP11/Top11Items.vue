<template>
	<div v-for="item in items" class="mb-3" :key="item.id">
		<router-link :to="{name: 'specific-top', params: {top_id: item.id} }" :item="item">
			<h5 class="text-value mb-3">{{item.season.season}}</h5>
			<div>
				<img :src="item.image_url" :alt="item.season.season" class="w-100 top-img">
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
.top-img {
	max-height: 250px;
	object-fit: cover;
	border-radius: var(--btn-border-radius);
}
@media(min-width: 576px) {
	.top-img {
		max-height: 300px;
	}
}
</style>