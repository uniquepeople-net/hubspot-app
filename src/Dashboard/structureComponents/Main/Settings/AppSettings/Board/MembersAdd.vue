<template>
	<div>
		<CustomDialog :visible="showMessage" :response="response" @hideDialog="hideDialog"/>

		<div class="d-flex justify-content-between align-items-center mb-4">
			<h5>{{ $t('message.AddMembers') }}</h5>
		</div>
		
		<form @submit.prevent="handleSubmit(!v$.$invalid)" class="row g-3 gy-4 p-fluid">
			<div class="inputgroup col-12 col-lg-6 col-xl-4" >
				<span class="p-float-label w-100">
					<InputText id="name" v-model="v$.name.$model" :class="{'p-invalid':v$.name.$invalid && submitted, 'w-100':true}"
							name="name" :placeholder="$t('message.Name')"/>
					<label for="name">{{$t('message.Name')}}</label>
				</span>
				<InputError :validator="v$.name" :submitted="submitted" replace="Name"></InputError>
			</div>

			<div class="inputgroup col-12 col-lg-6 col-xl-4">
				<span class="p-float-label w-100">
					<InputText id="position" v-model="v$.position.$model" :class="{'p-invalid':v$.position.$invalid && submitted, 'w-100':true}" 
						name="position" :placeholder="$t('message.Position')"/>
					<label for="position">{{$t('message.Position')}}</label>
				</span>
				<InputError :validator="v$.position" :submitted="submitted" replace="Position"></InputError>
			</div>

			<div class="inputgroup col-12 col-lg-6 col-xl-4">
				<span class="p-float-label w-100">
					<InputText id="phone_num" v-model="v$.phone_num.$model" :class="{'p-invalid':v$.phone_num.$invalid && submitted, 'w-100':true}" 
						name="phone_num" :placeholder="$t('message.Phonenumber')"/>
					<label for="phone_num">{{$t('message.Phonenumber')}}</label>
				</span>
				<InputError :validator="v$.phone_num" :submitted="submitted" replace="Phone number"></InputError>
			</div>

			<div class="inputgroup col-12 col-lg-6 col-xl-4">
				<span class="p-float-label w-100">
					<InputText id="email" v-model="v$.email.$model" :class="{'p-invalid':v$.email.$invalid && submitted, 'w-100':true}" 
						name="email" placeholder="Email"/>
					<label for="email">Email</label>
				</span>
				<InputError :validator="v$.email" :submitted="submitted" replace="Email"></InputError>
			</div>

			<div class="inputgroup col-12 col-lg-6 col-xl-4">
				<span class="p-float-label w-100">
					<InputText id="description" v-model="v$.description.$model" :class="{'p-invalid':v$.description.$invalid && submitted, 'w-100':true}" 
						name="description" :placeholder="$t('message.Description')"/>
					<label for="description">{{$t('message.Description')}}</label>
				</span>
				<InputError :validator="v$.description" :submitted="submitted" :replace="$t('message.Description')"></InputError>
			</div>


			<div v-if="groups" class="inputgroup col-12 col-lg-6 col-xl-4" >
				<MultiSelect v-model="selectedGroups" :options="groups" optionLabel="name" :placeholder="$t('message.Select') + ' ' + $t('message.GroupS')"
            				:maxSelectedLabels="3" class="w-full md:w-20rem" />
			</div>
			<div class="inputgroup col-12">
				<FileUploadCard @files="uploadedFiles($event)" :fileLimit="1"/>
			</div>

			<div class="position-relative text-center mt-3">
				<Button type="submit" :label="$t('message.Submit')" 
						class="btn-black shadow-lg w-auto" :loading="loading"/>
			</div>
		</form>
	</div>
</template>
 
 
<script>
	import { mapGetters } from 'vuex'
	import { required, email, numeric } from "../../../../../../plugins/vuelidate-i18n";
	import { minLength } from "@vuelidate/validators";
	import { useVuelidate } from "@vuelidate/core";
	import CustomDialog from '../../../../../global/CustomDialog.vue'
	import MultiSelect from 'primevue/multiselect';
	import FileUploadCard from '../../../Users/FileUploadCard.vue'

	export default {
		setup: () => ({ v$: useVuelidate() }),
		data() {
			return {
				name: '',
				position: '',
				phone_num: '',
				email: '',
				description: '',
				files: null,
				selectedGroups: null,
				loading: false,
				submitted: false,
				showMessage: false,
				response: null
			}
		},
		validations() {
			return {
				name: { required, minLength: minLength( 2 ) },
				position: { required, minLength: minLength( 2 ) },
				phone_num: { minLength: minLength( 2 ) },
				description: { minLength: minLength( 2 ) },
				email: { email },
			}
		},
		methods: {
			hideDialog() {
				this.showMessage = false
			},
			handleSubmit(isFormValid) {
				this.submitted = true;

				if (!isFormValid) {
					return;
				}

				this.loading = true

				let data = {
					name: this.name,
					position: this.position,
					phone_num: this.phone_num,
					email: this.email,
					description: this.description
				}

				this.addBoardMember( data )	
			},
			uploadedFiles(e) {
				this.files = e;
			},
			addBoardMember(  )
		},
		computed: {
			...mapGetters({ groups: 'boardSet/boardGroups' })
		},
		components: { CustomDialog, FileUploadCard, MultiSelect }
	}
</script>
 
 
<style lang='scss' scoped>
</style>