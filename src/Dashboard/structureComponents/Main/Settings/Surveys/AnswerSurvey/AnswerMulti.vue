<template>
	<div>
		<h5>{{question.title}}</h5>
		<small>Choose max. {{ this.question.max_to_choose }} answers </small>

		<div class="checkbox-wrapper my-4 ps-2">
			<div class="field-checkbox my-2" v-for="(item, index) in items">
	            <Checkbox :inputId="item" :name="item" :value="item" v-model="selectedValues" 
						  :disabled="checkMaxChoosed(item)"/>
	            <label :for="item" :class="`ms-2 ${checkMaxChoosed() ? 'opacity-50' : ''}`">{{item}}</label>
	        </div>
		</div>

		<div v-for="(input, index) in question.opened_answers" class="col-12 mb-4" :key="index">
			<InputText class="w-100" v-model="selectedInputs[index]" :disabled="checkMaxChoosed(selectedInputs[index])" :key="index"/>
		</div>

	</div>
</template>
 
 
<script>
	import Checkbox from 'primevue/checkbox';
	import AnswerOpen from './AnswerOpen.vue';

	export default {
		props: {
			question: Object
		},
		data() {
			return {
				selectedValues: [],
				selectedInputs: []
			}
		},
		methods: {
			checkMaxChoosed(item) {
				let checkArr = []
				let checkboxes = this.selectedValues
				let inputs = this.selectedInputs.filter( f => { return true })
				checkArr = [ ...checkboxes, ...inputs ]

				if ( this.question.type_id === 4 && (checkArr.length === this.question.max_to_choose) ) {
					console.log(checkArr, item)

					if ( !checkArr.includes(item) ) {
						return true
					} else {
						return false
					}
				}

				if ( checkboxes.length === this.question.max_to_choose ) {
					return !checkboxes.includes(item) ? true : false
				}

			},
			handleChangeInput(event) {
				console.log(event, 'this.selectedValues')
			}
		},
		computed: {
			items() {
				let items = []
				this.question.multi_answers.map( (q , index) =>  {
					items.push(q) 
				})
				return items 
			},
			inputItems() {
				let inputs = [...Array(this.question.opened_answers).fill('')]
				return inputs
			}
		},
		watch: {
			selectedInputs: {
				handler: function(data) {

				},
				deep: true
			}
		},
		components: { Checkbox, AnswerOpen },
	}
</script>
 
 
<style lang='scss' scoped>
.field-checkbox {
	& :deep(.p-checkbox-box), & :deep(.p-checkbox) {
		width: 25px;
		height: 25px;
	}
}
.opacity-60 {
	opacity: .6;
}
</style>