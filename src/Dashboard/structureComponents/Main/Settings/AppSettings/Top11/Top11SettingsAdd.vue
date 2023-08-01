<template>
	<div class="add-top-11">
		<CustomDialog :visible="showMessage" :response="response" @hideDialog="hideDialog"/>	

		<div class="d-flex justify-content-between align-items-center mb-4">
			<h5>{{ $t('message.Add') + ' ' + 'TOP 11' }}</h5>
		</div>

		<form @submit.prevent="handleSubmit(!v$.$invalid)" class="row g-3 gy-4 p-fluid">
			
				<!-- <span class="p-float-label w-100">
					<InputText id="question" v-model="v$.question.$model" :class="{'p-invalid':v$.question.$invalid && submitted, 'w-100':true}"
							name="question" :placeholder="$t('message.Question')"/>
					<label for="question">{{$t('message.Question')}}</label>
				</span>
				<InputError :validator="v$.question" :submitted="submitted" replace="Question"></InputError> -->


				<div class="inputgroup col-12 col-lg-6 col-xl-4">
					<span class="p-float-label w-100">
						<Dropdown name="gender" v-model="gender" :options="top11Data.genders" :class="{'p-invalid':v$.gender.$invalid && submitted}"
								  optionLabel="gender" optionValue="id" :placeholder="$t('message.Select') + ' ' + $t('message.Gender')"/>
						<label for="gender">{{ $t('message.Gender') }}</label>
					</span>
					
					<InputError :validator="v$.gender" :submitted="submitted" :replace="$t('message.Gender')"></InputError>
				</div>

				<div class="inputgroup col-12 col-lg-6 col-xl-4">
					<span class="p-float-label w-100">
						<Dropdown name="season" v-model="season" :options="top11Data.seasons" :class="{'p-invalid':v$.season.$invalid && submitted}"
								  optionLabel="season" optionValue="id" :placeholder="$t('message.Select') + ' ' + $t('message.Season')"/>
						<label for="season">{{ $t('message.Season') }}</label>
					</span>
					
					<InputError :validator="v$.season" :submitted="submitted" :replace="$t('message.Season')"></InputError>
				</div>

				<span class="mt-3">{{$t('message.Goalkeeper') + ':'}}</span>

				<div class="inputgroup col-12 col-lg-6 col-xl-4">
					<span class="p-float-label w-100">
						<InputText id="goalkeeper" v-model="v$.goalkeeper.$model" :class="{'p-invalid':v$.goalkeeper.$invalid && submitted, 'w-100':true}" 
							name="goalkeeper" :placeholder="$t('message.Goalkeeper')"/>
						<label for="goalkeeper">{{$t('message.Goalkeeper')}}</label>
					</span>
					<InputError :validator="v$.goalkeeper" :submitted="submitted" :replace="$t('message.Goalkeeper')"></InputError>
				</div>

				<!-- Defenders inputs -->

				<span class="mt-3">{{$t('message.Defenders') + ':'}}</span>

				<div class="inputgroup col-12 col-lg-6 col-xl-4">
					<span class="p-float-label w-100">
						<InputText id="defender1" v-model="v$.defender1.$model" :class="{'p-invalid':v$.defender1.$invalid && submitted, 'w-100':true}" 
							name="defender1" :placeholder="$t('message.Defender')"/>
						<label for="defender1">{{$t('message.Defender')}}</label>
					</span>
					<InputError :validator="v$.defender1" :submitted="submitted" :replace="$t('message.Defender')"></InputError>
				</div>

				<div class="inputgroup col-12 col-lg-6 col-xl-4">
					<span class="p-float-label w-100">
						<InputText id="defender2" v-model="v$.defender2.$model" :class="{'p-invalid':v$.defender2.$invalid && submitted, 'w-100':true}" 
							name="defender2" :placeholder="$t('message.Defender')"/>
						<label for="defender2">{{$t('message.Defender')}}</label>
					</span>
					<InputError :validator="v$.defender2" :submitted="submitted" :replace="$t('message.Defender')"></InputError>
				</div>
				
				<div class="inputgroup col-12 col-lg-6 col-xl-4">
					<span class="p-float-label w-100">
						<InputText id="defender3" v-model="v$.defender3.$model" :class="{'p-invalid':v$.defender3.$invalid && submitted, 'w-100':true}" 
							name="defender3" :placeholder="$t('message.Defender')"/>
						<label for="defender3">{{$t('message.Defender')}}</label>
					</span>
					<InputError :validator="v$.defender3" :submitted="submitted" :replace="$t('message.Defender')"></InputError>
				</div>
				
				<div class="inputgroup col-12 col-lg-6 col-xl-4">
					<span class="p-float-label w-100">
						<InputText id="defender4" v-model="v$.defender4.$model" :class="{'p-invalid':v$.defender4.$invalid && submitted, 'w-100':true}" 
							name="defender4" :placeholder="$t('message.Defender')"/>
						<label for="defender4">{{$t('message.Defender')}}</label>
					</span>
					<InputError :validator="v$.defender4" :submitted="submitted" :replace="$t('message.Defender')"></InputError>
				</div>

				<!-- Midfielders inputs -->

				<span class="mt-3">{{$t('message.Midfielders') + ':'}}</span>

				<div class="inputgroup col-12 col-lg-6 col-xl-4">
					<span class="p-float-label w-100">
						<InputText id="midfielder1" v-model="v$.midfielder1.$model" :class="{'p-invalid':v$.midfielder1.$invalid && submitted, 'w-100':true}" 
							name="midfielder1" :placeholder="$t('message.Midfielder')"/>
						<label for="midfielder1">{{$t('message.Midfielder')}}</label>
					</span>
					<InputError :validator="v$.midfielder1" :submitted="submitted" :replace="$t('message.Midfielder')"></InputError>
				</div>

				<div class="inputgroup col-12 col-lg-6 col-xl-4">
					<span class="p-float-label w-100">
						<InputText id="midfielder2" v-model="v$.midfielder2.$model" :class="{'p-invalid':v$.midfielder2.$invalid && submitted, 'w-100':true}" 
							name="midfielder2" :placeholder="$t('message.Midfielder')"/>
						<label for="midfielder2">{{$t('message.Midfielder')}}</label>
					</span>
					<InputError :validator="v$.midfielder2" :submitted="submitted" :replace="$t('message.Midfielder')"></InputError>
				</div>
				
				<div class="inputgroup col-12 col-lg-6 col-xl-4">
					<span class="p-float-label w-100">
						<InputText id="midfielder3" v-model="v$.midfielder3.$model" :class="{'p-invalid':v$.midfielder3.$invalid && submitted, 'w-100':true}" 
							name="midfielder3" :placeholder="$t('message.Midfielder')"/>
						<label for="midfielder3">{{$t('message.Midfielder')}}</label>
					</span>
					<InputError :validator="v$.midfielder3" :submitted="submitted" :replace="$t('message.Midfielder')"></InputError>
				</div>
				
				<div class="inputgroup col-12 col-lg-6 col-xl-4">
					<span class="p-float-label w-100">
						<InputText id="midfielder4" v-model="v$.midfielder4.$model" :class="{'p-invalid':v$.midfielder4.$invalid && submitted, 'w-100':true}" 
							name="midfielder4" :placeholder="$t('message.Midfielder')"/>
						<label for="midfielder4">{{$t('message.Midfielder')}}</label>
					</span>
					<InputError :validator="v$.midfielder4" :submitted="submitted" :replace="$t('message.Midfielder')"></InputError>
				</div>

				<!-- Strikers inputs -->

				<span class="mt-3">{{$t('message.Strikers') + ':'}}</span>

				<div class="inputgroup col-12 col-lg-6 col-xl-4">
					<span class="p-float-label w-100">
						<InputText id="striker1" v-model="v$.striker1.$model" :class="{'p-invalid':v$.striker1.$invalid && submitted, 'w-100':true}" 
							name="striker1" :placeholder="$t('message.Striker')"/>
						<label for="striker1">{{$t('message.Striker')}}</label>
					</span>
					<InputError :validator="v$.striker1" :submitted="submitted" :replace="$t('message.Striker')"></InputError>
				</div>

				<div class="inputgroup col-12 col-lg-6 col-xl-4">
					<span class="p-float-label w-100">
						<InputText id="striker2" v-model="v$.striker2.$model" :class="{'p-invalid':v$.striker2.$invalid && submitted, 'w-100':true}" 
							name="striker2" :placeholder="$t('message.Striker')"/>
						<label for="striker2">{{$t('message.Striker')}}</label>
					</span>
					<InputError :validator="v$.striker2" :submitted="submitted" :replace="$t('message.Striker')"></InputError>
				</div>
				
				<div class="inputgroup col-12 col-lg-6 col-xl-4">
					<span class="p-float-label w-100">
						<InputText id="striker3" v-model="v$.striker3.$model" :class="{'p-invalid':v$.striker3.$invalid && submitted, 'w-100':true}" 
							name="striker3" :placeholder="$t('message.Striker')"/>
						<label for="striker3">{{$t('message.Striker')}}</label>
					</span>
					<InputError :validator="v$.striker3" :submitted="submitted" :replace="$t('message.Striker')"></InputError>
				</div>
				
				<div class="inputgroup col-12 col-lg-6 col-xl-4">
					<span class="p-float-label w-100">
						<InputText id="striker4" v-model="v$.striker4.$model" :class="{'p-invalid':v$.striker4.$invalid && submitted, 'w-100':true}" 
							name="striker4" :placeholder="$t('message.Striker')"/>
						<label for="striker4">{{$t('message.Striker')}}</label>
					</span>
					<InputError :validator="v$.striker4" :submitted="submitted" :replace="$t('message.Striker')"></InputError>
				</div>

				<!-- Image upload -->
				<span class="mt-3">{{$t('message.UploadImage') + ':'}}</span>

				<div class="col-12 col-md-6">
					<FileUploadCard @files="uploadedFiles($event)"/>
					<small v-if="!files && submitted" class="error-msg">{{ $t('message.Addp') + ' ' + $t('message.Image') }}</small>
				</div>

			<div class="position-relative text-center mt-3">
				<Button type="submit" :label="$t('message.Submit')" 
						class="btn-black shadow-lg w-auto" :loading="loading"/>
			</div>
		</form>
	</div>
