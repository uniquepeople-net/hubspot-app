<template>
	<div>
		<Pitch v-if="shots" />
		<LoadingIcon v-if="!shots" :title="$t('message.Shots').toLowerCase()"/>
	</div>
</template>
 
 
<script>
	import { mapGetters } from 'vuex'
	import Pitch from '../../Vectors/Pitch.vue';
	import LoadingIcon from '../../../../../global/LoadingIcon.vue';

	export default {
		props: {
			match: Object,
			primaryParam: String,
			playerId: Number,
			matchId: Number,
			title: String
		},
		created() {
			this.$store.dispatch('stats/getPlayerEvent', { matchId: this.matchId, playerId: this.playerId, primary: this.primaryParam })
		},
		data() {
			return {
				shot: null
			}
		},
		computed: {
			...mapGetters({ shots: 'stats/playerShots' })
		},
		components: { Pitch, LoadingIcon }
	}
</script>
 
 
<style lang='scss' scoped>
</style>