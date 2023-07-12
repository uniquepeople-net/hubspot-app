<template>
	<Card class="card">
		<template #title>
			<h5 class="card-header d-flex justify-content-between align-items-center">
				Dynamic data
				<Button icon="bi bi-plus-lg" class="p-button-rounded p-button-success p-button-outlined" 
						@click="addItem"/>
			</h5>
		</template>
		<template #content>
			<div v-for="(dynamic, index) in dynamicArr" class="my-2 d-flex" :key="index">
				<Dropdown v-model="dynamic.value" :options="dynamicData" :key="index" @change="selectedData($event, index)"
						optionLabel="name" optionValue="value" placeholder="Select an Value" 
						:class="`dynamic-dropdown ${submitted && !dynamic.value && 'p-invalid' }`"/>
				<InputText id="value" v-model="dynamic.code" :class="`ms-1 dynamic-input ${submitted && !dynamic.code && 'p-invalid'}`"
						name="value" placeholder="Value" disabled/>
				<Button icon="bi bi-dash-lg" class="p-button-rounded p-button-danger p-button-text remove-btn" 
						@click="removeItem(index)"/>
			</div>
		</template>
	</Card>
</template>
 
 
<script>
	import { mapGetters } from 'vuex';

	export default {
		props: ['submitted'],
		created() {
			this.$store.dispatch("emails/getDynamicData");
		},
		data() {
			return {
				dynamicArr: []
			}
		},
		methods: {
			addItem() {
				if ( this.dynamicArr.length === this.dynamicData.length) {
					return
				} else {
 					let obj = { value: '', code: '' }
					this.dynamicArr.push(obj)
				} 
			},
			removeItem(index) {
				this.dynamicArr = this.dynamicArr.filter( (d, i) => i !== index )
				this.$emit('dynamicArr', this.dynamicArr)
			},
			selectedData(data, index) {
				this.dynamicData.map( (d, i) => {
					if ( d.value === data.value ) {
						this.dynamicArr[index].code = d.code
					}
				})
				this.$emit('dynamicArr', this.dynamicArr)	
			}
		},
		computed: {
			...mapGetters({ dynamicData: 'emails/dynamicData' }),
		},
	}
</script>
 
 
<style lang='scss' scoped>
.dynamic-dropdown, .dynamic-input {
	width: 43%;
}
.remove-btn {
	//width: auto;
}
</style>