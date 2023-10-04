<template>
	<div class="center-center">
		<span class="me-3">Filter products: </span>
		<span class="p-float-label">
			<InputText v-model="value" id="name" @update:modelValue="updateInput"/>
			<label for="name">Keyword</label>
		</span>
	</div>
</template>
 
 
<script>
import InputText from 'primevue/inputtext'

export default {
	data() {
		return {
			value: ''
		}
	},
	methods: {
		updateInput(event) {
			this.$emit('update', this.value)
		}
	},
	components: { InputText }
}
</script>
 
 
<style lang='scss' scoped>
</style>