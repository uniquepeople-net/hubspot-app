<template>
	<div class="mt-5">
		<h5 class="text-value">{{ $t('message.Lineups') }}</h5>
		<LineupsClub club="ZP Sport Podbrezová" coach="Roman Skuhravý"
					 imgSrc="http://www.zpfutbal.sk/wp-content/uploads/2022/06/LogoFKZP-1.png"/>
		
		<LineupsPitch class="my-4"/>
	
		<LineupsClub club="MFK Dukla Banská Bystrica" coach="Michal Ščasný"
					 imgSrc="http://www.zpfutbal.sk/wp-content/uploads/2022/06/LogoFKZP-1.png"/>

	
	</div>
</template>
 
 
<script>
	import LineupsClub from './LineupsClub.vue'
	import LineupsPitch from './LineupsPitch.vue'

	export default {
		data() {
			return {
				}
		},
		methods: {
			
		},
		components: { LineupsClub, LineupsPitch },
	}
</script>
 
 
<style lang='scss' scoped>
</style>