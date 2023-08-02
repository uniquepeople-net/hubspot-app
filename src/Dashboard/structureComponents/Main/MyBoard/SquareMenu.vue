<template>
	<div class="row g-3">
		<SquareItem v-for="(item, index) in items" class="col-4" :label="item.label" :description="item.description" :route="item.route" :key="index">
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
	import PlayerShirt from '../Stats/Vectors/PlayerShirt.vue'
	import Calendar from '../Stats/Vectors/Calendar.vue'
	import Media from '../Stats/Vectors/Media.vue'
	import Award from '../Stats/Vectors/Award.vue'
	import Document from '../Stats/Vectors/Document2.vue'
	import Hammer from '../Stats/Vectors/Hammer.vue'
	import Contact from '../Stats/Vectors/Contact.vue'

	export default {
		data() {
			return {
				items: [
					{ label: this.$i18n.t('message.News'), description: 'UFP' + this.$i18n.t('message.News'),  vector: 'Stats', route: 'stats' },
					{ label: this.$i18n.t('message.Stats'), description: this.$i18n.t('message.PersonalTeam'),  vector: 'Stats', route: 'stats' },
					{ label: this.$i18n.t('message.Media'), description: 'UFP ' + this.$i18n.t('message.Podcasts'),  vector: 'Media', route: 'my-board' },
					/* { label: this.$i18n.t('message.Player'), description: this.$i18n.t('message.PlayerProfile'),  vector: 'PlayerShirt', route: 'my-profile' }, */
					{ label: this.$i18n.t('message.Events'), description: 'UFP ' + this.$i18n.t('message.Events'),  vector: 'Calendar', route: 'my-board' },
					{ label: 'Top 11', description: 'UFP Top 11',  vector: 'Award', route: 'top-11-list' },
					{ label: this.$i18n.t('message.Agency'), description: 'UFP ' + this.$i18n.t('message.Agency'),  vector: 'Hammer', route: 'my-board' },
					{ label: this.$i18n.t('message.Documents'), description: 'UFP ' + this.$i18n.t('message.Documents'),  vector: 'Document', route: 'documents' },
					{ label: this.$i18n.t('message.Payments'), description: this.$i18n.t('message.MembershipFee'),  vector: 'Payments', route: 'wallet-info' },
					{ label: this.$i18n.t('message.Contact'), description: 'UFP ' + this.$i18n.t('message.Contact'),  vector: 'Contact', route: 'info-ufp' },
				]
			}
		},
		methods: {
			
		},
		components: { SquareItem, Stats, Payments, PlayerShirt, Calendar, Media, Award, Document, Hammer, Contact },
	}
</script>
 
 
<style lang='scss' scoped>
</style>