<template>
	<div>
		<Accordion :multiple="true" v-model:activeIndex="activeIndex" v-if="payments" expandIcon="pi pi-chevron-down" 
					class="payment-acc" collapseIcon="pi pi-chevron-up">
			<AccordionTab  v-for="(payment, index) in payments" :key="payment.id" :headerClass="`${activeIndex === index ? 'opened-tab' : ''}`">
				<template #header>
					<div class="acc-tab-header1">
						<span :class="`${ payment.status !== 'succeeded' ? 'failed' : '' }`">
							{{hiddenCard(payment.metadata.last4)}}
						</span>
						<span class="d-flex align-items-center">
							<CircleCheck v-if="payment.status === 'succeeded'" class="me-3"/>
							<CircleFailed v-if="payment.status !== 'succeeded'" class="me-3"/>
						</span>
					</div>
				</template>
				<template #default>
					<div class="acc-tab-content"> 
						<p class="text-subtitle mb-0">{{ $t('message.DateOfPayment') }}</p>
						<p class="text-data">{{ formatTimestamp(payment.created) }}</p>
						<p class="text-subtitle mb-0">{{ payment.description }}</p>
						<p class="text-data">{{ formatPrice(payment.amount) }}</p>
						<!-- <div class="col-3 column-list col-r-border">{{payment.description}}</div>
						<div class="col-3 column-list col-r-border">{{formatPrice(payment.amount)}}</div>
						<div class="col-2 column-list col-r-border">{{payment.status}}</div> -->
					</div>
				</template>
				
			</AccordionTab>
		</Accordion>
		<LoadingIcon v-if="!payments" title="payments"/>
	</div>
</template>
 
 
<script>
	import { mapGetters } from 'vuex'
	import Accordion from 'primevue/accordion';
	import AccordionTab from 'primevue/accordiontab';
	import LoadingIcon from '../../../global/LoadingIcon.vue';
	import CircleCheck from '../Stats/Vectors/CircleCheck.vue';
	import CircleFailed from '../Stats/Vectors/CircleFailed.vue';

	export default {
		created() {
			this.$store.dispatch("payments/getListPayments", this.user.email );
		},
		props: {
			user: Object
		},
		data() {
			return {
				activeIndex: [],
			}
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
			},
			hiddenCard(data) {
				return '**** **** **** ' + data
			},
			/* openedTabIndex(event) {
				this.activeIndex.push(event.index)
			},
			closedTabIndex(event) {
				this.activeIndex = this.activeIndex.filter( f => f !== event.index )
			} */
		},
		computed: {
			...mapGetters({ payments: 'payments/listPayments' })
		},
		components: { Accordion, AccordionTab, LoadingIcon, CircleCheck, CircleFailed },

	}
</script>
 
 
<style lang='scss' scoped>
.p-accordion.payment-acc {
	margin-top: 2rem;
	:deep(.p-accordion-tab) {
		margin-bottom: 1rem;
	}
	:deep(.p-accordion-header-link), .acc-tab-header1,
	:deep(.p-accordion-tab:first-child .p-accordion-header .p-accordion-header-link) {
		display: flex;
		flex-direction: row-reverse;
		justify-content: space-between;
		border: 0;
		border-radius: var(--btn-border-radius);
		background: var(--card-bg);
	}
	:deep(.p-accordion-header-link), :deep(.p-accordion-header-link):focus {
		box-shadow: 0px 4px 5px 0px rgba(0, 0, 0, 0.10);
	}
	:deep(.p-accordion-header:not(.p-disabled).p-highlight .p-accordion-header-link) {
		background: var(--card-bg);
	}
	.acc-tab-header1 {
		flex-direction: row;
		flex: 1;
	}
	:deep(.p-accordion-content) {
		box-shadow: 0px 4px 5px 0px rgba(0, 0, 0, 0.10);
		border: 0;
		border-radius: 0 0 var(--btn-border-radius) var(--btn-border-radius);
		background: var(--card-bg);
		position: relative;
		z-index: 99;
		padding-top: 0;
	}
	:deep(.p-accordion-toggle-icon) {
		color: var(--text-light-color);
	}
	.failed {
		color: var(--color-failed);
	}
	:deep(.opened-tab.p-highlight) {
		.p-accordion-header-link {
			background: var(--card-bg);
			box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.10);
		}
	}
	.acc-tab-content {
		padding-top: 1rem;
		border-top: 1px solid var(--text-light-color);
	}
}

</style>