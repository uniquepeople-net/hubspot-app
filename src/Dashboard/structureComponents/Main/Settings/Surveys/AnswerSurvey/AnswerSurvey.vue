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
			<div class="card-header">{{ survey.name }}</div>
			<div class="text-center p-5" v-if="!started">
				<Button  label="Start Survey" class="ms-auto mt-2 submit-btn" @click="startSurvey()"/>
			</div>
		</template>	

		<template #content v-if="started">
			<Steps :model="items" :readonly="true" aria-label="Form Steps"/>

			
			<div class="my-5">
				<router-view v-slot="{Component}"  @prevPage="prevPage($event)" @nextPage="nextPage($event)" @complete="complete">
					<KeepAlive>
						<component :is="Component" :survey="survey" :key="$route.fullPath"/>
					</KeepAlive>
				</router-view>	
			</div>

			<div class="d-flex justify-content-between mt-5">
				<Button label="Previous" class="p-button-raised p-button-secondary p-button-text me-auto mt-2 submit-btn" 
						@click="prevPage($event)" v-show="checkPrev()"/>
				<Button label="Next" class="p-button-raised p-button-secondary p-button-text ms-auto mt-2 submit-btn " 
						@click="nextPage($event)" v-show="checkNext()"/>
				<Button label="Send survey" class="p-button-raised p-button-success ms-auto mt-2 submit-btn" 
						@click="sendSurvey(saveSurveyLink, fulfilledSurvey)" v-show="checkFinish()"/>
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
		},
		data() {
			return {
				step: Number(this.$route.params.step),
				started: false,
				response: null,
				showMessage: false
			}
		},
		methods: {
			startSurvey() {
				this.started = !this.started
				this.$router.push(this.items[0].to)
			},
			nextPage(event) {
				this.$router.push(this.items[this.step].to);
			},
			prevPage(event) {
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

				await User.refreshedToken();

				await axios.post( url + this.survey.id, data,  {
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
							title: "Unable to save survey"
						})
					}) 

				//this.$store.dispatch("surveys/sendSurvey", survey.id)				
			},
			complete() {
				this.$toast.add({severity:'success', summary:'Order submitted', detail: 'Dear, ' + this.formObject.firstname + ' ' + this.formObject.lastname + ' your order completed.'});
			},
			toggleDialog() {
				this.showMessage = !this.showMessage;
			},
		},
		computed: {
			...mapGetters({ saveSurveyLink: 'links/saveSurvey',
							fulfilledSurvey: 'surveys/fulfilledSurvey' }),
			items() {
				let items = []
				this.survey.questions.map( (q , index) =>  {
					items.push({ to: '/survey/' + this.survey.slug + '/step/' + (Number(index) + 1) }) 
				})
				return items
			}
		},
		watch: {
			'$route.params.step': {
				handler: function(data) {
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
</style>