<template>
	
	<div class="fee-info">
		
		<h5 class="text-gt-bold">{{ $t('message.Payments') }}</h5>				
	
		<div class="d-flex align-items-center justify-content-between">
			<h6><span class="fw-normal me-4">{{ $t('message.Yearly') + ' ' + $t('message.fee') + ':'}}</span> {{ fee }}</h6>
			<div class="mx-4">
				<i v-if="user.fee" class="pi pi-check-circle" :style="{fontSize: '2rem', color: 'var(--green-400)' }"></i>
				<i v-if="!user.fee" class="pi pi-times-circle" :style="{fontSize: '2rem', color: 'var(--red-400)' }"></i>
			</div>
		</div>

		<div class="d-flex align-items-center justify-content-between">
			<h6><span class="fw-normal me-4">{{ $t('message.Membership') + ':'}}</span> {{ membership }}</h6>
		</div>

		<div class="my-4 center-center">
			<Button v-if="!user.fee" :label="$t('message.Pay') + ' ' + $t('message.Fee')" 
					class="btn-black" @click="redirectPay"/>
		</div>

		<Subscriptions :user="user"/>
	
		<Payments :user="user"/>
	</div>
		
</template>
 
 
<script>
	import { mapGetters } from 'vuex'
	import Subscriptions from './Subscriptions.vue'
	import Payments from './Payments.vue'
	

	export default {
		props: ['user'],
		created() {
			//this.$store.dispatch("payments/getPayments", this.user.id);	
		},
		methods: {
			redirectPay() {
				this.$router.push({ name: 'wallet-checkout' })
			}
		},
		computed: {
			...mapGetters({ payments: 'payments/payments'}),
			fee() {
				return this.user.fee ? this.$i18n.t('message.Paid') : this.$i18n.t('message.Unpaid')
			},
			membership() {
				let membershipObj = this.user.memberships.filter( m => m.id === this.user.membership_id )
				return membershipObj[0].name
			}
		},
		components: { Payments, Subscriptions }
	}
</script>
 
 
<style lang='scss' scoped>
.fee-info {
	max-width: 768px;
	margin: auto;
}
</style>