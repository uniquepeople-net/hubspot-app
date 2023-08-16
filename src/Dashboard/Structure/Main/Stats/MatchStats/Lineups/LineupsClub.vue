<template>
	<div class="center-center lineups-club px-3 py-2">
		<img class="img" :src="imgSrc" alt="">
		<div class="ms-2">
			<p class="mb-0 text-sm-bold">{{ club }}</p>
			<p class="mb-0 text-xs-notice">{{ $t('message.Coach') + ': ' + coach}}</p>
		</div>
	</div>
</template>
 
 
<script>
	export default {
		props: [ 'club', 'coach', 'imgSrc' ],
		data() {
			return {
			}
		},
		methods: {
 
		},
	}
</script>
 
 
<style lang='scss' scoped>
.lineups-club {
	background: var(--card-bg);
	border-radius: var(--btn-border-radius);
	.img {
		width: 40px;
		height: auto;
	}
}
</style>