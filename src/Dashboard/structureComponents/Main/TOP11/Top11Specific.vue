<template>
	<div class="sm-width-screen">
		<div class="" v-if="item">
			<h5 class="text-value mb-3">{{item.season.season}}</h5>
		</div>
		<LoadingIcon v-if="!item"/>
	</div>
</template>
 
 
<script>
	import { mapGetters } from 'vuex'
	import LoadingIcon from '../../../global/LoadingIcon.vue';

	export default {
		created() {
			this.$store.dispatch("surveys/getSurveysTop11Spec", this.id);
		},
		data() {
			return {
				id: this.$route.params.top_id,
			}
		},
		methods: {
			
			},
		computed: {
			...mapGetters({ item: 'surveys/surveysTop11Spec' })
		},
		components: { LoadingIcon },
	}
</script>
 
 
<style lang='scss' scoped>
</style>