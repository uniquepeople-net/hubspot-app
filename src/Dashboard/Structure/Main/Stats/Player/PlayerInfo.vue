<template>
	<GridCard class="player-info" :gradient="225" padding="1rem">
		<template #content>
			<p class="text-bg-bolder m-0">ROBERT</p>
			<p class="text-title-bold m-0">POLIEVKA</p>
			<p class="text-sm-bold mb-2">{{ $t('message.Club') }}</p>
			<div class="mb-3">
				<img src="https://mfkdukla.sk/images/kluby/issf_club_11686.png" alt="" class="club-img">
				<span class="text-undertitle ms-3">MFK Dukla Banská Bystrica</span>
			</div>
			<div class="d-flex justify-content-between">
				<div>
					<div class="d-flex mb-3">
						<div>
							<p class="text-sm-bold mb-2">{{ $t('message.Country') }}</p>
							<p class="text-undertitle m-0">Slovakia</p>
						</div>
						<div class="ms-5">
							<p class="text-sm-bold mb-2">{{ $t('message.Age') }}</p>
							<p class="text-undertitle m-0">30</p>
						</div>
					</div>
					<div class="d-flex">
						<div>
							<p class="text-sm-bold mb-2">{{ $t('message.Position') }}</p>
							<p class="text-undertitle m-0">Forward</p>
						</div>
						<div class="ms-5">
							<p class="text-sm-bold mb-2">{{ $t('message.Number') }}</p>
							<p class="text-undertitle m-0">22</p>
						</div>
					</div>
				</div>
				<img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ffmdataba.com%2Fimages%2Fp%2F74371.png&f=1&nofb=1&ipt=232ae61d2f58b1c3ca1d46040c62608e0a7a0a9af28545ea459373d3d8d58328&ipo=images" alt="" class="player-img">
			</div>
		</template>
	</GridCard>
</template>
 
 
<script>
	import GridCard from "../../../../global/GridCard.vue"

	export default {
		data() {
			return {
				}
		},
		methods: {
			
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