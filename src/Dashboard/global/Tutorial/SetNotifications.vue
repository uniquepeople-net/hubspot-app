<template>
	<div class="full-screen position-relative">
		<div class="notif-wrapper">
			<BackButton class="back-button" route="tutorial"/>
			<h2 class="text-gt-bold mt-5 mb-4">{{ $t('message.SettingUpNotif') }}</h2>
			<p class="text-undertitle">{{ $t('message.SettingUpNotifDesc') }}</p>
			<div class="center-center mt-5">
				<Notifications />
			</div>
		</div>
		<div class="notif-btns center-center flex-column mb-3">
			<Button :label="$t('message.TurnOnNotif')" class="btn-black mb-3 mt-5"/>
			<Button :label="$t('message.NotNow')" class="btn-border" @click="nextRoute"/>
		</div>
	</div>
</template>
 
 
<script>
	import BackButton from '../../global/BackButton.vue'
	import Notifications from '../../structureComponents/Main/Stats/Vectors/Notifications.vue'

	export default {
		mounted() {
			//this.$router.push({ name: 'checkout' })
		},
		data() {
			return {
			}
		},
		methods: {
			nextRoute() {
				this.$router.push({ name: 'checkout' })
			}
		},
		components: { BackButton, Notifications }
	}
</script>
 
 
<style lang='scss' scoped>
.notif-wrapper {
	max-width: 576px;
	margin-top: 2rem;
}
@media( max-width: 576px ) {
	.full-screen {
		justify-content: space-between;
	}
}
</style>