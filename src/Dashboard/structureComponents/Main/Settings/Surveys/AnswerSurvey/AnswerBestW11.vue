<template>
	<div>
		<h5>{{question.title}}</h5>
		<small class="guide">
			Z celkového zoznamu vyber {{ this.question.max_to_choose }} {{ this.question.max_to_choose <= 1 ? 'hráčku' : 'hráčky' }} 
			{{ this.question.max_to_choose <= 1 ? 'ktorá bola' : 'ktoré boli' }} podľa teba {{ this.question.max_to_choose <= 1 ? 'najlepšia' : 'najlepšie' }} v najvyššej súťaži (1. liga)
			{{ position && position[0].id === 1 ? 'a zároveň im urči poradie od 1. do 3. miesta' : '' }}
			/ From the list of players you shall select {{ this.question.max_to_choose }} {{ this.question.max_to_choose <= 1 ? 'player' : 'players' }}
			who, in your opinion, {{ this.question.max_to_choose <= 1 ? 'was' : 'were' }} the best in the highest division (1. liga)
			{{ position && position[0].id === 1 ? 'and at the same time you shall determine their order from 1st to 3rd place' : '' }}
		</small>

		<Divider />

		<h6>Vyberte tím / Select team</h6>
		<Listbox v-model="selectedTeam" :options="teams" optionLabel="name" 
				class="w-full md:w-14rem mt-3 l-box" listStyle="max-height:170px"
				:click="handleTeam()" :key="'listbox1_' + step">
            <template #option="slotProps">
                <div class="flex align-items-center">
                    <!-- <img alt="" :src="slotProps.option.organization.logo_public_url" :class="`flag flag-${slotProps.option.wyId} mr-2`" style="width: 18px" /> -->
                    <span class="ms-3">{{ slotProps.option.name }}</span>
                </div>
            </template>
        </Listbox>


		<div class="mt-4">
			<h6>Vyberte hráčku / Select player</h6>
			<Listbox v-model="selectedPlayer" :options="filteredSquad" optionLabel="name" 
					class="w-full md:w-14rem mt-3 l-box" listStyle="max-height:170px"
					:change="handlePlayer()" :key="'listbox_' + step">
	            <template #option="slotProps">
	                <div class="flex align-items-center">
	                    <!-- <img :alt="slotProps.option.shortName" :src="slotProps.option.imageDataURL" :class="`flag flag-${slotProps.option.wyId} mr-2`" style="width: 18px" /> -->
	                    <i class="bi bi-person-fill"></i>
						<span class="ms-3">{{ slotProps.option.sportnetUser.name }}</span>
	                    <span class="ms-3">({{ slotProps.option.additionalData.position }})</span>
	                </div>
	            </template>
	        </Listbox>
		</div>

		<Divider />

		<div>
			<p v-if="selectedPlayers" v-for="(player, index) in selectedPlayers">
				<span v-if="position && position[0].id === 1" class="fw-bold">
					{{(index + 1) +  '. miesto/place (' + getNumber(index)() + ')' }}
				</span>
				<span class="d-block mt-1"><span class="py-1 px-3 choosed-player">{{player.sportnetUser.name}}</span>
					<i class="bi bi-dash-circle text-danger px-4" @click="removeItem(player.sportnetUser._id)"></i>
				</span>
			</p> 
		</div>

	</div>
</template>
 
 
<script>
	import { debounce } from 'lodash';
	import { mapGetters } from 'vuex';
	import Listbox from 'primevue/listbox'

	export default {
		props: {
			question: Object,
			step: Number,
		},
		created() {
			this.$store.dispatch("surveys/getPositions");
		},
		mounted() {
			let selectedPlayersArr = this.selectedPlayers.map( p => p.sportnetUser.name )
			this.$store.dispatch("surveys/setFulfilledSurvey", { value: [...selectedPlayersArr ], question: this.question, step: this.step })
		},
		data() {
			return {
				selectedTeam: null,
				teamId: null,
				selectedPlayer: null,
				selectedPlayers: [],
				gettingTeamSquad: false,
				squad: []
			}
		},
		methods: {
			handleTeam() {
				if ( this.selectedTeam && this.selectedTeam._id !== this.teamId) {
					this.teamId = this.selectedTeam._id
					this.squad = this.teams.filter( t => t._id === this.teamId )
					if ( this.squad.length ) {
						this.squad = this.squad[0].squad.athletes
					}
				}
			},
			handlePlayer() {
				if ( this.selectedPlayer && !this.selectedPlayers.some(e => e.sportnetUser._id === this.selectedPlayer.sportnetUser._id)) {					
					if ( this.selectedPlayers.length < this.question.max_to_choose ) {
						this.selectedPlayers.push( this.selectedPlayer )
					}
				}
			},
			removeItem(index) {
				if ( this.selectedPlayers.length === 1 && this.selectedPlayers[0].sportnetUser._id === index ) {
					this.selectedPlayers = []
					this.selectedPlayer = null
				} else {
					this.selectedPlayers = this.selectedPlayers.filter(p => p.sportnetUser._id !== index);
					this.selectedPlayer = null
				}
			},
			handleChange() {
				this.updateValue()
			},
			updateValue: debounce(function () {
				let selectedPlayersArr = this.selectedPlayers.map( p => p.sportnetUser.name )
				
				this.$store.dispatch("surveys/setFulfilledSurvey", { value: [...selectedPlayersArr ], question: this.question, step: this.step })
			}, 100),
			getNumber(index) {
				let counter = index;
				return function() {
					counter++;
					switch (counter) {
					case 1:
						return 5 + ' bodov/points';
					case 2:
						return 3 + ' body/points';
					case 3:
						return 1 + ' bod/points';
					default:
						return null; // optional fallback value if there are more than 3 iterations
					}
				}
			}
		},
		computed: {
			...mapGetters({ positions: 'surveys/positions',
							teams: 'stats/competitionsTeams'}),
			position() {
				return this.positions ? this.positions.filter( p => p.id === Number(this.question.closed_answs_default) ) : null
			},
			filteredSquad() {				
				let defaultValueStr = this.position ? this.position[0].position.toLowerCase() : null;
				
				if ( defaultValueStr === 'all' ) {
					return this.squad
				} 
				return this.squad.filter( s => (s.additionalData.position.toLowerCase()).includes(defaultValueStr) )
				
			}
		},
		watch: {
			selectedPlayers: {
				handler: function(data) {
					this.handleChange()
				},
				deep: true
			}
		},
		components: { Listbox },
	}
</script>
 
 
<style lang='scss' scoped>
.l-box {
	background: var(--gray-200);
}
.choosed-player {
	background: var(--green-100);
	border-radius: 5px;
}
.guide {
	color: var(--red-700);
}
</style>