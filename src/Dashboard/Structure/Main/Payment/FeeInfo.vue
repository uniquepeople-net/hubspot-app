<template>
	<div class="fee-info">
		
		<h5 class="text-gt-bold">{{ $t('message.Payments') }}</h5>				
	
		<div class="d-flex align-items-center justify-content-between">
			<h6><span class="fw-normal me-4">{{ $t('message.Fee') + ':'}}</span> {{ fee }}</h6>
			<div class="mx-4">
				<i v-if="user.fee" class="pi pi-check-circle" :style="{fontSize: '2rem', color: 'var(--green-400)' }"></i>
				<i v-if="!user.fee" class="pi pi-times-circle" :style="{fontSize: '2rem', color: 'var(--red-400)' }"></i>
			</div>
		</div>

		<div class="d-flex align-items-center justify-content-between">
			<h6>
				<span class="fw-normal me-4">{{ $t('message.Membership') + ':'}}</span> 
				{{ membership }}
			</h6>
		</div>

		<div class="my-4 center-center">
			<Button v-if="!user.fee" :label="$t('message.Pay') + ' ' + $t('message.Fee')" 
					class="btn-black" @click="redirectPay" />

			<div v-if="user.fee && upgrades && products && subscriptions" class="text-center">
				<h5 class="text-description">{{ $t('message.UpgradeMembership') + ':' }}</h5>
				<Button v-for="upgrade in upgrades" :label="upgrade.name + ' ' + surcharge(upgrade.id)"
						class="btn-black my-1" @click="showPayMethods"/>
			</div>
			<Pay :payProduct="this.selectedProduct"/>
		</div>

		<Subscriptions :user="user"/>
	
		<Payments :user="user"/>
	</div>
</template>
 
 
<script>
	import { mapGetters } from 'vuex'
	import Subscriptions from './Subscriptions.vue'
	import Payments from './Payments.vue'
	import Pay from './Pay.vue'
	

	export default {
		props: ['user'],
		created() {
			this.$store.dispatch('payments/getProducts')
			this.checkMembership()
		},
		data() {
			return {
				upgrades: null,
				showPay: false,
				productToPay: null
			}
		},
		methods: {
			showPayMethods() {
				this.showPay = true
				console.log(this.showPay)
			},
			checkMembership() {
				let highestMembership = this.user.memberships.reduce((acc, obj) => {
					return obj.id > acc.id ? obj : acc;
				}, { id: -Infinity })
				
				this.upgrades = this.user.memberships.filter( item => item.id > this.user.membership_id )

				if ( this.user.membership_id < highestMembership.id ) {
					return true 
				} else { 
					return false
				}
			},
			surcharge(id) {
				let lastActiveSubscription = this.subscriptions && this.subscriptions.filter( item => {
					if ( item.status === 'active' || item.status === 'trialing' ) {
						return item					
					}
				})[0]

				let filteredProduct = this.products.filter( item => {
					if ( item.price.recurring && item.price.recurring.interval === lastActiveSubscription.plan.interval && 
						Number(item.metadata.membership_id) ===  Number(id) ) {
							return item
					}
				})

				let priceToSurcharge = Number(filteredProduct[0].price.unit_amount) - Number(lastActiveSubscription.plan.amount)
				let interval = filteredProduct[0].price.recurring.interval === 'month' ? this.$i18n.t("message.month") : this.$i18n.t("message.year")

				return ' ( ' + this.$i18n.t('message.Surcharge').toLowerCase() + ' ' + Helpers.formatPrice(priceToSurcharge) + '/' + interval + ' )'		
			}
		},
		computed: {
			...mapGetters({ subscriptions: 'payments/subscriptions',
							products: 'payments/products'  }),
			fee() {
				return this.user.fee ? this.$i18n.t('message.Paid') : this.$i18n.t('message.Unpaid')
			},
			membership() {
				let membershipObj = this.user.memberships.filter( m => m.id === this.user.membership_id )
				return membershipObj[0].name
			},		
		},
		components: { Payments, Subscriptions, Pay }
	}
</script>
 
 
<style lang='scss' scoped>
.fee-info {
	max-width: 768px;
	margin: auto;
}
</style>