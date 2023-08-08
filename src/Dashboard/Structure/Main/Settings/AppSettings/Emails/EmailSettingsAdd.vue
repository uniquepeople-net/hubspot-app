<template>
	<div>

		<CustomDialog :visible="showMessage" :response="response" @hideDialog="hideDialog"/>
	    
		<div class="card-body">
				<div class="text-center my-4">
					<Button icon="bi bi-plus-lg" class="p-button-rounded p-button-success p-button-outlined" 
							@click="addItem"/>
				</div>

				<div class="row" v-for="(d, index) in data" :key="index">
					<div class="inputgroup col-12 col-lg-6 mb-5 mb-lg-0 position-relative">
						<InputText id="email" v-model="d.email" :class="{'p-invalid':validateEmail(d.email), 'w-100': true}"
									name="email" placeholder="Email"/>

						<small v-if="validateEmail(d.email)" class="error-msg">Insert valid email</small>
					</div>

					<div class="inputgroup col-12 col-lg-6">
						<InputText id="title" v-model="d.title" :class="{'p-invalid':validateTitle(d.title), 'w-100': true}" 
								name="title" placeholder="Title"/>
					
						<small v-if="validateTitle(d.title)" class="error-msg">Insert title between 2 and 255 characters</small>
					</div>

					<div class="col-12 col-lg-4 mb-3 mb-lg-0 mt-3 d-flex align-items-center">
						<span class="me-2">Contact:</span>
							<ToggleIcon class="d-inline" :value="d.contact" @toggleValue="toggleValue( index, 'contact', $event )"/>
						<span class="me-2 ms-5">Report:</span>
							<ToggleIcon class="d-inline" :value="d.report" @toggleValue="toggleValue( index, 'report', $event )"/>
					</div>

					<div class="col-12 col-lg-8 d-flex align-items-center justify-content-end">
						<Button icon="bi bi-dash-lg" class="p-button-rounded p-button-danger p-button-text" 
								@click="removeItem(index)"/>
					</div>

					<Divider />
				</div>

				<div class="position-relative text-center mt-2">
					<Button type="submit" :label="$t('message.Submit')" 
							class="btn-black shadow-lg w-auto" :loading="loading"
							@click="handleSubmit"/>
				</div>
		</div>
					
    </div>
</template>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex';
import ToggleIcon from '../../../../../global/ToggleIcon.vue';
import CustomDialog from '../../../../../global/CustomDialog.vue';


export default {
	props: {
		existingEmails: Object
	},
    data() {
        return {
			data: [],
            submitted: false,
            showMessage: false,
			response: null,
			loading: false,
			validEmail: false,
			validTitle: false
        }
    },
    methods: {
		hideDialog() {
			this.showMessage = false
		},
		addItem() {
			let obj = { email: '@', title: '', report: false, contact: false }
			this.data.push(obj)
		},
		removeItem(index) {
			this.data = this.data.filter( (d, i) => i !== index )
		},
		toggleValue(index, title, value) {
			this.data = this.data.map( (d, i) => {
				if ( index === i ) {					
					return { ...d, [title]: value }
				}
				return d
			})
		},
		validateEmail(value) {
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;			
			if ( !emailRegex.test(value) ) {
				this.validEmail = false 
				return true
			 } else {
				this.validEmail = true
				return false
			 }
		},
		validateTitle(title) {
			if ( title.length <= 2 || title.length >= 255 ) {
				this.validTitle = false
				return true
			} else {
				this.validTitle = true
				return false
			}
		},
        handleSubmit() {
            this.submitted = true;
			this.data.map( d => {
				this.validateEmail(d.email)
				this.validateTitle(d.title)
			})
			
			if ( this.data.length && (!this.validEmail || !this.validTitle) ) return

            this.loading = true

			let data = {
				emails: this.data,
				existingEmails: this.existingEmails
			}

			this.sendEmails( this.sendEmailsUrl, data )			
        },
        toggleDialog() {
            this.showMessage = !this.showMessage;
        },
        resetForm() {
            this.title = ''
            this.email = ''
            this.submitted = false
        },
		async sendEmails(url, data) {

			await User.refreshedToken();

			await axios.post( url, data, {
				headers: {
					Authorization: 'Bearer ' + User.getToken()
				}
			}).then(
				resp => {
					this.response = resp.data
					this.toggleDialog()
					this.data = []
					this.loading = false
					this.$store.dispatch("emailsSet/getEmailsSet");
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
		...mapGetters({ sendEmailsUrl: 'links/emailsSet' }),
	},
	components: { ToggleIcon, CustomDialog }
}
</script>


<style lang="scss"
CustomDialog scoped>
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
.error-msg {
	position: absolute;
	top: 100%;
	font: {
		size: .8rem;
		weight: 400;
	}
	color: var(--red-600);
}
</style>