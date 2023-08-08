<template>
	<Card class="card">
		<template #title>
			<div class="card-header d-flex align-items-center justify-content-between">
				<h4 class="m-0 text-gt-bold">{{ product.name }}</h4>				
				<Tag class="mr-2" :severity="activityTag(product.active)" :value="activity(product.active)" rounded></Tag>
			</div>	
		</template>
		<template #content>			
			<h2 class="text-center header-main">{{ formatPrice(product.price.unit_amount) }}</h2>
			<Divider class="my-2"/>
			<div class="d-flex">
				<h5 class="text-link mb-0">Description: <span class="text-undertitle">{{ product.description }}</span></h5>
			</div>
			<Divider class="my-2"/>
			<h5 class="text-link mb-0">Interval: <span class="text-undertitle">{{ checkInterval(product.price) }}</span></h5>
			<Divider class="my-2"/>
			<h5 class="text-link mb-0">Membership: <span class="text-undertitle">{{ product.metadata.membership_name }}</span></h5>
			<Divider class="my-2"/>
		</template>
		<template #footer>
			<div v-if="!pay" class="d-flex justify-content-end edit-icon">
				<router-link :to="{name: 'specific-product', params: {product_id: product.id}}">
					<i class="bi bi-pencil-square"></i>
				</router-link>
			</div>
			<Button v-if="pay" @click="payProduct" class="pay-btn">Pay</Button>
		</template>
	</Card>
</template>
 
 
<script>
	import Tag from 'primevue/tag';

	export default {
		props: {
			product: Object,
			pay: Boolean
		},
		methods: {
			activity(data) {
				return Boolean(data) === true ? 'Active' : 'Inactive'
			},
			activityClass(data) {
				return Boolean(data) === true ? 'active-color' : 'inactive-color'
			},
			activityTag(data) {
				return Boolean(data) === true ? 'success' : 'danger'
			},
			payProduct() {
				this.$emit('product', this.product)
			},
			checkInterval(price) {
				return price.recurring === null ? 'one-time' : price.recurring.interval
			},
			formatPrice(price) {
				return Helpers.formatPrice(price)
			}
		},
		components: { Tag }
	}
</script>
 
 
<style lang='scss' scoped>
.edit-icon {
	.bi {
		font-size: 1.4rem;
	}
}
.bi-pencil-square {
	color: var(--yellow-700);
}
.card {
	:deep(.p-card-footer) {
		padding: 0;
	}
	:deep(.p-card-content) {
		padding-bottom: 0;
	}
	.pay-btn {
		width: 100%;
		justify-content: center;
	}
}
</style>