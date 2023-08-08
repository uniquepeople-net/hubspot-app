<template>
	<div>
		<div class="d-flex align-items-center">
				<div class="w-50 max-choosed">
					<label for="maxChoosed">To choose</label>
					<InputNumber inputId="maxChoosed" v-model="maxChoosed" showButtons mode="decimal" 
								 :min="1" :max="20" 
								 :change="handleChange()" :class="{'p-invalid':submitted && maxChoosed < 1}"/>
				</div>

				<div class="ms-3">
					<label for="positions">Position</label>
					<Dropdown inputId="positions" v-model="position" :options="positions" 
							  optionLabel="position" optionValue="id" placeholder="Select a Position"
							  @change="handleChange()"/>
				</div>
		</div>
	</div>
</template>
 
 
<script>
	import { mapGetters } from 'vuex'
	import { debounce } from 'lodash';
	import InputNumber from 'primevue/inputnumber'

	export default {
		props: {
			id: Number,
			type: Number,
			submitted: Boolean,
			question: Object,
		},
		created() {
			this.$store.dispatch("surveys/getPositions");
		},
		mounted() {
			if ( this.question ) {
				this.maxChoosed = this.question.max_to_choose ? this.question.max_to_choose : this.maxChoosed
				this.position = Number(this.question.closed_answs_default)
			}
			this.$store.dispatch("surveys/setNewSurvey", { max_choosed: this.maxChoosed, value_default: this.position, index: this.id })
		},
		data() {
			return {
				maxChoosed: 0,
				position: null,
			}
		},
		methods: {
			handleChange() {
				this.updateValue()
			},
			updateValue: debounce(function () {
				let dataObj = {
					max_choosed: this.maxChoosed,
					value_default: this.position,
					index: this.id
				}
				
				this.$store.dispatch("surveys/setNewSurvey",  dataObj )
			}, 100),
		},
		computed: {
			...mapGetters({ positions: 'surveys/positions' })
		},
		components: { InputNumber }
	}
</script>
 
 
<style lang='scss' scoped>
.max-choosed, .opened-questions {
	max-width: 6rem;
}
</style>