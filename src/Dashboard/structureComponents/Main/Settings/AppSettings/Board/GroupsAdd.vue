<template>
	<div>
		<div class="row" v-for="(d, index) in data" :key="index">
			<div class="inputgroup col-12 mb-5 mb-lg-0 position-relative">
				<InputText id="name" v-model="d.name" :class="{'p-invalid': false, 'w-100': true}"
							name="name" placeholder="Name"/>

				<small v-if="false" class="error-msg">Insert valid name</small>
			</div>

			<div class="inputgroup col-12">
				<InputNumber id="order" v-model="d.order" :class="{'p-invalid': false, 'w-100': true}" 
						name="order" placeholder="Order"/>
			
				<small v-if="false" class="error-msg">Insert title between 2 and 255 characters</small>
			</div>
		</div>
	</div>
</template>
 
 
<script>
	import InputNumber from 'primevue/inputnumber';

	export default {
		data() {
			return {
				data: [
					{ name: '', order: '' }
				]
			}
		},
		methods: {
			addItem() {
				let obj = { name: '', order: '' }
				this.data.push(obj)
			},
			removeItem(index) {
				this.data = this.data.filter( (d, i) => i !== index )
			},
		},
		components: { InputNumber }
	}
</script>
 
 
<style lang='scss' scoped>
</style>