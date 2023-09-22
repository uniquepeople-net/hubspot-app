<template>
	<div>
		<GridCard class="player-info" :gradient="225" padding="1rem" v-if="playerData">
			<template #content>
				<p class="text-bg-bolder m-0">{{ playerData.firstName.toUpperCase() }}</p>
				<p class="text-title-bold m-0">{{ playerData.lastName.toUpperCase() }}</p>
				<p class="text-sm-bold mb-2">{{ $t('message.Club') }}</p>
				<div class="mb-3">
					<img :src="playerData.currentTeam.imageDataURL" alt="" class="club-img">
					<span class="text-undertitle ms-3">{{ playerData.currentTeam.officialName }}</span>
				</div>
				<div class="d-flex justify-content-between">
					<div>
						<div class="d-flex mb-3">
							<div>
								<p class="text-sm-bold mb-2">{{ $t('message.Country') }}</p>
								<p class="text-undertitle m-0">{{ playerData.passportArea.name }}</p>
							</div>
							<div class="ms-5">
								<p class="text-sm-bold mb-2">{{ $t('message.Age') }}</p>
								<p class="text-undertitle m-0">{{ calculateAge(playerData.birthDate) }}</p>
							</div>
						</div>
						<div class="d-flex">
							<div>
								<p class="text-sm-bold mb-2">{{ $t('message.Position') }}</p>
								<p class="text-undertitle m-0">{{ playerData.role.name }}</p>
							</div>
							<!-- <div class="ms-5">
								<p class="text-sm-bold mb-2">{{ $t('message.Number') }}</p>
								<p class="text-undertitle m-0">22</p>
							</div> -->
						</div>
					</div>
					<img :src="playerData.imageDataURL" :alt="playerData.lastName" class="player-img">
				</div>
			</template>
		</GridCard>
		<LoadingIcon v-if="!playerData" :title="$t('message.PlayerData').toLowerCase()"/>
	</div>
</template>
 
 
<script>
	import GridCard from "../../../../global/GridCard.vue"
	import LoadingIcon from '../../../../global/LoadingIcon.vue'

	export default {
		props: {
			playerData: Object
		},
		data() {
			return {
			}
		},
		methods: {
			calculateAge( birthDate ) {
				return Helpers.calculateAge(birthDate)
			}
		},
		components: { GridCard, LoadingIcon }
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