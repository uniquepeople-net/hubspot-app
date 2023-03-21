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
									<InputIcon icon="bi bi-pencil"></InputIcon>
									<InputText id="name" v-model="v$.name.$model" :class="{'p-invalid':v$.name.$invalid && submitted}" 
											name="name" placeholder="Name"/>
								
									<InputError :validator="v$.name" :submitted="submitted" replace="Name"></InputError>
								</div>

								<div class="inputgroup mb-5 col-12 col-lg-6">
									<InputIcon icon="bi bi-pen"></InputIcon>
									<InputText id="description" v-model="v$.description.$model" :class="{'p-invalid':v$.description.$invalid && submitted}" 
											name="description" placeholder="Description"/>
								
									<InputError :validator="v$.description" :submitted="submitted" replace="Description"></InputError>
								</div>

								<div class="inputgroup mb-5 col-12 align-items-center col-lg-6">
									<label for="start">Start date:&nbsp;</label>
									<Calendar inputId="start" v-model="v$.startDate.$model" :showIcon="true" dateFormat="dd.mm.yy" class="calendar" :class="{'p-invalid':v$.startDate.$invalid && submitted}"/>
									<InputError :validator="v$.startDate" :submitted="submitted" replace="Start date"></InputError>
								</div>

								<div class="inputgroup mb-5 col-12 align-items-center col-lg-6">
									<label for="finish">Finish date:&nbsp;</label>
									<Calendar inputId="finish" v-model="v$.finishDate.$model" :showIcon="true" dateFormat="dd.mm.yy" class="calendar" :class="{'p-invalid':v$.finishDate.$invalid && submitted}"/>
									<InputError :validator="v$.finishDate" :submitted="submitted" replace="Finish date"></InputError>
								</div>

								<div class="inputgroup mb-5 col-12 col-lg-6 justify-content-center">
									<InputIcon icon="bi bi-activity"></InputIcon>
									<ToggleButton v-model="active" onLabel="Active" offLabel="Inactive" onIcon="pi pi-check" offIcon="pi pi-times" :class="`${active ? 'bg-success' : 'bg-danger'} p-togglebtn-active`"/>
								</div>

								<div class="inputgroup mb-5 col-12 col-lg-6 justify-content-center">
									<InputIcon icon="bi bi-key"></InputIcon>
									<ToggleButton v-model="public" onLabel="Public" offLabel="Private" onIcon="bi bi-unlock" offIcon="bi bi-lock" :class="`${public ? 'bg-warning' : 'bg-info'} p-togglebtn-active`"/>
								</div>
			
							</div>

							<Divider />

							<div>
								<SurveyQuestions :submitted="submitted"/>
								<p v-if="!newSurvey.questions || !newSurvey.questions.length" class="text-danger text-center">No questions added</p>
							</div>
	
							<Divider />

								<Hashes :name="name"/>

							<Divider />

							<div class="d-flex justify-content-end">
								<Button type="submit" label="Add Survey" class="mt-2 submit-btn" />
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

				if (!isFormValid || ( !this.newSurvey.questions || !this.newSurvey.questions.length )) {
					return;
				}
				
				let data = {
					name: this.name,
					description: this.description,
					start_date: this.startDate,
					finish_date: this.finishDate,
					active: this.active,
					public: this.public
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
			}
			
		},
		computed: {
			...mapGetters({ addSurveyUrl: 'links/addSurvey',
							newSurvey: 'surveys/newSurvey' }),
		},
		components: { Calendar, SurveyQuestions, Hashes }
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
	:deep(.p-inputtext), :deep(.p-dropdown) {
		border-radius: 0 6px 6px 0;
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
	:deep(.p-inputtext) {
		border-radius: 6px 0 0 6px;
	}
}
.p-togglebutton {
	color: var(--gray-50);
	max-width: 10rem;
}
.submit-btn {
	max-width: 25rem;
}
</style>
