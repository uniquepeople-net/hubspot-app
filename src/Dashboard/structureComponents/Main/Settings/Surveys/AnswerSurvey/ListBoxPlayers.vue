<template>
	<Listbox v-model="selectedPlayer" :options="squad" optionLabel="name" 
			class="w-full md:w-14rem mt-3" listStyle="max-height:170px"
			:change="handlePlayer()">
		<template #option="slotProps">
			<div class="flex align-items-center">
				<img :alt="slotProps.option.shortName" :src="slotProps.option.imageDataURL" :class="`flag flag-${slotProps.option.wyId} mr-2`" style="width: 18px" />
				<span class="ms-3">{{ slotProps.option.shortName }}</span>
				<span class="ms-3">({{ slotProps.option.role.name }})</span>
			</div>
		</template>
	</Listbox>
</template>
 
 
<script>
	import Listbox from 'primevue/listbox';

	export default {
		props: {
			squad: Array
		},
		data() {
			return {
				selectedPlayer: null,
			}
		},
		methods: {
			handlePlayer() {
				if ( this.selectedPlayer ) {
					console.log('dfdf')
					
					this.selectedPlayers.push( this.selectedPlayer )
				}
			}
		},
		components: { Listbox }
	}
</script>
 
 
<style lang='scss' scoped>
</style>