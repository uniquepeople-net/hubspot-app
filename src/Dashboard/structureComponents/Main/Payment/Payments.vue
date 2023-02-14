<template>
	<Fieldset legend="Payments history" :toggleable="true" class="fieldset" :collapsed="true">		
		<div class="row align-items-center" v-for="(payment, index) in payments" :style="index % 2 === 0 ? 'background: var(--gray-100)' : '' ">
			<div class="col-4 column-list">{{payment.created_at_formatted}}</div>
			<div class="col-3 column-list col-r-border">{{payment.product_name}}</div>
			<div class="col-3 column-list col-r-border">{{formatPrice(payment.amount_decimal * 100)}}</div>
			<div class="col-2 column-list col-r-border">{{payment.status}}</div>
		</div>
	
		<p v-if="!payments.length">No payments</p>
	</Fieldset>
</template>
 
 
<script>
	export default {
		props: {
			payments: Array
		},
		methods: {
			formatPrice(price) {
				return Helpers.formatPrice(price)
			}
		}
	}
</script>
 
 
<style lang='scss' scoped>
.fieldset {
	:deep(legend) {
		font-size: 1.2rem;
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