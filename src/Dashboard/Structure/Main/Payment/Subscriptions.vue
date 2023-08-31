<template>
	<div>
		<CustomDialog :visible="showMessage" :response="response" @hideDialog="hideDialog"/>

		<Accordion :multiple="true" v-model:activeIndex="activeIndex" v-if="subscriptions" expandIcon="pi pi-chevron-down" 
					class="payment-acc" collapseIcon="pi pi-chevron-up" >
			<AccordionTab  v-for="(subscription, index) in subscriptions" :key="subscription.id" >
				<template #header>
					<div class="acc-tab-header1">
						
						<span>{{ $t('message.Subscription') }}</span>
								
						<span :class="`me-2 ${ checkStatusColor( subscription.status ) }`">
							{{ subscription.status }}
						</span>
						
					</div>
				</template>
				<template #default>
					<div class="acc-tab-content"> 
						<p class="text-subtitle mb-0">{{ $t('message.DateOfStart') }}</p>
						<p class="text-data">{{ formatTimestamp(subscription.start_date) }}</p>
						<p class="text-subtitle mb-0">{{ 'Interval' }}</p>
						<p class="text-data">{{ subscription.plan && formatPrice(subscription.plan.amount) + ' / ' + intervalTranslate(subscription.plan.interval) }}</p>
						<p class="text-subtitle mb-0">{{ $t('message.NextBillingDate') }}</p>
						<p class="text-data">{{ formatTimestamp(subscription.current_period_end) }}</p>
						<!-- <div class="col-3 column-list col-r-border">{{subscription.description}}</div>
						<div class="col-3 column-list col-r-border">{{formatPrice(subscription.amount)}}</div>
						<div class="col-2 column-list col-r-border">{{subscription.status}}</div> -->
					</div>
					<div class="text-end mt-4 cancel-sub">
						<Button :label="$t('message.Cancel') + ' ' + $t('message.Subscription')" 
								@click="cancelSubscription(subscription.id)" class="btn-black w-auto"
								:loading="loading" v-if="subscription.status !== 'canceled'"/>
					</div>
				</template>
			</AccordionTab>
		</Accordion>
		<LoadingIcon v-if="!subscriptions" :title="$t('message.Subscription').toLowerCase()" :hide="true"/>
	</div>
</template>
 
 
<script>
	import { mapGetters } from 'vuex'
	import Accordion from 'primevue/accordion';
	import AccordionTab from 'primevue/accordiontab';
	import LoadingIcon from '../../../global/LoadingIcon.vue';
	import CircleCheck from '../Stats/Vectors/CircleCheck.vue';
	import CircleFailed from '../Stats/Vectors/CircleFailed.vue';
	import CustomDialog from '../../../global/CustomDialog.vue';

	export default {
		created() {
			this.$store.dispatch("payments/getSubscriptions", { email: this.user.email, customer_id: this.user.stripe_customer_id } );
		},
		mounted() {
			this.targetButtonRef = this.$refs.targetButton;
		},
		props: {
			user: Object
		},
		data() {
			return {
				activeIndex: [],
				showMessage: null,
				response: null,
				loading: false
			}
		},
		methods: {
			hideDialog() {
				this.showMessage = false
			},
			toggleDialog() {
				this.showMessage = !this.showMessage;
			},
			formatTimestamp(data) {
				let timestamp = data * 1000
				return Helpers.formatDateToSk(timestamp, true)
			},
			formatPrice(price) {
				return Helpers.formatPrice(price)
			},
			checkStatusColor(status) {
				switch (status) {
					case 'active':
						return 'active'
						break;
					case 'trialing':
						return 'trialing'
						break;
					case 'failed':
						return 'failed'
						break;
					case 'unpaid':
						return 'failed'
						break;
				
					default:
						return 'default'
						break;
				}
			},
			cancelSubscription(id) {
				this.loading = true

				axios.get( this.subscriptionCancelUrl + id, {
						headers: {
							Authorization: 'Bearer ' + User.getToken()
						}
					})
					.then( response => {
						this.toggleDialog()
						this.response = response.data
						this.loading = false
						this.$store.dispatch("payments/getSubscriptions", { email: this.user.email, customer_id: this.user.stripe_customer_id } );					
					}).catch( error => {
						this.loading = false
						Toast.fire({
							icon: 'error',
							title: 'Unable to cancel subscription'
						})						
					})
			},
			intervalTranslate(interval) {
				if ( interval === 'month' ) {
					return this.$i18n.t('message.month')
				} else if ( interval === 'year' ) {
					return this.$i18n.t('message.year')
				} else {
					return interval
				}
			}
		},
		computed: {
			...mapGetters({ subscriptions: 'payments/subscriptions',
							subscriptionCancelUrl: 'links/subscriptionCancel' })
		},
		components: { Accordion, AccordionTab, LoadingIcon, CircleCheck, CircleFailed, CustomDialog },
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
	:deep(.p-accordion-header:not(.p-disabled).p-highlight .p-accordion-header-link),
	:deep(.p-accordion-header:not(.p-highlight):not(.p-disabled):hover .p-accordion-header-link),
	:deep(.p-accordion-header:not(.p-disabled).p-highlight:hover .p-accordion-header-link) {
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
	.active {
		color: var(--color-success);
	}
	.trialing {
		color: var(--color-trialing);
	}
	.failed {
		color: var(--color-failed);
	}
	.default {
		color: var(--orange-400);
	}
	.cancel-sub {
		position: relative;
		.cancel-sub-delete {
			position: absolute;
			right: 0;
			top: 0;
			//visibility: hidden;
			z-index: -5;
		}
	}
}
</style>