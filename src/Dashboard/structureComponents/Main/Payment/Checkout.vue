<template>
	<div class="checkout-pay">
		<h5 class="text-value mt-5 mb-3">{{ 'UFP' + ' ' + $t('message.Membership') }}</h5>
		<p class="text-undertitle">{{ $t('message.MembershipDesc') }}</p>
		
		<div v-if="products">
			<h5 class="text-value mt-4 mb-3">{{ $t('message.PaymentPeriod') }}</h5>
			
			<CheckoutItem :state="month" title="Monthly" @click="toggleData('month', 'year'), filterProducts('month')"/>
	
			<CheckoutItem :state="year" title="Yearly" @click="toggleData('year', 'month'), filterProducts('year')">
				<template #description>
					<span class="text-sm-message">{{ $t('message.YearlyPaymentNotice') }}</span>
				</template>
			</CheckoutItem>
	
			<h5 class="text-value mt-4">{{ $t('message.Choose') + ' ' + $t('message.yourplan') }}</h5>
	
			<CheckoutItem :state="basic" title="Basic" @click="toggleData('basic', 'premium'), filterProducts('basic')" 
						  :price="getPrice('basic')" :cycle="month ? $t('message.month') : $t('message.year') " />
	
			<CheckoutItem :state="premium" title="Premium" @click="toggleData('premium', 'basic'), filterProducts('premium')" 
						  :price="getPrice('premium')" :cycle="month ? $t('message.month') : $t('message.year')"/>
		
			<div class="text-center mt-5">
				<Button class="btn-black" label="PAY" />
			</div>
		</div>

		<LoadingIcon v-if="!products" title="products" />


	</div>
</template>
 
 
<script>
	import { mapGetters } from 'vuex'
	import LoadingIcon from '../../../global/LoadingIcon.vue'
	import CircleBorder from '../Stats/Vectors/CircleBorder.vue'
	import CircleCheckFilled from '../Stats/Vectors/CircleCheckFilled.vue'
	import CheckoutItem from './CheckoutItem.vue'

	export default {
		created() {
			this.$store.dispatch('payments/getProducts')
		},
		data() {
			return {
				month: false,
				year: false,
				basic: false,
				premium: false,
				price: '',
				selectedProduct: []
			}
		},
		methods: {
			toggleData(data1, data2) {
				this[data1] = true
				this[data2] = false
			},
			filterProducts(data) {
				this.selectedProduct = this.products
				
				if ( data === 'month' || data === 'year' ) {
					this.selectedProduct = this.selectedProduct.filter( item => item.price.recurring.interval === data )
				} else if ( data === 'basic' || data === 'premium' ) {
					this.selectedProduct = this.selectedProduct.filter( item => item.description === data )
				}

			},
			getPrice( plan ) {
				let filteredProduct = this.products.filter( item => {
					if ( this.month && item.price.recurring.interval === 'month' && item.description === plan ) {
						return item
					} else if (this.year && item.price.recurring.interval === 'year' && item.description === plan ) {
						return item
					}
				})

				if ( filteredProduct.length ) {
					return Helpers.formatPrice(filteredProduct[0].price.unit_amount)
				}
			}
		},
		computed: {
			...mapGetters({ products: 'payments/products' })
		},
		components: { CircleCheckFilled, CircleBorder, CheckoutItem },
	}
</script>
 
 
<style l,
LoadingIconang='scss' scoped>
.checkout-pay {
	.app-card {
		cursor: pointer;
		border: 2px solid var(--card-bg);
	}
	.circle-border {
		width: 20px;
		height: 20px;
	}
	.checked-border {
		border: 2px solid var(--main-dark);
	}
}
</style>