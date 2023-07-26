<template>
	<div>
		<Accordion :multiple="true" :activeIndex="activeIndex" v-if="subscriptions" expandIcon="pi pi-chevron-down" 
					class="payment-acc" collapseIcon="pi pi-chevron-up" >
			<AccordionTab  v-for="(subscription, index) in subscriptions" :key="subscription.id" >
				<template #header>
					<div class="acc-tab-header1">
						<span :class="`${ subscription.status !== 'succeeded' ? 'failed' : '' }`">
							{{hiddenCard(subscription.metadata.last4)}}
						</span>
						<span class="d-flex align-items-center">
							<CircleCheck v-if="subscription.status === 'succeeded'" class="me-3"/>
							<CircleFailed v-if="subscription.status !== 'succeeded'"/>
						</span>
					</div>
				</template>
				<template #default>
					<div class="acc-tab-content"> 
						<p class="text-subtitle mb-0">{{ $t('message.DateOfsubscription') }}</p>
						<p class="text-data">{{ formatTimestamp(subscription.created) }}</p>
						<p class="text-subtitle mb-0">{{ subscription.description }}</p>
						<p class="text-data">{{ formatPrice(subscription.amount) }}</p>
						<!-- <div class="col-3 column-list col-r-border">{{subscription.description}}</div>
						<div class="col-3 column-list col-r-border">{{formatPrice(subscription.amount)}}</div>
						<div class="col-2 column-list col-r-border">{{subscription.status}}</div> -->
					</div>
				</template>
				
			</AccordionTab>
		</Accordion>
		<LoadingIcon v-if="!subscriptions" title="subscriptions"/>
		<Button label="Cancel Subscription" @click="cancelSubscription"/>
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
			this.$store.dispatch("payments/getSubscriptions", this.user.email );
		},
		props: {
			user: Object
		},
		data() {
			return {
			}
		},
		methods: {
			cancelSubscription() {

			}
		},
		computed: {
			...mapGetters({ subscriptions: 'payments/subscriptions' })
		},
		components: { Accordion, AccordionTab, LoadingIcon, CircleCheck, CircleFailed },
	}
</script>
 
 
<style lang='scss' scoped>
</style>