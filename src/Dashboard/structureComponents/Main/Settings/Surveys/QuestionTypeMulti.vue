<template>
	<div class="my-4">
		<div class="multi-question row">
			<div v-for="(item, index) in values" :key="item.id" class="col-12 col-lg-6 my-4 d-flex align-items-center">
				<InputText v-model="item.value" placeholder="Value" class="d-inline-block"/>
				<Button icon="bi bi-dash-lg" class="p-button-rounded p-button-danger p-button-text" 
					@click="removeItem(item.id)"/>
			</div>
		</div>
		<div class="row">
			<div v-if="type === 3 || type === 4" class="d-flex flex-column add-item">
				<span>Add item</span>
				<Button icon="bi bi-plus-lg" class="p-button-rounded p-button-success p-button-outlined" 
						@click="addItem"/>
			</div>
	
			<div class="max-choosed" v-if="type === 3 || type === 4">
				<label for="maxChoosed">Max. questions to choose</label>
				<InputNumber inputId="maxChoosed" v-model="maxChoosed" showButtons mode="decimal" :max="values.length"/>
		    </div>
			
			<div v-if="type === 4" class="opened-questions">
				<QuestionTypeOpen />
			</div>

			<div class="opinion-levels" v-if="type === 5">
				<label for="levels">Scale levels</label>
				<InputNumber inputId="levels" v-model="levels" showButtons mode="decimal" :max="20"/>
			</div>
		</div>
	</div>
</template>
 
 
<script>
	import uniqueId from 'lodash/uniqueId';
	import QuestionTypeOpen from './QuestionTypeOpen.vue';
	import InputNumber from 'primevue/inputnumber'

	export default {
		props: [ 'type' ],
		data() {
			return {
				values: [],
				maxChoosed: 0,
				levels: 1
			}
		},
		methods: {
			addItem() {
				let newObj = { value: '', id: uniqueId()}
				this.values = [...this.values, newObj] 
				this.maxChoosed = this.values.length
			},
			removeItem(index) {
				this.values = this.values.filter( q => q.id !== index )
				this.maxChoosed = this.values.length
			},
			max() {
				return this.values.length
			}
		},
		components: { QuestionTypeOpen, InputNumber },
	}
</script>
 
 
<style lang='scss' scoped>
.add-item {
	max-width: 8rem;
	margin-right: 2rem;
}
.max-choosed, .opened-questions {
	max-width: 15rem;
	margin-right: 2rem;
}
.opinion-levels {
	max-width: 15rem;
}
</style>