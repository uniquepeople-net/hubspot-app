<template>
	<Dialog v-model:visible="showMessage" :breakpoints="{ '960px': '80vw' }" :style="{ width: '30vw' }" position="top">
		<div class="flex align-items-center flex-column pt-6 px-3">
			<i v-if="response.message" class="pi pi-check-circle" :style="{fontSize: '4rem', color: 'var(--green-400)' }"></i>
			<i v-if="response.error" class="pi pi-times-circle" :style="{fontSize: '4rem', color: 'var(--red-400)' }"></i>
			<h5 v-if="response.message" class="mt-3">{{ response.message }}</h5>
			<h6 v-if="response.error" v-for="(error, key) in response.error" class="mt-3">{{ key + ': ' + error[0] }}</h6>
		</div>
		<template #footer>
			<div class="flex justify-content-center">
				<Button label="OK" @click="toggleDialog" class="p-button-text" />
			</div>
		</template>
	</Dialog>


	<Card class="card mx-3 mx-auto">
		<template #title>
			<div class="card-header border-bottom-0">{{ survey.name }}</div>
			<div class="text-center p-5" v-if="!started">
				<Button  :label="$t('message.StartSurvey')" class="ms-auto mt-2 submit-btn btn-black" @click="startSurvey()"/>
			</div>
			<h6 class="fw-normal mt-3 desc" v-if="!started"> {{ survey.description }} </h6>

		</template>	

		<template #content v-if="started">
			<Steps :model="items" :readonly="false" aria-label="Form Steps" class="steps-survey"/>
			
			<div class="my-5">
				<router-view v-slot="{Component}"  @prevPage="prevPage($event)" @nextPage="nextPage($event)" @complete="complete">
					<KeepAlive>
						<component :is="Component" :survey="survey" :key="$route.fullPath"/>
					</KeepAlive>
				</router-view>	
			</div>

			<Divider />

			<div class="d-flex justify-content-between mt-5">
				<Button :label="$t('message.Previous')" class="p-button-raised p-button-secondary p-button-text me-auto mt-2 submit-btn" 
						@click="prevPage($event, fulfilledSurvey)" v-show="checkPrev()"/>
				
				<Button :label="$t('message.Next')" class="p-button-raised p-button-secondary p-button-text ms-auto mt-2 submit-btn " 
						@click="nextPage($event, fulfilledSurvey)" v-show="checkNext()"/>
			</div>
			<div class="position-relative text-center d-flex flex-column align-items-center w-100 mt-5">
				<Button :label="$t('message.SendSurvey')" class="p-button-raised submit-btn btn-black" :loading="loading"
						@click="sendSurvey(saveSurveyLink, fulfilledSurvey)" v-if="checkFinish()" :disabled="disabledBtn"/>
				<small class="warning mt-3" v-if="unfilledQuestions && showError">{{ $t('message.Questions') }} {{unfilledQuestions}} {{ $t('message.NotCorrectlyFilled').toLowerCase() }}.</small>
			</div>
		</template>
	</Card>
