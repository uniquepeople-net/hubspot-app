<template>
	<div :class="`app-card p-3 mb-3 ${state ? 'checked-border' : ''}`">
		<div class="d-flex justify-content-between">
			<span class="center-center w-auto justify-content-start" >
				<CircleCheckFilled v-if="state"/>
				<CircleBorder v-if="!state" class="circle-border"/>
				<span class="header-main ms-1">{{ $t(`message.${title}`) }}</span>
			</span>
			<span class="text-data" v-if="price">{{`${price} / ${cycle}`}}</span>
		</div>
		<slot name="description"></slot>
	</div>
</template>
 
 
<script>
	import CircleCheckFilled from '../Stats/Vectors/CircleCheckFilled.vue'
	import CircleBorder from '../Stats/Vectors/CircleBorder.vue'
	
	export default {
		props: ['state', 'title', 'price', 'cycle'],
		data() {
			return {
				}
		},
		methods: {
			
		},
		components: { CircleCheckFilled, CircleBorder },
	}
</script>
 
 
<style lang='scss' scoped>
.circle-border {
	width: 20px;
	height: 20px;
}
</style>