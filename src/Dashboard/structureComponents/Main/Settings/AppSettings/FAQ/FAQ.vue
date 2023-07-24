<template>
	<div>
		<Accordion :activeIndex="[0]" v-if="faqs" expandIcon="pi pi-angle-down" collapseIcon="pi pi-angle-up" class="faq-accordion">
			<AccordionTab  v-for="faq in faqs" :key="faq.id" :header="faq.question">
				<p>{{ faq.answer }}</p>
			</AccordionTab>
		</Accordion>

		<LoadingIcon v-if="!faqs" />
	</div>
</template>
 
 
<script>
	import { mapGetters } from 'vuex'
	import Accordion from 'primevue/accordion'
	import AccordionTab from 'primevue/accordiontab'
	import LoadingIcon from '../../../../../global/LoadingIcon.vue'

	export default {
		created() {
			this.$store.dispatch('faqSet/getFaq')
		},
		data() {
			return {
			}
		},
		methods: {
 
		},
		computed: {
			...mapGetters({ faqs: 'faqSet/faq' }),
			
		},
		components: { Accordion, AccordionTab, LoadingIcon },

	}
</script>
 
 
<style lang='scss' scoped>
.faq-accordion.p-accordion {
	max-width: 992px;
	margin: auto;
	:deep(.p-accordion-tab) {
		border-bottom: 1px solid var(--text-light-color);
		margin-bottom: 1rem;
	}
	:deep(.p-accordion-header):hover ,
	:deep(.p-accordion-header:not(.p-disabled).p-highlight:hover .p-accordion-header-link),
	:deep(.p-accordion-header:not(.p-disabled).p-highlight .p-accordion-header-link) {
		background: transparent;
	}
	:deep(.p-accordion-header-link) {
		display: flex;
		justify-content: space-between;
		flex-direction: row-reverse;
		font-size: 24px;
		font-weight: 600;
		background: transparent;
		border: 0;
	}
	:deep(.p-accordion-header-link):focus {
		box-shadow: unset;
	}
	:deep(.p-accordion-content) {
		background: transparent;
		border: 0;
	}
}
</style>