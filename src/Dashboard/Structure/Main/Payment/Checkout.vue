<template>
	<div class="checkout-pay">
		<h5 class="text-value mt-5 mb-3">{{ 'UFP' + ' ' + $t('message.Membership') }}</h5>
		<p class="text-undertitle">{{ $t('message.MembershipDesc') }}</p>
		
		<div v-if="products">
			<h5 class="text-value mt-4 mb-3">{{ $t('message.PaymentPeriod') }}</h5>
			
			<CheckoutItem :state="month" title="Monthly" @click="toggleData('month', 'year'), filterProducts(month, year, basic, premium)"/>
	
			<CheckoutItem :state="year" title="Yearly" @click="toggleData('year', 'month'), filterProducts(month, year, basic, premium)">
				<template #description>
					<span class="text-sm-message">{{ $t('message.YearlyPaymentNotice') }}</span>
				</template>
			</CheckoutItem>
	
			<h5 class="text-value mt-4">{{ $t('message.Choose') + ' ' + $t('message.yourplan') }}</h5>
	
			<CheckoutItem :state="basic" title="Basic" @click="toggleData('basic', 'premium'), filterProducts(month, year, basic, premium)" 
						  :price="getPrice('1')" :cycle="month ? $t('message.month') : $t('message.year') " >
			
				<template #description>
					<div class="mt-3">
						<span class="text-undertitle">{{ $t('message.Includes') + ':' }}</span>
						<ul>
							<li class="text-undertitle">{{ $t('message.MatchReports') }}</li>
							<li class="text-undertitle">{{ $t('message.Personal') + ' ' + $t('message.Stats')}}</li>
							<li class="text-undertitle">{{ $t('message.MatchVideos') }}</li>
						</ul>
					</div>
				</template>
			</CheckoutItem>
	
			<CheckoutItem :state="premium" title="Premium" @click="toggleData('premium', 'basic'), filterProducts(month, year, basic, premium)" 
						  :price="getPrice('3')" :cycle="month ? $t('message.month') : $t('message.year')">
			
				<template #description>
					<div class="mt-3 premium">
						<span class="text-undertitle">{{ $t('message.Includes') + ':' }}</span>
						<ul class="mb-0">
							<li class="text-undertitle">{{ $t('message.MatchReports') }}</li>
							<li class="text-undertitle">{{ $t('message.Personal') + ' ' + $t('message.Stats')}}</li>
							<li class="text-undertitle">{{ $t('message.MatchVideos') }}</li>
						</ul>
						<div class="row align-items-center w-100 m-auto">
							<Divider class="divider"/>
							<CirclePlus class="col-auto"/>
							<Divider class="divider"/>
						</div>
						<ul class="mb-0">
							<li class="text-undertitle">{{ $t('message.ComparisonWithOthers') }}</li>
							<li class="text-undertitle">{{ $t('message.StatsOfOthers') }}</li>
						</ul>
					</div>
				</template>
			</CheckoutItem>
		
			<div v-if="this.selectedProduct.length" >
				<h5 class="text-value mt-4 mb-3">{{ $t('message.PaymentMethodN') + ':' }}</h5>
	
				<Pay :payProduct="this.selectedProduct" class="checkout-pay-method"/>
			</div>
		
			<!-- <div class="text-center mt-5">
				<Button class="btn-black" :label="buttonLabel()" :disabled="!this.selectedProduct.length" @click="toPay"/>
			</div> -->

		</div>
		

		<LoadingIcon v-if="!products" title="products" />

	</div>
</template>
 
 
<script>
	import { mapGetters } from 'vuex'
	import LoadingIcon from '../../../global/LoadingIcon.vue'
	import CircleBorder from '../Stats/Vectors/CircleBorder.vue'
	import CircleCheckFilled from '../Stats/Vectors/CircleCheckFilled.vue'
	import CirclePlus from '../Stats/Vectors/CirclePlus.vue'
	import CheckoutItem from './CheckoutItem.vue'
	import Pay from './Pay.vue'

	export default {
		created() {
			this.$store.dispatch('payments/getProducts')
			
			if ( Object.keys(this.user).length === 0 ) {
				this.$store.dispatch("user/getUser");
			}
		},
		data() {
			return {
				month: false,
				year: false,
				basic: false,
				premium: false,
				price: '',
				selectedProduct: [],
				payComponent: false
			}
		},
		methods: {
			toggleData(data1, data2) {
				this[data1] = true
				this[data2] = false
			},
			filterProducts(month, year, basic, premium) {
				this.selectedProduct = this.products.filter( item => {
					if ( month && item.price.recurring && item.price.recurring.interval === 'month') {
						return item
					} else if ( year && item.price.recurring && item.price.recurring.interval === 'year') {
						return item
					} 
				})
					
				this.selectedProduct = this.selectedProduct.filter( item => {
					if ( basic && item.metadata.membership_id === '1') {
						return item
					} else if ( premium && item.metadata.membership_id === '3') {
						return item
					}
				})
			},
			getPrice( plan ) {
				let filteredProduct = this.products.filter( item => {
					if ( this.month && item.price.recurring && item.price.recurring.interval === 'month' && item.metadata.membership_id === plan ) {
						return item
					} else if (this.year && item.price.recurring && item.price.recurring.interval === 'year' && item.metadata.membership_id === plan ) {
						return item
					}
				})

				if ( filteredProduct.length ) {
					return Helpers.formatPrice(filteredProduct[0].price.unit_amount)
				}
			},
			buttonLabel() {
				if ( this.selectedProduct.length ) {
					let price = Helpers.formatPrice(this.selectedProduct[0].price.unit_amount)
					let interval = this.selectedProduct[0].price.recurring.interval === 'month' ? this.$i18n.t("message.month") : this.$i18n.t("message.year")
					
					return this.$i18n.t("message.PAY") + ' ' + price + '/' + interval
				} else return this.$i18n.t("message.PAY")
			},
			toPay() {
				this.payComponent = true
			}
		},
		computed: {
			...mapGetters({ products: 'payments/products',
							user: 'user/user' })
		},
		components: { CircleCheckFilled, CircleBorder, CheckoutItem, Pay, CirclePlus, LoadingIcon },
	}
</script>
 
 
<style lang='scss' scoped>
.checkout-pay {
	.app-card {
		cursor: pointer;
		border: 2px solid var(--card-bg);
	}
	.circle-border {
		width: 20px;
		height: 20px;
	}
	.checked-border, .checkout-pay-method {
		border: 2px solid var(--main-dark);
	}
	.premium {
		.divider {
			flex: 1;
		}
		:deep(.p-divider-horizontal)::before {
			border-top: 1px solid var(--stat-chart-bg);
		}
	}
}
</style>