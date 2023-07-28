<template>
	<router-link :to="{ name: route }">
		<div class="main-bar bg-card-custom square-item">
			<div class="inside-square">
				<div class="square-data center-center flex-column">
					<div class="slot-vector mb-2">
						<slot name="vector"></slot>
					</div>
					<p class="text-data mb-0">{{label}}</p>
					<p class="text-x-small mb-0">{{description}}</p>
				</div>
			</div>
		</div>
	</router-link>
</template>
 
 
<script>
	export default {
		props: {
			label: String,
			description: String,
			route: String
		},
		data() {
			return {
			}
		},
		methods: {
 
		},
	}
</script>
 
 
<style lang='scss' scoped>
.square-item {
	width: 100%;
	padding-top: 100%;
	position: relative;
	.inside-square {
		position: absolute;
		top: 50%; 
		left: 50%; 
		transform: translate(-50%, -50%); 
		width: 100%; 
		height: 100%;
		.square-data {
			width: 100;
			height: 100%;
		}
		.slot-vector {
			width: 33px;
			height: 30px;
		}
	}
}
</style>