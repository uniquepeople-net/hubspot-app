<template>
	<div>
		<CustomDialog :visible="showMessage" :response="response" @hideDialog="hideDialog"/>
		
		<div class="d-flex justify-content-between align-items-center mb-4">
			<h5>{{ $t('message.Add') + ' ' + 'FAQ' }}</h5>
		</div>

		<form @submit.prevent="handleSubmit(!v$.$invalid)" class="row g-3 gy-5 p-fluid">
			<div class="inputgroup col-12 col-lg-6" >
				<span class="p-float-label w-100">
					<InputText id="question" v-model="v$.question.$model" :class="{'p-invalid':v$.question.$invalid && submitted, 'w-100':true}"
							name="question" :placeholder="$t('message.Question')"/>
					<label for="question">{{$t('message.Question')}}</label>
				</span>
				<InputError :validator="v$.question" :submitted="submitted" replace="Question"></InputError>
			</div>

			<div class="inputgroup col-12 col-lg-6">
				<span class="p-float-label w-100">
					<InputText id="answer" v-model="v$.answer.$model" :class="{'p-invalid':v$.answer.$invalid && submitted, 'w-100':true}" 
						name="answer" :placeholder="$t('message.Answer')"/>
					<label for="answer">{{$t('message.Answer')}}</label>
				</span>
				<InputError :validator="v$.answer" :submitted="submitted" replace="answer"></InputError>
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
	import { required } from "../../../../../../plugins/vuelidate-i18n";
	import { minLength } from "@vuelidate/validators";
	import { useVuelidate } from "@vuelidate/core";
	import CustomDialog from '../../../../../global/CustomDialog.vue'

	export default {
		setup: () => ({ v$: useVuelidate() }),
		data() {
			return {
				question: '',
				answer: '',
				submitted: false,
				showMessage: false,
				response: null,
				loading: false
			}
		},
		validations() {
			return {
				question: { required, minLength: minLength( 2 ) },
				answer: { required, minLength: minLength( 2 ) },
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
			
				let data = {
					question: this.question,
					answer: this.answer
				}

				this.submitData(data);
			},
			submitData(data) {
				axios.post( this.faqUrl, data, {
					headers: {
						Authorization: 'Bearer ' + User.getToken()
					}
				}).then( response => {
					this.response = response.data
					this.toggleDialog()
					this.loading = false
					this.submitted = false
					this.showMessage = true
					this.$store.dispatch('faqSet/getFaq')
				}).catch( error => {
					Toast.fire({
						icon: 'error',
						timer: 4000,
						title: "Unable to add FAQ"
					})
					this.submitted = false
					this.loading = false
				})
			},
			toggleDialog() {
				this.showMessage = !this.showMessage
			}
		},
		computed: {
			...mapGetters({faqUrl: 'links/faq' })
		},
		components: { CustomDialog }
	}
</script>
 
 
<style lang='scss' scoped>
</style>