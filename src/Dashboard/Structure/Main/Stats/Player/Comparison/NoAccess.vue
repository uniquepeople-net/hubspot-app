<template>
	<div class="text-center noaccess">
		<p class="text-data-bold text-center px-5">{{ $t('message.NoCompareAccess') }}</p>
		<Button :label="$t('message.GoToPlans').toUpperCase()" class="btn-border fw-bold" @click="redirectPlans"/>
	</div>
</template>
 
 
<script>
	export default {
		data() {
			return {
			}
		},
		methods: {
			redirectPlans() {
				this.$router.push({ name: 'wallet-info' })
			}
		},
	}
</script>
 
 
<style lang='scss' scoped>
.noaccess {
	padding: 8rem 0 4rem 0;
	background: rgba(246,246,246,0);
	background: -moz-linear-gradient(top, rgba(246,246,246,0) 0%, rgba(255,255,255,0.03) 1%, rgba(255,255,255,1) 33%);
	background: -webkit-gradient(left top, left bottom, color-stop(0%, rgba(246,246,246,0)), color-stop(1%, rgba(255,255,255,0.03)), color-stop(33%, rgba(255,255,255,1)));
	background: -webkit-linear-gradient(top, rgba(246,246,246,0) 0%, rgba(255,255,255,0.03) 1%, rgba(255,255,255,1) 33%);
	background: -o-linear-gradient(top, rgba(246,246,246,0) 0%, rgba(255,255,255,0.03) 1%, rgba(255,255,255,1) 33%);
	background: -ms-linear-gradient(top, rgba(246,246,246,0) 0%, rgba(255,255,255,0.03) 1%, rgba(255,255,255,1) 33%);
	background: linear-gradient(to bottom, rgba(246,246,246,0) 0%, rgba(255,255,255,0.03) 1%, rgba(255,255,255,1) 33%);
	filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#f6f6f6', endColorstr='#ffffff', GradientType=0 );
}
</style>