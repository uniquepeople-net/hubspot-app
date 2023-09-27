<template>
	<div class="mx-auto">
		<Dialog v-model:visible="showMessage" :breakpoints="{ '960px': '80vw' }" :style="{ width: '30vw' }" position="top">
			<div class="flex align-items-center flex-column pt-6 px-3">
				<i v-if="response.message" class="pi pi-check-circle" :style="{fontSize: '4rem', color: 'var(--green-400)' }"></i>
				<i v-if="response.error" class="pi pi-times-circle" :style="{fontSize: '4rem', color: 'var(--red-400)' }"></i>
				<h5 v-if="response.message" class="mt-3">{{ response.message }}</h5>
				<h6 v-if="response.error" v-for="(error, key) in response.error" class="mt-3" :key="key">{{ key + ': ' + error[0] }}</h6>
			</div>
			<template #footer>
				<div class="flex justify-content-center">
					<Button label="OK" @click="toggleDialog(); redirect();" class="p-button-text" />
				</div>
			</template>
		</Dialog>
	
		<Card class="card mx-auto">
			<template #title>
				<div class="card-header d-flex justify-content-between align-items-center">
					<h5><span class="fw-light">Add New Survey</span></h5>
				</div>
			</template>
			<template #content>
					<div class="card-body">
						<form @submit.prevent="handleSubmit(!v$.$invalid)" class="p-fluid">
	
							<div class="row">
								<div class="inputgroup mb-5 col-12 col-lg-6">
									<!-- <InputIcon icon="bi bi-pencil"></InputIcon> -->
									<InputText id="name" v-model="v$.name.$model" :class="{'p-invalid':v$.name.$invalid && submitted}" 
											name="name" placeholder="Name"/>
								
									<InputError :validator="v$.name" :submitted="submitted" replace="Name"></InputError>
								</div>

								<div class="inputgroup mb-5 col-12 col-lg-6">
									<!-- <InputIcon icon="bi bi-pen"></InputIcon> -->
									<InputText id="description" v-model="v$.description.$model" :class="{'p-invalid':v$.description.$invalid && submitted}" 
											name="description" placeholder="Description"/>
								
									<InputError :validator="v$.description" :submitted="submitted" replace="Description"></InputError>
								</div>

								<div class="inputgroup mb-5 col-12 align-items-center col-lg-6">
									<label for="start">Start date:&nbsp;</label>
									<Calendar inputId="start" v-model="v$.startDate.$model" dateFormat="dd.mm.yy" class="calendar" :class="{'p-invalid':v$.startDate.$invalid && submitted}"/>
									<InputError :validator="v$.startDate" :submitted="submitted" replace="Start date"></InputError>
								</div>

								<div class="inputgroup mb-5 col-12 align-items-center col-lg-6">
									<label for="finish">Finish date:&nbsp;</label>
									<Calendar inputId="finish" v-model="v$.finishDate.$model" dateFormat="dd.mm.yy" class="calendar" :class="{'p-invalid':v$.finishDate.$invalid && submitted}"/>
									<InputError :validator="v$.finishDate" :submitted="submitted" replace="Finish date"></InputError>
								</div>

								<div class="inputgroup mb-5 col-12 col-lg-6 justify-content-center">
									<!-- <InputIcon icon="bi bi-activity"></InputIcon> -->
									<ToggleButton v-model="active" onLabel="Active" offLabel="Inactive" onIcon="pi pi-check" offIcon="pi pi-times" :class="`${active ? 'bg-success' : 'bg-danger'} p-togglebtn-active`"/>
								</div>

								<div class="inputgroup mb-5 col-12 col-lg-6 justify-content-center">
									<!-- <InputIcon icon="bi bi-key"></InputIcon> -->
									<ToggleButton v-model="public" onLabel="Public" offLabel="Private" onIcon="bi bi-unlock" offIcon="bi bi-lock" :class="`${public ? 'bg-warning' : 'bg-info'} p-togglebtn-active`"/>
								</div>
			
							</div>

							<SurveyAdvanced v-model="advancedData" :submitted="submitted" />
							
							<Divider />

							<div>
								<SurveyQuestions :submitted="submitted" :surveyType="advancedData ? advancedData.type : null"/>
								<p v-if="!newSurvey.questions || !newSurvey.questions.length" class="text-danger text-center">No questions added</p>
							</div>
	
							<Divider />

								<Hashes :name="name"/>

							<Divider />

							<div class="d-flex align-items-center flex-column">
								<Button type="submit" label="Add Survey" class="mt-2 submit-btn btn-black" />
								<small v-if="errors" class="q-errors mt-3">Questions {{errors}} not correctly created</small>
							</div>
						</form>
					</div>
				</template>
		</Card>
	</div>  
