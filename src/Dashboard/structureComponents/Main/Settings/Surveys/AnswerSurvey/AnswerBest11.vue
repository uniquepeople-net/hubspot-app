<template>
	<div>
		<h5>{{question.title}}</h5>
		<small>Vyberte max. {{ this.question.max_to_choose }} hracov </small>

		<Divider />

		<h6>Vyberte tím</h6>
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
			<h6>Vyberte hraca</h6>
			<Listbox v-model="selectedPlayer" :options="squad" optionLabel="name" 
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
				<span class="fw-bold">{{(index + 1) +  '. miesto: '}}</span>{{player.shortName}}
				<i class="bi bi-dash-circle text-danger px-4" @click="removeItem(player.wyId)"></i>
			</p>
		</div>

	</div>
</template>
 
 
<script>
	import { mapGetters } from 'vuex';
	import Listbox from 'primevue/listbox'

	export default {
		props: {
			question: Object,
			step: Number,
		},
		data() {
			return {
				selectedTeam: null,
				teamId: null,
				selectedPlayer: null,
				selectedPlayers: [],
				gettingTeamSquad: false
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
					if ( this.selectedPlayers.length < 3 ) {
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
			}
		},
		computed: {
			...mapGetters({ teams: 'stats/competitionsTeams',
							squad: 'stats/teamSquad' }),
		},
		components: { Listbox },
	}
</script>
 
 
<style lang='scss' scoped>
</style>