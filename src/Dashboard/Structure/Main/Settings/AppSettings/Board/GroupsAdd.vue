<template>
	<div>
		<CustomDialog :visible="showMessage" :response="response" @hideDialog="hideDialog"/>

		<div class="d-flex justify-content-between align-items-center mb-4">
			<h5>{{ $t('message.AddGroup') }}</h5>
		</div>
		<div class="row">
			<form @submit.prevent="handleSubmit(!v$.$invalid)" class="p-fluid">
				<div class="inputgroup col-12 add-group-name">
					<span class="p-float-label w-100">
						<InputText id="name" v-model="v$.name.$model" :class="{'p-invalid':v$.name.$invalid && submitted, 'w-100':true}"
								name="name" placeholder="Name"/>
						<label for="name">{{$t('message.Name')}}</label>
					</span>
					<InputError :validator="v$.name" :submitted="submitted" replace="Name"></InputError>
				</div>

				<div class="inputgroup col-12">
					<span class="p-float-label w-100">
						<InputNumber id="order" v-model="v$.order.$model" :class="{'p-invalid':v$.order.$invalid && submitted, 'w-100':true}" 
							name="order" placeholder="Order"/>
						<label for="order">{{$t('message.Order')}}</label>
					</span>
					<InputError :validator="v$.order" :submitted="submitted" replace="Order"></InputError>
				</div>
				
				<div class="position-relative text-center mt-3">
					<Button type="submit" :label="$t('message.Submit')" 
							class="btn-black shadow-lg w-auto" :loading="loading"/>
				</div>
			</form>
		</div>
	</div>
</template>
 
 
<script>
	import { mapGetters } from 'vuex'
	import { required, numeric } from "../../../../../../plugins/vuelidate-i18n";
	import { useVuelidate } from "@vuelidate/core";
	import InputNumber from 'primevue/inputnumber';
	import CustomDialog from '../../../../../global/CustomDialog.vue'

	export default {
		setup: () => ({ v$: useVuelidate() }),
		data() {
			return {
				name: '',
				order: null,
				loading: false,
				submitted: false,
				showMessage: false,
				response: null
			}
		},
		validations() {
			return {
				name: { required },
				order: { required, numeric },
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
					order: this.order
				}

				this.submitGroup(data);
			},
			resetForm() {
				this.name = ''
				this.order = null
			},
			submitGroup(data) {
				axios.post( this.boardGroupsUrl, data, {
					headers: {
						Authorization: 'Bearer ' + User.getToken()
					}
				}).then( response => {
					this.response = response.data
					this.toggleDialog()
					this.resetForm()
					this.loading = false
					this.submitted = false
					this.showMessage = true
					this.$store.dispatch('boardSet/getBoardGroups')
				}).catch( error => {
					Toast.fire({
						icon: 'error',
						timer: 4000,
						title: "Unable to add board group"
					})
					this.loading = false
				})
			},
			toggleDialog() {
				this.showMessage = !this.showMessage
			}
		},
		computed: {
			...mapGetters({ boardGroupsUrl: 'links/boardGroups' })
		},
		components: { InputNumber, CustomDialog }
	}
</script>
 
 
<style lang='scss' scoped>
.add-group-name {
	margin-bottom: 1.8rem;
}
</style>