<template>
	<div class="position-relative">
		<h5 class="text-value">{{ $t('message.YourLastGames') }}</h5>
		<MatchCard />
		<MatchCard />
		<MatchCard />
		<div class="text-center see-more w-100">
			<span class="text-sm-bold"><u>{{ $t('message.SeeMore') }}</u></span>
		</div>
		<Divider class="divider-light mt-0"/>
	</div>
</template>
 
 
<script>
	import MatchCard from "../../../../global/MatchCard.vue"

	export default {
		data() {
			return {
				}
		},
		methods: {
			
		},
		components: { MatchCard }
	}
</script>
 
 
<style lang='scss' scoped>
.see-more {
	position: absolute;
	padding-top: 3rem;
	bottom: 1.8rem;
	background: linear-gradient(0deg, rgba(255,255,255,0.9122023809523809) 61%, rgba(255,255,255,0) 100%);
}
</style>