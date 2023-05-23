<template>
	<div class="card flex justify-content-center">
        <div class="flex flex-column gap-3">
            <div v-for="category in categories" :key="category.key" class="flex align-items-center">
                <RadioButton v-model="selectedCategory" :inputId="category.key" name="pizza" :value="category.name" />
                <label :for="category.key" class="ml-2">{{ category.name }}</label>
            </div>
        </div>
    </div>
</template>
 
 
<script>
	import RadioButton from 'primevue/radiobutton'

	export default {
		data() {
			return {
				selectedCategory: 'Production',
				categories: [
					{ name: 'Accounting', key: 'A' },
					{ name: 'Marketing', key: 'M' },
					{ name: 'Production', key: 'P' },
					{ name: 'Research', key: 'R' }
				]
			}
		},
		methods: {
 
		},
		components: { RadioButton }
	}
</script>
 
 
<style lang='scss' scoped>
</style>