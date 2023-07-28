<template>
	<div class="row g-3">
		<SquareItem v-for="item in items" class="col-4" :label="item.label" :description="item.description" :route="item.route">
			<template v-slot:vector>
				<component :is="item.vector"/>	
			</template>
		</SquareItem>
	</div>
</template>
 
 
<script>
	import SquareItem from './SquareItem.vue'
	import Stats from '../Stats/Vectors/Stats.vue'
	import Payments from '../Stats/Vectors/Payments.vue'

	export default {
		data() {
			return {
				items: [
					{ label: this.$i18n.t('message.Stats'), description: 'Personal & Team',  vector: 'Stats', route: 'stats' },
					{ label: this.$i18n.t('message.Payments'), description: 'Membership Fee',  vector: 'Payments', route: 'wallet-info' }
				]
			}
		},
		methods: {
			
		},
		components: { SquareItem, Stats, Payments },
	}
</script>
 
 
<style lang='scss' scoped>
</style>