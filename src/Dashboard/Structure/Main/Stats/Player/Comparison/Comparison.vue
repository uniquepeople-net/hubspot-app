<template>
	<div class="mb-5 comparison-comp position-relative">
		<h5 class="text-value">{{ $t('message.PlayerComparison') }}</h5>
		<Search v-if="showSearch && !noAccess" @addPlayer="addPlayer"/>
		<div class="row g-2 mt-4" v-if="playerDetails">
			<div class="col-6 d-flex flex-column">
				<GridCard bgSize="4rem" padding=".5rem .5rem 0 .5rem" class="d-flex card-compare">
					<template #content>
						<PlayerCard :firstName="playerDetails.firstName" :lastName="playerDetails.lastName" :clubName="playerDetails.currentTeam.officialName"
									:clubImgSrc="playerDetails.currentTeam.imageDataURL" :playerImgSrc="playerDetails.imageDataURL" />
					</template>
				</GridCard>			
			</div>
			<div class="col-6 d-flex flex-column">
				<GridCard bgSize="4rem" padding=".5rem .5rem 0 .5rem" class="d-flex card-compare">
					<template #content>
						<NobodyCard v-if="!addedPlayer"/>
						<PlayerCard v-if="addedPlayer" :firstName="addedPlayer.firstName" :lastName="addedPlayer.lastName" :clubName="addedPlayer.currentTeam.officialName"
									:clubImgSrc="addedPlayer.currentTeam.imageDataURL" :playerImgSrc="addedPlayer.imageDataURL"/>
					</template>
				</GridCard>

			</div>
			<div class="col-6 d-flex flex-column">
				<Listbox v-if="addedPlayer" v-model="selectedMatch1" :options="matches1" :emptyMessage="$t('message.NoData')"
					class="w-full md:w-14rem mt-3 l-box" listStyle="max-height:170px" @update:modelValue="updateSelectedMatch($event, user.instat_id, false)">
					<template #option="slotProps">
						<div class="flex align-items-center">
							<span class="text-des-small">{{ slotProps.option.label }}</span>
							<span class="text-xxs fw-light">{{ ' (' + matchDate(slotProps.option.date) + ')' }}</span>
							<Divider class="my-1" />
						</div>
					</template>
				</Listbox>

				<div v-if="addedPlayer" class="text-center see-more w-100">
					<Button class="text-sm-bold" link :label="$t('message.LoadMore')" @click="seeMore(user.instat_id, false)" :loading="loading1" />
				</div>
			</div>

			<div class="col-6 d-flex flex-column">
				<Listbox v-if="addedPlayer" v-model="selectedMatch2" :options="matches2" :emptyMessage="$t('message.NoData')"
						class="w-full md:w-14rem mt-3 l-box" listStyle="max-height:170px" @update:modelValue="updateSelectedMatch($event, addedPlayer.wyId, true)">
					<template #option="slotProps">
						<div class="flex align-items-center">
							<span class="text-des-small">{{ slotProps.option.label }}</span>
							<span class="text-xxs fw-light">{{ ' (' + matchDate(slotProps.option.date) + ')' }}</span>
							<Divider class="my-1" />
						</div>
					</template>
				</Listbox>

				<div v-if="addedPlayer" class="text-center see-more w-100">
					<Button class="text-sm-bold" link :label="$t('message.LoadMore')" @click="seeMore(addedPlayer.wyId, true)" :loading="loading2" />
				</div>
			</div>
		</div>
		<Divider class="divider-light"/>
		<AdvStats v-if="!noAccess" :selectedMatch1="selectedMatch1" :selectedMatch2="selectedMatch2"/>
		<NoAccess v-if="noAccess" class="no-access"/>
	

	</div>
</template>
 
 
<script>
	import { mapGetters } from 'vuex' 
	import GridCard from '../../../../../global/GridCard.vue'
	import NobodyCard from './NobodyCard.vue'
	import PlayerCard from './PlayerCard.vue'
	import Search from './Search.vue'
	import Listbox from 'primevue/listbox'
	import AdvStats from './AdvStats.vue'
	import NoAccess from './NoAccess.vue'
	

	export default {
		data() {
			return {
				showSearch: true,
				addedPlayer: null,
				selectedMatch1: null,
				selectedMatch2: null,
				loading1: false,
				page1: 1,
				loading2: false,
				page2: 1,
				noAccess: false
			}
		},
		methods: {
			addPlayer(data) {
				if ( this.user.membership_id !== 3 ) {
					this.noAccess = true
					
					return
				}
				this.addedPlayer = data	

				this.$store.dispatch('stats/resetPlayer2Matches')	
				this.$store.dispatch('stats/resetPlayer2Stats')	
				this.$store.dispatch('stats/getPlayerMatches', { id: this.addedPlayer.wyId, page: this.page2, compare: true } )	
			},
			matchDate(data) {
				if (data) {
					let date = new Date(data)
					return date.toLocaleString(['sk-SK'], { day: 'numeric', month: 'numeric', year: 'numeric' , hour: '2-digit', minute: '2-digit'})
				}
			},
			seeMore(stat_id, compare) {	
				let page
				if ( compare ) { 	
					this.page2 = this.page2 + 1
					this.loading2 = true
					page = this.page2
				} else {
					this.page1 = this.page1 + 1
					this.loading1 = true
					page = this.page1
				}

				this.$store.dispatch('stats/getPlayerMatches', { id: stat_id, page: page, compare: compare } )
			},
			updateSelectedMatch(match, id, compare) {
				/* if ( compare ) {
					this.$store.dispatch('stats/resetPlayer2Stats')
				} else {
					this.$store.dispatch('stats/resetPlayerStats')
				} */
				this.$store.dispatch('stats/getPalyerStats', { id: id, matchId: match.matchId, compare: compare } )
			}
		},
		computed: {
			...mapGetters({ playerDetails: 'stats/playerDetails',
							matches1: 'stats/playerMatches',
							matches2: 'stats/player2Matches',
							user: 'user/user' })
		},
		watch: {
			matches1: function(data) {
				this.loading1 = false
			}, 
			matches2: function(data) {
				this.loading2 = false
			} 
		},
		components: { GridCard, PlayerCard, NobodyCard, Search, Listbox, AdvStats, NoAccess }
	}
</script>
 
<style lang='scss' scoped>
.comparison-comp {
	.card-compare {
		flex: 1;
	}
	:deep(.p-listbox.p-focus) {
		box-shadow: 0 0 0 0.2rem var(--card-shadow);
		border: 1px solid var(--card-shadow);
	}
	:deep(.p-listbox-item) {
		padding: 0 .25rem;
	}
	:deep(.p-listbox .p-listbox-list .p-listbox-item.p-highlight) {
		background: var(--card-shadow);
	}
	.see-more {
		bottom: 1.8rem;
		background: linear-gradient(0deg, rgba(255,255,255,0.9122023809523809) 61%, rgba(255,255,255,0) 100%);
		cursor: pointer;
		:deep(.p-button.p-button-link) {
			color: var(--main-dark);
			text-decoration: underline;
		}
		:deep(.p-button.p-button-link:enabled:focus) {
			box-shadow: unset;
		}
	}
	.no-access {
		position: absolute;
		bottom: -60%;
	}
}

</style>