<template>
	<Card class="card">
		<template #content>
			<div class="card-body">
				<div class="row">
					<div class="col-12 col-sm-6 mb-3 mb-sm-0">
						<h5>Season</h5>
						<Dropdown v-model="selectedSeason" :options="season" optionLabel="name" 
								  optionValue="code" placeholder="Select Season" @change="selectItem($event)"
								  class="w-100"/>
					</div>
					
					<div class="col-12 col-sm-6">
						<h5>Match</h5>
						<Dropdown v-model="selectedMatch" :options="matchesArr" optionLabel="name" 
								  optionValue="id" placeholder="Select Match" 
								  class="w-100"/>
					</div>
				</div>
			</div>
		</template>
	</Card>
</template>
 
 
<script>
	import { mapGetters } from 'vuex';

	export default {
		created() {
			//this.$store.dispatch( "stats/getMatches" );
		},
		data() {
			return {
				selectedMatch: null,
				selectedSeason: 30,
				season: [
					{name: '2022/2023', code: 30},
					{name: '2021/2022', code: 28},
					{name: '2020/2021', code: 26},
				],
				matchesArr: this.fitMatches( this.matches )
			}
		},
		methods: {
			selectItem(e) {
				this.$store.dispatch( "stats/getMatches", e.value )				
			},
			fitMatches(data, arr) {
				if ( data ) {
					this.matchesArr = []					
					data.map( item => {
						this.matchesArr.push({ name: item.title + ' (' + item.score + ')', id: item.id })
					})
					this.matchesArr.reverse()
					this.selectedMatch = this.matchesArr[0].id		
				}
			}
		},
		computed: {
			...mapGetters({ matches: 'stats/matches'})
		},
		watch: {
			matches: function (data) {				
				this.fitMatches( data, this.matchesArr )
			},
			selectedMatch: function(data) {
				//this.$store.dispatch( "stats/getMatch", data );				
			}
		},
	}
</script>
 
 
<style lang='scss' scoped>
.card {
	:deep(.p-card-content) {
		padding: 0;
	}
}
</style>