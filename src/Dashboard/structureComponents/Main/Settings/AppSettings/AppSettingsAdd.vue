<template>
	<div>
		<Dialog v-model:visible="showMessage" :breakpoints="{ '960px': '80vw' }" :style="{ width: '30vw' }" position="top">
			<div class="flex align-items-center flex-column pt-6 px-3">
				<i v-if="response.message" class="pi pi-check-circle" :style="{fontSize: '4rem', color: 'var(--green-400)' }"></i>
				<i v-if="response.error" class="pi pi-times-circle" :style="{fontSize: '4rem', color: 'var(--red-400)' }"></i>
				<h5 v-if="response.message" class="mt-3">{{ response.message }}</h5>
				<h6 v-if="response.error" v-for="(error, index) in response.error" class="mt-3">{{ index + ': ' + error[0].replace('validation.', '') }}</h6>
				<p v-if="response.message" :style="{lineHeight: 1.5}">
					{{ $t('message.Youraccountisregisteredundername') }} <b>{{name}} </b> {{ $t('message.andemail') }} <b>{{email}}</b>.
				</p>
			</div>
			<template #footer>
				<div class="flex justify-content-center">
					<Button label="OK" @click="toggleDialog" class="p-button-text" />
				</div>
			</template>
		</Dialog>

	    
		<div class="card-body">
				<div class="text-center my-4">
					<Button icon="bi bi-plus-lg" class="p-button-rounded p-button-success p-button-outlined" 
							@click="addItem"/>
				</div>

				<div class="row" v-for="(d, index) in data">
					<div class="inputgroup col-12 col-lg-6 mb-3 mb-lg-0">
						<InputIcon icon="pi pi-envelope"></InputIcon>
						<InputText id="email" v-model="v$.email.$model" :class="{'p-invalid':v$.email.$invalid && submitted, 'w-100': true}"
									name="email" placeholder="Email"/>

						<InputError :validator="v$.email" :submitted="submitted" replace="Email"></InputError>
					</div>

					<div class="inputgroup col-12 col-lg-6">
						<InputIcon icon="bi bi-card-heading"></InputIcon>
						<InputText id="title" v-model="v$.title.$model" :class="{'p-invalid':v$.title.$invalid && submitted, 'w-100': true}" 
								name="title" placeholder="Title"/>
					
						<InputError :validator="v$.title" :submitted="submitted" replace="Title"></InputError>
					</div>

					<div class="col-12 col-lg-4 mb-3 mb-lg-0 mt-3 d-flex align-items-center">
						<span class="me-2">Report:</span><ToggleIcon class="d-inline"/>
						<span class="me-2 ms-5">Contact:</span><ToggleIcon class="d-inline"/>
					</div>

					<div class="col-12 col-lg-8 d-flex align-items-center justify-content-end">
						<Button icon="bi bi-dash-lg" class="p-button-rounded p-button-danger p-button-text" 
							@click="removeItem(index)"/>
					</div>
						<Divider />
				</div>

				<div class="position-relative text-center mt-2">
					<Button type="submit" :label="$t('message.Submit')" 
							class=" submit-btn btn btn-primary btn-block btn-lg shadow-lg" :loading="loading"/>
				</div>

			
		</div>
					
			
    </div>
</template>

<script>

import { required, email, minLength, sameAs } from "../../../../../plugins/vuelidate-i18n";
import { useVuelidate } from "@vuelidate/core";
import axios from 'axios';
import { mapGetters } from 'vuex';

import ToggleIcon from '../../../../global/ToggleIcon.vue';


export default {
    setup: () => ({ v$: useVuelidate() }),
    data() {
        return {
			data: [],
            title: '',
            email: '@',
            submitted: false,
            showMessage: false,
			response: null,
			loading: false
        }
    },
    validations() {
        return {
            title: { required, minLength: minLength(2) },
            email: {  required, email },
        }
    },
    methods: {
		addItem() {
			let obj = { email: '', title: '', report: false, contact: false }
			this.data.push(obj)
		},
		removeItem(index) {
			console.log(index)
			this.data = this.data.filter( (d, i) => i !== index )
		},
        handleSubmit(isFormValid) {
            this.submitted = true;

            if (!isFormValid) {
                return;
            }

			this.loading = true

			let data = {
				title: this.title,
				email: this.email,
			}

			this.sendEmails( this.registersApiGwUrl, data )			
        },
        toggleDialog() {
            this.showMessage = !this.showMessage;
        
            if ( this.response && this.response.status === 'success') {
				//this.resetForm()				
			}
        },
        resetForm() {
            this.title = ''
            this.email = ''
            this.submitted = false
        },
		async sendEmails(url, data) {

			const user = await axios.post( url, data, {
				headers: {
					Authorization: 'Bearer ' + User.getToken()
				}
			}).then(
				resp => {
					this.response = resp.data
					this.toggleDialog()
					this.loading = false
				}				
			).catch( error => {
				Toast.fire({
					icon: 'error',
					timer: 4000,
					title: "Unable to add emails"
				})
				this.loading = false
			})
		},
		redirectLogin() {
			this.$router.push({ name: 'app-settings' })
		}
    },
	computed: {
		...mapGetters({ registersApiGwUrl: 'links/registerNewApiGwUrl' }),
	},
	components: { ToggleIcon }
}
</script>


<style lang="scss" scoped>
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
	:deep(.p-inputtext):not(#countryCode), :deep(.p-dropdown) {
		border-radius: 0 6px 6px 0;
	}
}
.submit-btn {
	max-width: 25rem;
}
.p-button-secondary {
	max-width: 6rem !important;
}
#countryCode {
	max-width: 6rem;
}
</style>