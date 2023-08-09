<template>
	<div>
		<CustomDialog :visible="showMessage" @hideDialog="hideDialog" :response="{error: ' '}"
					  :btnLabel="$t('message.PROCEEDTOPAYMENT')" routeName="wallet-checkout"
					  :primaryText="text.primary" :secondaryText="text.secondary" />
	</div>
</template>
 
 
<script>
	import CustomDialog from './CustomDialog.vue'

	export default {
		data() {
			return {
				showMessage: true,
				text: {
					primary: this.$i18n.t('message.NotPaidNotice'),
					secondary: this.$i18n.t('message.NotPaidNotice2')
				}
			}
		},
		methods: {
			hideDialog() {
				this.showMessage = false
				this.$router.push({ name: 'my-board' })
			},
		},
		components: { CustomDialog }
	}
</script>
 
 
<style lang='scss' scoped>
</style>