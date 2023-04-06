<template>
	<div>
		<h5>{{question.title}}</h5>
		<small>
			Vyberte {{ this.question.max_to_choose }} {{ this.question.max_to_choose <= 1 ? 'hráča' : 'hráčov' }} 
			/ <i>Choose {{ this.question.max_to_choose }} {{ this.question.max_to_choose <= 1 ? 'player' : 'players' }}</i>
		</small>

		<Divider />

		<h6>Vyberte tím / Select team</h6>
		<Listbox v-model="selectedTeam" :options="teams" optionLabel="name" 
				class="w-full md:w-14rem mt-3" listStyle="max-height:170px"
				:click="handleTeam()" :key="'listbox1_' + step">
            <template #option="slotProps">
                <div class="flex align-items-center">
                    <img :alt="slotProps.option.name" :src="slotProps.option.imageDataURL" :class="`flag flag-${slotProps.option.wyId} mr-2`" style="width: 18px" />
                    <span class="ms-3">{{ slotProps.option.name }}</span>
                </div>
            </template>
        </Listbox>


		<div class="mt-4">
			<h6>Vyberte hráča / Select player</h6>
			<Listbox v-model="selectedPlayer" :options="filteredSquad" optionLabel="name" 
					class="w-full md:w-14rem mt-3" listStyle="max-height:170px"
					:change="handlePlayer()" :key="'listbox_' + step">
	            <template #option="slotProps">
	                <div class="flex align-items-center">
	                    <img :alt="slotProps.option.shortName" :src="slotProps.option.imageDataURL" :class="`flag flag-${slotProps.option.wyId} mr-2`" style="width: 18px" />
	                    <span class="ms-3">{{ slotProps.option.shortName }}</span>
	                    <span class="ms-3">({{ slotProps.option.role.name }})</span>
	                </div>
	            </template>
	        </Listbox>
		</div>

		<Divider />

		<div>
			<p v-if="selectedPlayers" v-for="(player, index) in selectedPlayers">
				<span class="fw-bold mx-4">{{(index + 1) +  '.'}}</span>{{player.shortName}}
				<i class="bi bi-dash-circle text-danger px-4" @click="removeItem(player.wyId)"></i>
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
		mounted() {
			let selectedPlayersArr = this.selectedPlayers.map( p => p.shortName )
			this.$store.dispatch("surveys/setFulfilledSurvey", { value: [...selectedPlayersArr ], question: this.question, step: this.step })
		},
		data() {
			return {
				selectedTeam: null,
				teamId: null,
				selectedPlayer: null,
				selectedPlayers: [],
				gettingTeamSquad: false,
			}
		},
		methods: {
			handleTeam() {
				if ( this.selectedTeam && this.selectedTeam.wyId !== this.teamId) {
					this.teamId = this.selectedTeam.wyId
					this.$store.dispatch("stats/getTeamSquad", this.teamId)
				}
			},
			handlePlayer() {
				if ( this.selectedPlayer && !this.selectedPlayers.some(e => e.wyId === this.selectedPlayer.wyId)) {					
					if ( this.selectedPlayers.length < this.question.max_to_choose ) {
						this.selectedPlayers.push( this.selectedPlayer )
					}
				}
			},
			removeItem(index) {
				if ( this.selectedPlayers.length === 1 && this.selectedPlayers[0].wyId === index ) {
					this.selectedPlayers = []
					this.selectedPlayer = null
				} else {
					this.selectedPlayers = this.selectedPlayers.filter(p => p.wyId !== index);
					this.selectedPlayer = null
				}
			},
			handleChange() {
				this.updateValue()
			},
			updateValue: debounce(function () {
				let selectedPlayersArr = this.selectedPlayers.map( p => p.shortName )
				
				this.$store.dispatch("surveys/setFulfilledSurvey", { value: [...selectedPlayersArr ], question: this.question, step: this.step })
			}, 100),
		},
		computed: {
			...mapGetters({ teams: 'stats/competitionsTeams',
							squad: 'stats/teamSquad' }),
			filteredSquad() {
				let title = this.question.title

				if ( this.step === 2 ) {
					return this.squad.filter( s => (s.role.name.toLowerCase()).includes('goalkeeper') )
				} else if ( this.step === 3 ) {
					return this.squad.filter( s => (s.role.name.toLowerCase()).includes('defender') )
				} else if ( this.step === 4 ) {
					return this.squad.filter( s => (s.role.name.toLowerCase()).includes('midfielder') )
				} else if ( this.step === 5 ) {
					return this.squad.filter( s => (s.role.name.toLowerCase()).includes('forward') )
				} else if ( this.step === 1 ) {
					return this.squad
				}
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
</style>