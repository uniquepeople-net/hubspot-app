<template>
	<div>
		<div class="max-choosed">
				<label for="maxChoosed">Max. questions to choose</label>
				<InputNumber inputId="maxChoosed" v-model="maxChoosed" showButtons mode="decimal" 
							 :min="1" :max="20" 
							 :change="handleChange()" :class="{'p-invalid':submitted && maxChoosed < 1}"/>
		</div>
	</div>
</template>
 
 
<script>
	import { debounce } from 'lodash';
	import InputNumber from 'primevue/inputnumber'

	export default {
		props: {
			id: Number,
			type: Number,
			submitted: Boolean,
			question: Object,
		},
		mounted() {
			if ( this.question ) {
				this.maxChoosed = this.question.max_to_choose ? this.question.max_to_choose : this.maxChoosed
			}
		},
		data() {
			return {
				maxChoosed: 0,
			}
		},
		methods: {
			handleChange() {
				this.updateValue()
			},
			updateValue: debounce(function () {
				let dataObj = {
					max_choosed: this.maxChoosed,
					index: this.id
				}
				
				this.$store.dispatch("surveys/setNewSurvey",  dataObj )
			}, 100),
		},
		components: { InputNumber }
	}
</script>
 
 
<style lang='scss' scoped>
.max-choosed, .opened-questions {
	max-width: 8rem;
}
</style>