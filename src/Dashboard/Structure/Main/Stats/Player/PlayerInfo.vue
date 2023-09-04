<template>
	<GridCard class="player-info" :gradient="225" padding="1rem" v-if="playerDetails">
		<template #content>
			<p class="text-bg-bolder m-0">{{ playerDetails.firstName.toUpperCase() }}</p>
			<p class="text-title-bold m-0">{{ playerDetails.lastName.toUpperCase() }}</p>
			<p class="text-sm-bold mb-2">{{ $t('message.Club') }}</p>
			<div class="mb-3">
				<img :src="playerDetails.currentTeam.imageDataURL" alt="" class="club-img">
				<span class="text-undertitle ms-3">{{ playerDetails.currentTeam.officialName }}</span>
			</div>
			<div class="d-flex justify-content-between">
				<div>
					<div class="d-flex mb-3">
						<div>
							<p class="text-sm-bold mb-2">{{ $t('message.Country') }}</p>
							<p class="text-undertitle m-0">{{ playerDetails.passportArea.name }}</p>
						</div>
						<div class="ms-5">
							<p class="text-sm-bold mb-2">{{ $t('message.Age') }}</p>
							<p class="text-undertitle m-0">{{ calculateAge(playerDetails.birthDate) }}</p>
						</div>
					</div>
					<div class="d-flex">
						<div>
							<p class="text-sm-bold mb-2">{{ $t('message.Position') }}</p>
							<p class="text-undertitle m-0">{{ playerDetails.role.name }}</p>
						</div>
						<!-- <div class="ms-5">
							<p class="text-sm-bold mb-2">{{ $t('message.Number') }}</p>
							<p class="text-undertitle m-0">22</p>
						</div> -->
					</div>
				</div>
				<img :src="playerDetails.imageDataURL" :alt="playerDetails.lastName" class="player-img">
			</div>
		</template>
	</GridCard>
</template>
 
 
<script>
	import { mapGetters } from 'vuex'
	import GridCard from "../../../../global/GridCard.vue"

	export default {
		data() {
			return {
				}
		},
		methods: {
			calculateAge( birthDate ) {
				return Helpers.calculateAge(birthDate)
			}
		},
		computed: {
			...mapGetters({ playerDetails: 'stats/playerDetails' })
		},
		components: { GridCard }
	}
</script>
 
 
<style lang='scss' scoped>
.player-info {
	border-radius: 1rem;
	overflow: hidden;
	.club-img {
		width: 20px;
		height: auto;
	}
	.player-img {
		width: 120px;
		height: auto;
		max-height: 130px;
		position: relative;
		bottom: -1rem;
	}
}
</style>