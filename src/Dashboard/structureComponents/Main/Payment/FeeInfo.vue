<template>
	<Card class="card">
		<template #title>
			<div class="card-header">
				<h5>Pay Info</h5>				
			</div>
		</template>
		<template #content>
			<div class="d-flex align-items-center justify-content-between">
				<h6><span class="fw-normal me-4">Yearly fee:</span> {{ fee }}</h6>
				<div class="mx-4">
					<i v-if="user.fee" class="pi pi-check-circle" :style="{fontSize: '2rem', color: 'var(--green-400)' }"></i>
					<i v-if="!user.fee" class="pi pi-times-circle" :style="{fontSize: '2rem', color: 'var(--red-400)' }"></i>
				</div>
			</div>
		</template>
		<template #footer>
			<Payments v-if="payments" :payments="payments"/>
		</template>
	</Card>
</template>
 
 
<script>
	import { mapGetters } from 'vuex'
	import Payments from './Payments.vue'

	export default {
		props: ['user'],
		created() {
			this.$store.dispatch("payments/getPayments", this.user.id);	
		},
		computed: {
			...mapGetters({ payments: 'payments/payments' }),
			fee() {
				return this.user.fee ? 'paid' : 'unpaid'
			}
		},
		components: { Payments }
	}
</script>
 
 
<style lang='scss' scoped>
.card {
	max-width: 768px;
}
</style>