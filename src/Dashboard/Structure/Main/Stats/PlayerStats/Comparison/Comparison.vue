<template>
	<div>
		<h5 class="text-value">{{ $t('message.PlayerComparison') }}</h5>
		<div class="row g-2 mb-4">
			<div class="col-6">
				<GridCard bgSize="4rem" padding=".5rem .5rem 0 .5rem">
					<template #content>
						<PlayerCard firstName="Robert" lastName="Polievka" clubName="MFK Dukla Banská Bystrica"
									clubImgSrc="http://www.zpfutbal.sk/wp-content/uploads/2022/06/LogoFKZP-1.png"
									playerImgSrc="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ffmdataba.com%2Fimages%2Fp%2F74371.png&f=1&nofb=1&ipt=232ae61d2f58b1c3ca1d46040c62608e0a7a0a9af28545ea459373d3d8d58328&ipo=images"/>
					</template>
				</GridCard>
			</div>
			<div class="col-6">
				<GridCard bgSize="4rem" padding=".5rem .5rem 0 .5rem" class="h-100">
					<template #content>
						<NobodyCard @addPlayer="addPlayer"/>
					</template>
				</GridCard>
			</div>
		</div>
		<Search v-if="showSearch"/>
	</div>
</template>
 
 
<script>
	import GridCard from '../../../../../global/GridCard.vue'
	import NobodyCard from './NobodyCard.vue'
	import PlayerCard from './PlayerCard.vue'
	import Search from './Search.vue'

	export default {
		data() {
			return {
				showSearch: false
			}
		},
		methods: {
			addPlayer() {
				this.showSearch = true				
			}
		},
		components: { GridCard, PlayerCard, NobodyCard, Search }
	}
</script>
 
<style lang='scss' scoped>
</style>