</template>
 
 
<script>
	import { mapGetters } from 'vuex';
	import { required, minLength, minValue, helpers } from "@vuelidate/validators";
	import { useVuelidate } from "@vuelidate/core";
	import Calendar from 'primevue/calendar';
	import SurveyQuestions from './SurveyQuestions.vue';
	import Hashes from './Hashes.vue';
	import SurveyAdvanced from './SurveyAdvanced.vue';

	export default {
 		setup: () => ({ v$: useVuelidate() }),
		data() {
			return {
				name: '',
				description: '',
				startDate: '',
				finishDate: '',
				active: true,
				public: false,
				currentDate: this.theDayHour(new Date, 0),
				submitted: false,
				showMessage: false,
				response: null,
				errors: null,
				advancedData: null
			}
		},
		validations() {
			return {
				name: { required, minLength: minLength(3) },
				description: { required, minLength: minLength(3) },
				startDate: { 
					minValue: helpers.withMessage(
						({$params}) => `Minimum date should be ${this.dateFormatted( $params.min )}`,
						minValue(this.currentDate)
					),
					required
				},
				finishDate: { 
					minValue: helpers.withMessage(
						({$params}) => `Minimum date should be ${this.dateFormatted( $params.min )}`,
						minValue(this.startDate)
					),
					required
				},
			}
		},
		methods: {
			getData() {

			},
			dateFormatted(date) {
				if ( date ) {
					let currentDate = date
					return currentDate.toLocaleDateString('sk-SK', {
						day: '2-digit',month: '2-digit',year: 'numeric'})
				} else return date
			},
			theDayHour(date, hour, minutes = 0, seconds = 0) {
				let newDate  = date
				newDate ? newDate.setHours(hour, minutes, seconds,0) : newDate
				return newDate
			},
			handleSubmit(isFormValid) {
				this.submitted = true;

				if (!isFormValid || ( !this.newSurvey.questions || !this.newSurvey.questions.length ) 
					|| ( this.advancedData.type === 2 && this.advancedData.competition === null ) ) {
					this.errors = ' '
					return;
				} else {
					this.errors = null
				}
				
				let data = {
					name: this.name,
					description: this.description,
					start_date: this.startDate,
					finish_date: this.finishDate,
					active: this.active,
					public: this.public,
					advanced: this.advancedData
				}				

				this.addSurvey( this.addSurveyUrl, data );

			},
			toggleDialog() {
				this.showMessage = !this.showMessage;
			},
			redirect() {
				if ( !this.response.error ) {
					this.$store.dispatch("surveys/getSurveys");
					this.$store.dispatch("surveys/resetNewSurvey");
					this.$router.push({ name: 'surveys' });
				}
			},
			async addSurvey( url, data ) {

				let dataObj = {
					survey_data: data,
					...this.newSurvey
				}

				// check errors resp. unfilled inputs in questions
				let errors = dataObj.questions.map( q =>  {
					if ( q.type === 1 ) {
						//check if is namuber with value higher than 0
						let result = this.checkNumber(q.open_value) ? null : (Number(q.index) + 1)
						return result
					}

					if ( q.type === 2 ) {
						//check if is array with precisely two not empty string items
						let result = Array.isArray(q.options) && q.options.length === 2 && 
									 typeof q.options[0] === 'string' && 
									 q.options[0].length > 0 && 
									 typeof q.options[1] === 'string' && 
									 q.options[1].length > 0 ? 
									 	null : (Number(q.index) + 1);
						return result
					}

					if ( q.type === 3 || q.type === 4 ) {
						// check if is namuber with value higher than 0
						let resultNum = this.checkNumber(q.max_choosed)
						// check if array has objects with not empty string value
						let resultArr = this.checkArrayObjectsValues(q.multi_values, 'value', q.index)

						if ( q.type === 4 ) {
							let resultOpen = this.checkNumber(q.open_value)
							return resultNum && resultArr && resultOpen ? null : (Number(q.index) + 1)
						}

						return resultNum && resultArr ? null : (Number(q.index) + 1)
					}

					if ( q.type === 5 ) {
						let result = this.checkNumber(q.levels) ? null : Number(q.index) + 1
						return result
					}

					if (q.type === 6) {
						let result = this.checkNumber(q.max_choosed) ? null : Number(q.index) + 1
						return result
					}

					if (q.type === 7 || q.type === 8) {
						let result = 'info' in q && q.info.length > 0 ? null : Number(q.index) + 1 
						return result
					}

				})

				if ( errors.some( e => e !== null ) ) {
					this.errors = errors.filter(value => value !== null).sort().toString()
					return
				} else {
					this.errors = null
				}

				await User.refreshedToken();

				await axios.post( url, dataObj,  {
						headers: {
							Authorization: 'Bearer ' + User.getToken()
						}
					}).then( response => {						
						this.response = response.data								
						this.toggleDialog();						
					}).catch( error => {
						Toast.fire({
							icon: 'error',
							timer: 5000,
							title: "Unable to add survey"
						})
					}) 
			},
			checkNumber(data) {
				return Number.isInteger(data) && data > 0
			},
			checkArrayObjectsValues(arr, valueKey, index) {
				if (!Array.isArray(arr) || arr.length === 0) {
					return false ;
				}
				for (let i = 0; i < arr.length; i++) {
					if (!arr[i].hasOwnProperty(valueKey) || arr[i].value.trim().length === 0) {
						return false;
					}
				}
				return true;
			}
		},
		computed: {
			...mapGetters({ addSurveyUrl: 'links/addSurvey',
							newSurvey: 'surveys/newSurvey' }),
		},
		unmounted() {
			this.$store.dispatch("surveys/resetNewSurvey");
		},
		components: { Calendar, SurveyQuestions, Hashes, SurveyAdvanced }
	}
</script>
 
 
<style lang='scss' scoped>
.card {
	max-width: 1400px;
}
.inputgroup {
	position: relative;
	display: flex;
	& span.error-msg {
		position: absolute;
		bottom: -60%;
	}
	& > .p-button {
		border-radius: 0 4px 4px 0;
	} 
	:deep(.p-dropdown) {
		width: 100%;
	}
}
:deep(.p-calendar) {
	flex: 1;
	max-width: 576px;
}
.calendar {	
	:deep(.p-button) {
		color: #6c757d;
		background: #e9ecef;
	}
}
.p-togglebutton {
	color: var(--gray-50);
	max-width: 10rem;
}
.submit-btn {
	max-width: 25rem;
}
.q-errors {
	color: var(--red-600);
}
</style>
