<template>
	<div>
		<h5 class="mb-5">{{question.title}}</h5>
		<Rating v-model="value" :stars="question.opinion_sc_levels" onIcon="bi bi-star-fill" offIcon="bi bi-star" :cancel="false"/>
	</div>
</template>
 
 
<script>
	import Rating from 'primevue/rating';

	export default {
		props: {
			question: Object
		},
		data() {
			return {
				value: null
			}
		},
		methods: {
 
		},
		components: { Rating }
	}
</script>
 
 
<style lang='scss' scoped>
</style>