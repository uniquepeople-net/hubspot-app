<template>
	<Card class="card">
		<template #title>
			<div class="card-header d-flex align-items-center justify-content-between">
				<h4 class="m-0">{{ product.name }}</h4>				
				<Tag class="mr-2" :severity="activityTag(product.active)" :value="activity(product.active)" rounded></Tag>
			</div>	
		</template>
		<template #content>			
			<h2 class="text-center">{{ product.amount_decimal }}<span> €</span></h2>
			<Divider />
			<div class="d-flex">
				<h5 class="fw-light">Description: <span class="fw-normal">{{ product.description }}</span></h5>
			</div>
			<Divider />
			<h5 class="fw-light">Interval: <span class="fw-normal">{{ product.interval.name }}</span></h5>
			<Divider />
		</template>
		<template #footer>
			<div v-if="!pay" class="d-flex justify-content-end edit-icon">
				<router-link :to="{name: 'specific-product', params: {product_id: product.id}}">
					<i class="bi bi-pencil-square"></i>
				</router-link>
			</div>
			<Button v-if="pay" @click="payProduct">Pay</Button>
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
}
</style>