<template>
	<Card class="card">
		<template #title>
			<div class="card-header d-flex justify-content-between align-items-center">
				<h5>FAQ</h5>
				<OpenBlockIcon :collapsed="collapsed" @click="() => { collapsed = !collapsed }" />
			</div>
		</template>
		<template #content v-if="collapsed">
			<div class="row">
				<div class="col-12 mb-4">
					<FAQs />
				</div>
				
				<div class="col-12 mt-4">
					<FAQAdd />
				</div>
			</div>
		</template>
	</Card>
</template>
 
 
<script>
	import OpenBlockIcon from '../../../../../global/OpenBlockIcon.vue'
	import FAQAdd from './FAQAdd.vue'
	import FAQs from './FAQs.vue'

	export default {
		data() {
			return {
				collapsed: false
			}
		},
		methods: {
			
		},
		components: { FAQs, OpenBlockIcon, FAQAdd },
	}
</script>
 
 
<style lang='scss' scoped>
</style>