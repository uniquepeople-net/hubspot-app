<template>
	<div class="my-5 advanced">
		<Fieldset legend="Advanced" :toggleable="true" :collapsed="true">
			<div class="row mt-5">
				
				<div class="d-flex flex-column mb-5 col-12 col-lg-6">
					<label for="type">Type</label>
					<Dropdown inputId="type" v-model="type" :options="types" 
							  optionLabel="name" optionValue="id" placeholder="Select Type"
							  @change="handleChange()"/>
				</div>

				<div v-if="type === 2" class="d-flex flex-column mb-5 col-12 col-lg-6">
					<label for="competition">Competitions</label>
					<Dropdown inputId="competition" v-model="competition" :options="competitionsList" 
							  optionLabel="name" optionValue="wyId" placeholder="Select Competition"
							  @change="handleChange()" :class="{'p-invalid': submitted && competition === null}"/>
				</div>

				<div class="d-flex mb-5 col-12 col-lg-6">
					<!-- <InputIcon icon="bi bi-chat-square-text"></InputIcon> -->
					<Textarea id="message" v-model="message" rows="2"
							name="message" placeholder="Success message" @change="handleChange()"/>
				
					<!-- <InputError :validator="v$.name" :submitted="submitted" replace="Name"></InputError> -->
				</div>

				<div class="d-flex flex-column mb-5 col-12 col-xxl-6">
					<label for="competition">Guidelines:</label>
					<Editor v-model="guidelines" @update:modelValue="handleChange()"/>
				</div>
				
			</div>
		</Fieldset>
	</div>
</template>
 
 
<script>
	import { mapGetters } from 'vuex'
	import Editor from 'primevue/editor'

	export default {
		props: {
			specSurvey: Object,
			submitted: Boolean
		},
		created() {
			this.$store.dispatch("stats/getCompetitionsList");
			this.$store.dispatch('surveys/getTypes')
		},
		mounted() {
			if ( this.specSurvey && this.specSurvey.advanced ) {
				let advanced = this.specSurvey.advanced

				this.message = advanced.success_message ? advanced.success_message : this.message
				this.competition = advanced.competition_id ? advanced.competition_id : this.competition
				this.type = this.specSurvey.type_id ? this.specSurvey.type_id : this.type
				this.guidelines = advanced.guidelines ? advanced.guidelines : this.guidelines
			}
			this.handleChange()
		},
		data() {
			return {
				message: '',
				competition: null,
				type: 1,
				guidelines: ''
			}
		},
		methods: {
			handleChange() {
				this.$emit('update:modelValue', 
					{ message: this.message, competition: this.competition, type: this.type, guidelines: this.guidelines })
			}
		},
		computed: {
			...mapGetters({ basicUrl: 'links/statBasicUrl',
							competitionsSvkUrl: 'links/competitionsListSvk',
							competitionsList: 'stats/competitionsList',
							types: 'surveys/types'}),
		},
		components: { Editor }
	}
</script>
 
 
<style lang='scss' scoped>
.advanced {
	:deep(.p-fieldset) {
		position: relative;
		.p-fieldset {
			border: 0;
		}
		.p-fieldset-legend {
			font-size: 1rem;
			width: auto;
			position: absolute;
			top: -1rem;
			left: 1rem;
		}
	}
}
</style>