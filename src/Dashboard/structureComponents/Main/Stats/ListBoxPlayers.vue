<template>
	<Listbox v-model="selectedCity" :options="groupedCities" optionLabel="label" optionGroupLabel="label" optionGroupChildren="items" class="w-full md:w-14rem" listStyle="max-height:250px">
		<template #optiongroup="slotProps">
			<div class="flex align-items-center">
				<img :alt="slotProps.option.name" src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png" :class="`flag flag-${slotProps.option.code.toLowerCase()} mr-2`" style="width: 18px" />
				<div>{{ slotProps.option.label }}</div>
			</div>
		</template>
    </Listbox>
</template>
 
 
<script>
	import Listbox from 'primevue/listbox';

	export default {
		created() {
			
		},
		data() {
			return {
			}
		},
		methods: {
 
		},
	}
</script>
 
 
<style lang='scss' scoped>
</style>