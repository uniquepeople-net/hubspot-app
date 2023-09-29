<template>
	<div>
		<BackButton :title="$t('message.Stats')" class="mb-4" route="my-board"/>
		<div class="row justify-content-center">
			<div class="col-12 col-lg-6">
				<MatchSelects class="mb-4" :seasons="seasons" :matches="matches"
							  :btnLabel="$t('message.Playerstats')" btnRoute="player"/>

				<MatchCard :displayMatchStats="true"/>
			</div>
		</div>
	</div>
</template>
 
 
<script>
	import { mapGetters } from 'vuex';
	import MatchSelects from '../MatchSelects.vue'
	import MatchCard from '../Global/MatchCard.vue'
	import BackButton from '../../../../global/BackButton.vue';

	export default {
		data() {
			return {
			}
		},
		methods: {
 
		},
		computed: {
			...mapGetters({ matches: 'stats/playerMatches',
							seasons: 'stats/playerCareer' }),
		},
		components: { MatchSelects, MatchCard, BackButton },
	}
</script>
 

<style lang='scss' scoped>
</style>