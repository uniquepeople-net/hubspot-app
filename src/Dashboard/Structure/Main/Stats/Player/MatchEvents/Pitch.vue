<template>
	<div class="pitch-passes">
		<Pitch />		
		<Pass :transmitter="22" :receiver="16" :x1="0" :y1="0" :x2="100" :y2="0" />
		<Pass :transmitter="22" :receiver="8" :x1="50" :y1="100" :x2="50" :y2="0" />
	</div>
</template>
 
 
<script>
	import Pass from '../../Global/Pass.vue'
	import Pitch from '../../Vectors/Pitch.vue'

	export default {
		mounted() {
			
		},
		data() {
			return {
			}
		},
		methods: {
			
		},
		components: { Pitch, Pass }
	}
</script>
 
 
<style lang='scss' scoped>
.pitch-passes {
	position: relative;
	width: fit-content;
	margin: auto;
	svg {
		width: 100%;
	}
}
</style>