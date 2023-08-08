<template>
	<div>
		<BackButton title="TOP 11" route="top-11-list" class="mb-4"/>
		<div class="sm-width-screen">
			<div class="" v-if="item">
				<h5 class="text-value mb-3">{{item.season.season}}</h5>
				<img :src="item.image_url" :alt="item.season.season" class="w-100">
				
				<h5 class="text-value mt-5 mb-2">{{ $t('message.Goalkeeper') + ':' }}</h5>
				<p class="mb-1">{{ item.goalkeeper }}</p>

				<div v-for="position in positions">
					<h5 class="text-value mt-4 mb-2">{{ $t(`message.${firstLetterUpperCase(position)}`) + ':' }}</h5>
					<p class="mb-1" v-for="player in item[position]">{{ player }}</p>
				</div>

			</div>
			<LoadingIcon v-if="!item"/>
		</div>
	</div>
</template>
 
 
<script>
	import { mapGetters } from 'vuex'
	import BackButton from '../../../global/BackButton.vue';
	import LoadingIcon from '../../../global/LoadingIcon.vue';

	export default {
		created() {
			this.$store.dispatch("surveys/getSurveysTop11Spec", this.id);
		},
		data() {
			return {
				id: this.$route.params.top_id,
				positions: [ 'defenders', 'midfielders', 'strikers' ]
			}
		},
		methods: {
			firstLetterUpperCase(str) {
				if (typeof str !== 'string' || str.length === 0) {
					return str; // Return the original string if it's not a valid non-empty string
				}
				return str.charAt(0).toUpperCase() + str.slice(1);
			}
		},
		computed: {
			...mapGetters({ item: 'surveys/surveysTop11Spec' })
		},
		components: { LoadingIcon, BackButton },
	}
</script>
 
 
<style lang='scss' scoped>
</style>