</template>
 
 
<script>
	import { useVuelidate } from "@vuelidate/core";
	import { required } from '../../../../../../plugins/vuelidate-i18n'
	import { minLength } from "@vuelidate/validators";
	import CustomDialog from '../../../../../global/CustomDialog.vue'
	import FileUploadCard from '../../../Users/FileUploadCard.vue';

	export default {
		setup: () => ({ v$: useVuelidate() }),
		props: {
			top11Data: Object,
		},
		data() {
			return {	
				gender: '',
				season: '',
				goalkeeper: '',
				defender1: '',
				defender2: '',
				defender3: '',
				defender4: '',
				midfielder1: '',
				midfielder2: '',
				midfielder3: '',
				midfielder4: '',
				striker1: '',
				striker2: '',
				striker3: '',
				striker4: '',
				files: null,
				submitted: false,
				showMessage: false,
				response: null,
				loading: false,
			}
		},
		validations() {
			return {
				gender: { required },
				season: { required },
				goalkeeper: { required, minLength: minLength(2) },
				defender1: { required, minLength: minLength(2) },
				defender2: { required, minLength: minLength(2) },
				defender3: { required, minLength: minLength(2) },
				defender4: { minLength: minLength(2) },
				midfielder1: { required, minLength: minLength(2) },
				midfielder2: { required, minLength: minLength(2) },
				midfielder3: { required, minLength: minLength(2) },
				midfielder4: { minLength: minLength(2) },
				striker1: { required, minLength: minLength(2) },
				striker2: { required, minLength: minLength(2) },
				striker3: { required, minLength: minLength(2) },
				striker4: { minLength: minLength(2) },
			}
		},
		methods: {	
			hideDialog() {
				this.showMessage = false
			},
			async handleSubmit(isFormValid) {
				this.submitted = true;

				if (!isFormValid) {
					return;
				}
				
				const data = new FormData()
				
				this.files && this.files.map( file =>  {
					data.append('files[]', file)
				})

				let defendersArr = this.filterMapArr( [ this.defender1, this.defender2, this.defender3, this.defender4 ] )
					
				let midfieldersArr = this.filterMapArr( [ this.midfielder1, this.midfielder2, this.midfielder3, this.midfielder4 ] )
					
				let strikersArr = this.filterMapArr( [ this.striker1, this.striker2, this.striker3, this.striker4 ] )

				data.append('gender', this.gender)
				data.append('season', this.season)
				data.append('goalkeeper', this.goalkeeper)
				data.append('defenders[]', defendersArr)
				data.append('midfielders[]', midfieldersArr)
				data.append('strikers[]', strikersArr)		

				await axios.post( DOMAIN_URL + '/api/surveys-top11', data, {
						headers: {
								Authorization: 'Bearer ' + User.getToken(),							
								'Content-Type': 'multipart/form-data'							
						}
					}).then( response => {
						this.response = response.data
						this.toggleDialog()
						this.loading = false
						this.submitted = false
						this.$store.dispatch("surveys/getSurveysTop11");
					}).catch( error => {
						Toast.fire({
							icon: 'error',
							timer: 4000,
							title: "Unable to add TOP 11"
						})
						this.loading = false
						this.submitted = false
					})

			},
			toggleDialog() {
				this.showMessage = !this.showMessage;
			},
			uploadedFiles(e) {
				this.files = e
				this.filesData = this.files.map( file => {
					return { file }
				})
			},
			filterMapArr( array ) {
				return array && array
								.filter( item => item !== '' )
			}
		},
		components: { CustomDialog, FileUploadCard }
	}
</script>
 
 
<style lang='scss' scoped>
.add-top-11 {
	.error-msg {
		color: var(--red-600);
	}
}
</style>