</template>
 
 
<script>
	import Steps from 'primevue/steps';
	import { mapGetters } from 'vuex';

	export default {
		props: {
			survey: Object,
			hash: String,
		},
		data() {
			return {
				step: Number(this.$route.params.step),
				started: false,
				response: null,
				showMessage: false,
				loading: false,
				disabledBtn: false,
				showError: false,
				unfilledQuestions: null
			}
		},
		methods: {
			startSurvey() {
				this.started = !this.started
				this.$router.push(this.items[0].to)
			},
			nextPage(event, data) {
				this.checkCorrectAnswers(data)
				this.$router.push(this.items[this.step].to);
			},
			prevPage(event, data) {
				this.checkCorrectAnswers(data)
				this.$router.push(this.items[this.step - 2].to);
			},
			checkFinish() {
				return this.step === this.items.length ? true : false
			},
			checkPrev() {
				return this.step === 1 ? false : true
			},
			checkNext() {
				return this.step === this.items.length ? false : true
			},
			async sendSurvey( url, data) {

				let obj = {
					data: data,
					hash: this.hash,
					survey: this.survey
				}

				const errors = this.checkCorrectAnswers(obj.data)

				/* 	Check if question has some value filled not if has precisely 
				**	all permitted values filled
				*/ 

				/* const unfilled = obj.data.map( (item, index) => {
					if ( ( 'scale_value' in item && item.scale_value == null ) ||
					 	 ( 'closed_value' in item && item.closed_value == null ) ||
						 ( 'value' in item && item.value.every( item => item === ""))
					 ) {
						return item.step
					} else return null
				}) */


				// Check if question has preciselly number of permitted values filled 
				const unfilled = obj.data.map( (item, index) => {
					let skip = Boolean(item.question.skip)
										
					if ( ( 'scale_value' in item && item.scale_value == null ) ||
					 	 ( 'closed_value' in item && item.closed_value == null && !skip ) ||
						 ( 'value' in item && 
						 	( this.survey.type_id === 1 && ( item.value.length < item.question.min_to_choose || item.value.length > item.question.max_to_choose )) ||
							( this.survey.type_id === 2 && item.value.length !== item.question.max_to_choose )) ||
						( 'checkbox' in item && item.checkbox === false )
					 ) {
						return item.step
					} else return null
				})

				if ( errors ) {
					this.showError = true
					this.unfilledQuestions = unfilled.filter(value => value !== null).sort().toString()
				} else {
					this.loading = true
					this.disabledBtn = true		

					await axios.post( url + this.survey.id, obj,  {
							headers: {
								Authorization: 'Bearer ' + User.getToken()
							}
						}).then( response => {
							this.response = response.data								
							this.toggleDialog();
							this.loading  = false
							if ( 'error' in response.data ) {
								this.loading = false
								this.disabledBtn = false
							} else {
								localStorage.setItem(this.survey.slug + 'done', true)
								this.$router.push({name: 'success'})
							}						
						}).catch( error => {
							this.loading = false
							this.disabledBtn = false							
							Toast.fire({
								icon: 'error',
								timer: 5000,
								title: "Unable to save survey"
							})
						})
				}
			},
			complete() {
				this.$toast.add({severity:'success', summary:'Order submitted', detail: 'Dear, ' + this.formObject.firstname + ' ' + this.formObject.lastname + ' your order completed.'});
			},
			toggleDialog() {
				this.showMessage = !this.showMessage;
			},
			checkCorrectAnswers(data) {
				const unfilled = data.map( (item, index) => {
					let skip = Boolean(item.question.skip)

					if ( ( 'scale_value' in item && item.scale_value == null ) ||
					 	 ( 'closed_value' in item && item.closed_value == null && !skip) ||
						 ( 'value' in item && 
						 	( this.survey.type_id === 1 && ( item.value.length < item.question.min_to_choose || item.value.length > item.question.max_to_choose )) ||
							( this.survey.type_id === 2 && item.value.length !== item.question.max_to_choose )) ||
						( 'checkbox' in item && item.checkbox === false )
					 ) {
						return item.step
					} else return null
				})
				
				if ( unfilled.some( item => item !== null ) ) {
					this.unfilledQuestions = unfilled.filter(value => value !== null).sort().toString()
					return true
				} else {
					this.unfilledQuestions = null
					return false
				}
			}
		},
		computed: {
			...mapGetters({ saveSurveyLink: 'links/saveSurvey',
							fulfilledSurvey: 'surveys/fulfilledSurvey' }),
			items() {
				let items = []
				this.survey.questions.map( (q , index) =>  {
					items.push({ to: '/' + this.$i18n.locale + '/survey/' + this.survey.slug + '/step/' + (Number(index) + 1) }) 
				})
				return items
			}
		},
		watch: {
			'$route.params.step': {
				handler: function(data) {
					if ( !data ) {
						this.started = false
					}
					this.step = Number(data)
				}
			}
		},
		components: { Steps }
	}
</script>
 
 
<style lang='scss' scoped>
.submit-btn {
	width: 10rem;
}
.card {
	max-width: 1200px;
	margin: auto;
	margin-top: 3rem;
}
.spinner-grow {
	top: 0;
	bottom: 0;
	margin: auto;
	margin-left: .5rem;
}
.warning {
	color: var(--red-600);
}
.steps-survey {
	:deep(.p-steps-list) {
		flex-wrap: wrap;
	}
	:deep(.p-steps-item .p-menuitem-link:not(.p-disabled):focus) {
		box-shadow: unset;
	}
}
</style>