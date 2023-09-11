<template>
	<div>
		<Pitch class="mb-4" :events="data.events" :match="match" @selectedPass="selectedPass"/>
		<PassDetails v-if="pass" :name="pass.pass.recipient.name" :time="removeMs(pass.matchTimestamp)" 
					:length="pass.pass.length" :accurate="pass.pass.accurate" :secondaryName="pass.type.secondary[0]"/>
	</div>
</template>
 
 
<script>
	import PassDetails from './PassDetails.vue'
	import Pitch from './Pitch.vue'

	export default {
		props: {
			data: Object,
			match: Object
		},
		data() {
			return {
				pass: null
			}
		},
		methods: {
			selectedPass(data) {
				this.pass = data ? data[0] : null
			},
			removeMs(time) {
				if ( time ) {
					return time.split('.')[0]
				}
			}
		},
		components: { Pitch, PassDetails }
	}
</script>
 
 
<style lang='scss' scoped>
</style>