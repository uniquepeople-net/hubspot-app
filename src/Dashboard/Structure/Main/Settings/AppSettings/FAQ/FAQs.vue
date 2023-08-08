<template>
	<div class="faqs-list">
		<Skeleton v-if="!faqs" height="2rem" class="mb-2"></Skeleton>
		<DataTable v-if="faqs" :value="faqs" >
			<Column field="question" header="Question"></Column>
			<Column >
				<template #body="slotProps">
					<span>
						{{ fullText ? slotProps.data.answer : shorten(slotProps.data.answer)}} 
						<Button :label="fullText ? 'Short' : 'Full'" v-if="checkStrLength(slotProps.data.answer)"
 								@click="handleText" plain text raised />
					</span>
				</template>
			</Column>
			<Column style="width:50px">
				<template #body="slotProps">
					<DeleteItem :delete="true" :itemId="slotProps.data.id" 
								:itemName="slotProps.data.question" callback="faqSet/getFaq"
								item="FAQ" url="/api/settings-faq/" redirectRoute="app-settings">
					</DeleteItem>
				</template>
			</Column>
		</DataTable>
	</div>
</template>
 
 
<script>
	import { mapGetters } from 'vuex'
	import DeleteItem from '../../../Users/DeleteItem.vue'

	export default {
		created() {
			this.$store.dispatch('faqSet/getFaq')
		},
		data() {
			return {
				fullText: false,
				maxLength: 40
			}
		},
		methods: {
			shorten(string) {
				if (string.length <= this.maxLength) {
					return string;
				} else {
					return string.slice(0, this.maxLength) + '...';
				}
			},
			handleText() {
				this.fullText = !this.fullText
			},
			checkStrLength(string) {
				if (string.length <= this.maxLength) {
					return false
				} else {
					return true
				}
			}
		},
		computed: {
			...mapGetters({ faqs: 'faqSet/faq' }),
		},
		components: { DeleteItem }
	}
</script>
 
 
<style lang='scss' scoped>
.faqs-list {
	:deep(.p-button) {
		margin-left: 1rem;
		padding: 0 .5rem;
	}
}
</style>