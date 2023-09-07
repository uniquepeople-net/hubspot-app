<template>
	<div class="mb-5">
		<h5 class="text-value">{{ $t('message.PlayerComparison') }}</h5>
		<Search v-if="showSearch" @addPlayer="addPlayer"/>
		<div class="row g-2 mt-4" v-if="playerDetails">
			<div class="col-6 d-flex flex-column">
				<GridCard bgSize="4rem" padding=".5rem .5rem 0 .5rem" class="d-flex card-compare">
					<template #content>
						<PlayerCard :firstName="playerDetails.firstName" :lastName="playerDetails.lastName" :clubName="playerDetails.currentTeam.officialName"
									:clubImgSrc="playerDetails.currentTeam.imageDataURL" :playerImgSrc="playerDetails.imageDataURL"/>
					</template>
				</GridCard>

				<Dropdown v-model="selectedMatch1" :options="matches1" optionLabel="label" class="w-100 mt-3 dropdown-matches"
						  optionValue="id" :placeholder="$t('message.SelectMatch')" />
			</div>
			<div class="col-6 d-flex flex-column">
				<GridCard bgSize="4rem" padding=".5rem .5rem 0 .5rem" class="d-flex card-compare">
					<template #content>
						<NobodyCard v-if="!addedPlayer"/>
						<PlayerCard v-if="addedPlayer" :firstName="addedPlayer.firstName" :lastName="addedPlayer.lastName" :clubName="addedPlayer.currentTeam.officialName"
									:clubImgSrc="addedPlayer.currentTeam.imageDataURL" :playerImgSrc="addedPlayer.imageDataURL"/>
					</template>
				</GridCard>

				<Dropdown v-model="selectedMatch2" :options="roles" optionLabel="name" class="w-100 mt-3"
						  optionValue="id" :placeholder="$t('message.SelectMatch')" />
			</div>
		</div>
	</div>
</template>
 
 
<script>
	import { mapGetters } from 'vuex' 
	import GridCard from '../../../../../global/GridCard.vue'
	import NobodyCard from './NobodyCard.vue'
	import PlayerCard from './PlayerCard.vue'
	import Search from './Search.vue'

	export default {
		data() {
			return {
				showSearch: true,
				addedPlayer: null,
				selectedMatch1: null,
				selectedMatch2: null
			}
		},
		methods: {
			addPlayer(data) {
				this.addedPlayer = data		
			}
		},
		computed: {
			...mapGetters({ playerDetails: 'stats/playerDetails',
							matches1: 'stats/playerMatches',
							matches2: 'stats/' })
		},
		components: { GridCard, PlayerCard, NobodyCard, Search }
	}
</script>
 
<style lang='scss' scoped>
.card-compare {
	flex: 1;
}
.dropdown-matches {
	:deep(.p-dropdown-panel) {
		max-width: 100%;
	}
}
</style>