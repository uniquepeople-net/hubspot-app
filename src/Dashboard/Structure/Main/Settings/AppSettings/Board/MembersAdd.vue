<template>
	<div>
		<CustomDialog :visible="showMessage" :response="response" @hideDialog="hideDialog"/>

		<div class="d-flex justify-content-between align-items-center mb-4">
			<h5>{{ $t('message.AddMembers') }}</h5>
		</div>
		
		<form @submit.prevent="handleSubmit(!v$.$invalid)" class="row g-3 gy-5 p-fluid">
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

			<div class="inputgroup col-12 col-lg-3 col-xl-2">
				<span class="p-float-label w-100">
					<InputText id="order" v-model="v$.order.$model" :class="{'p-invalid':v$.order.$invalid && submitted, 'w-100':true}" 
						name="order" :placeholder="$t('message.Order')"/>
					<label for="order">{{$t('message.Order')}}</label>
				</span>
				<InputError :validator="v$.order" :submitted="submitted" replace="Order"></InputError>
			</div>

			<div class="inputgroup col-12 col-lg-3 col-xl-2">
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
				<span class="p-float-label w-100">
					<MultiSelect id="selectedGroups" v-model="v$.selectedGroups.$model" :options="groups" optionLabel="name" :placeholder="$t('message.Select') + ' ' + $t('message.GroupS')"
            				:maxSelectedLabels="3" :class="{'p-invalid':v$.selectedGroups.$invalid && submitted, 'w-full':true}"/>
					<label for="selectedGroups">{{ $t('message.Select') + ' ' + $t('message.GroupS') }}</label>
				</span>
				<InputError :validator="v$.selectedGroups" :submitted="submitted" :replace="$t('message.Description')"></InputError>
			</div>
			<div class="inputgroup col-12 position-relative">
				<FileUploadCard @files="uploadedFiles($event)" :fileLimit="1"/>
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
				order: '',
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
				order: { required, numeric },
				description: { minLength: minLength( 2 ) },
				email: { email },
				selectedGroups: { required }
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

				this.loading = true

				const data = new FormData()
				
				this.files && this.files.map( file =>  {
					data.append('files[]', file)
				})

				data.append('name', this.name)
				data.append('position', this.position)
				data.append('phone_num', this.phone_num)
				data.append('order', this.order)
				data.append('description', this.description)
				data.append('email', this.email)

				Helpers.appendArrToFormData(this.selectedGroups, data, 'groups')

				await User.refreshedToken();

				await axios.post( this.boardMembersUrl, data, {
					headers: {
							Authorization: 'Bearer ' + User.getToken(),							
							'Content-Type': 'multipart/form-data'							
					}
				}).then( response => {
					this.$store.dispatch('boardSet/getBoardMembers')
					this.response = response.data
					this.toggleDialog()
					this.loading = false
				}).catch( error => {
						this.loading = false
						Toast.fire({
							icon: 'error',
							title: 'Unable to save new member'
						})
					})
			},
			uploadedFiles(e) {
				this.files = e;
			},
			toggleDialog() {
				this.showMessage = !this.showMessage
			}
		},
		computed: {
			...mapGetters({ groups: 'boardSet/boardGroups',
							boardMembersUrl: 'links/boardMembers' })
		},
		components: { CustomDialog, FileUploadCard, MultiSelect }
	}
</script>
 
 
<style lang='scss' scoped>
.error-msg {
	position: absolute;
	top: 100%;
	font: {
		size: .8rem;
		weight: 400;
	}
	color: var(--red-600);
}
.invalid-border {
	border: 1px solid var(--red-600);
}
</style>