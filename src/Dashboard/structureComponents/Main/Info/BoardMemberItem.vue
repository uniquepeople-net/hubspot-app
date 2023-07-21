<template>
	<div class="d-flex member-item flex-column">
		<div class="d-flex">
			<div class="position-relative me-4">
				<img v-if="member.image_url" :src="member.image_url" :alt="member.name">
				<img v-if="!member.image_url" src="../../../../../assets/images/ndplayer_100x130.png" />
				<div class="gradient-overlay"></div>
			</div>
			<div>
				<p class="header-main mb-0">{{ member.name }}</p>
				<p class="text-undertitle">{{ member.position }}</p>
				<p class="text-undertitle mb-1">
					<u><a :href="`tel:${member.phone_num}`">{{ member.phone_num }}</a></u>
				</p>
				<p class="text-undertitle mb-0">
					<u><a :href="`mailto:${member.email}`">{{member.email}}</a></u>
				</p>
			</div>
		</div>
		<Divider />
	</div>
</template>
 
 
<script>
	export default {
		props: {
			member: Object
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
.member-item {
	//max-height: 120px;
	img {
		width: 116px;
		height: 116px;
	}
	.gradient-overlay {
		position: absolute;
		bottom: -5px;
		left: 0;
		width: 100%;
		height: 15px; /* Set the height of the gradient overlay */
		//background: linear-gradient(to top, var(--bg-color), rgba(242, 242, 242, 0));
		background: rgb(243,243,243);
background: linear-gradient(0deg, rgba(243,243,243,1) 38%, rgba(255,255,255,0) 100%);	}
}
</style>