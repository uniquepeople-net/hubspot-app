<template>
	<Fieldset legend="Payments history" :toggleable="true" class="fieldset" :collapsed="true"
				@update:collapsed="checkState">		
		<div  	v-if="payments"
				class="row align-items-center" v-for="(payment, index) in payments" :style="index % 2 === 0 ? 'background: var(--gray-100)' : '' ">
			<div class="col-4 column-list">{{formatTimestamp(payment.created)}}</div>
			<div class="col-3 column-list col-r-border">{{payment.description}}</div>
			<div class="col-3 column-list col-r-border">{{formatPrice(payment.amount)}}</div>
			<div class="col-2 column-list col-r-border">{{payment.status}}</div>
		</div>
		<Skeleton v-if="!payments" height="1.5rem" class="mb-2"></Skeleton>
		<!-- <p v-if="!payments">No payments</p> -->
	</Fieldset>
</template>
 
 
<script>
	import { mapGetters } from 'vuex'

	export default {
		props: {
			user: Object
		},
		methods: {
			formatPrice(price) {
				return Helpers.formatPrice(price)
			},
			formatTimestamp(data) {
				let timestamp = data * 1000
				return Helpers.formatDateToSk(timestamp, true)
			},
			checkState() {
				if ( !this.payments ) {
					this.$store.dispatch("payments/getListPayments", this.user.email );
				}
			}
		},
		computed: {
			...mapGetters({ payments: 'payments/listPayments' })
		}
	}
</script>
 
 
<style lang='scss' scoped>
.fieldset {
	:deep(legend) {
		font-size: 1.2rem;
		margin-bottom: 0;
	}
	.column-list {
		position: relative;
		font-size: .7rem;
		.divider {
			position: absolute;
			right: 0;
			top: 0;
			margin: 0;
		}
	}
	.divider {
		display: inline-block;
	}
}

@media ( min-width: 576px ) {
	.fieldset {
		.column-list {
			font-size: .8rem;
		}
	}
}

@media ( min-width: 768px ) {
	.fieldset {
		.column-list {
			font-size: 1rem;
			height: 100%;
		}
		.col-r-border {
			border-right: 1px solid var(--gray-300);
		}
	}
}

</style>