<template>
	<div>
		<Dialog v-model:visible="showMessage" :breakpoints="{ '960px': '80vw' }" :style="{ width: '30vw' }" position="top">
			<div class="flex align-items-center flex-column pt-6 px-3">
				<i v-if="response.message" class="pi pi-check-circle" :style="{fontSize: '4rem', color: 'var(--green-400)' }"></i>
				<i v-if="response.error" class="pi pi-times-circle" :style="{fontSize: '4rem', color: 'var(--red-400)' }"></i>
				<h5 v-if="response.message" class="mt-3">{{ response.message }}</h5>
				<h6 v-if="response.error" v-for="error in response.error" class="mt-3">{{ error[0] }}</h6>
			</div>
			<template #footer>
				<div class="flex justify-content-center">
					<Button label="OK" @click="toggleDialog" class="p-button-text" />
				</div>
			</template>
		</Dialog>

		<h4 class="mb-4">Groups</h4>
		<div class="row g-3">
			<div class="col-12 col-md-6 col-xl-4">
				<Card class="card" v-if="groups">			
					<template #content>
						<div v-for="(group, key) in groups" class="group d-flex justify-content-between">
							{{group.name}}
							<DeleteItem v-if="delete" :delete="delete" :itemId="group.id" 
								:itemName="group.name" item="group" url="/api/groups/"
								redirectRoute="groups-all" :callback="'groups/getGroups'"/>
						</div>
					</template>
				</Card>	
			</div>
	
			<div class="col-12 col-md-6 col-xl-4">
				<Card class="card">
					<template #content>
						<form @submit.prevent="handleSubmit(!v$.$invalid)" class="p-fluid">
							<div class="inputgroup">
								<InputText id="name" v-model="v$.name.$model" :class="{'p-invalid':v$.name.$invalid && submitted}" 
										name="name" placeholder="Name"/>
							
								<InputError :validator="v$.name" :submitted="submitted" replace="Name"></InputError>
							</div>
							<Button type="submit" label="Add New Group" icon="pi pi-book" class="p-button-raised p-button-info mt-4"/>
						</form>
					</template>
				</Card>
			</div>
		</div>
	</div>
</template>
 
 
<script>
	import { mapGetters } from 'vuex';
	import { required, minLength } from "@vuelidate/validators";
	import { useVuelidate } from "@vuelidate/core";
	import DeleteItem from '../Users/DeleteItem.vue';

	export default {
		setup: () => ({ v$: useVuelidate() }),
		props: {
			groups: Array
		},
		data() {
			return {
				name: '',
				submitted: false,
				delete: true,
				showMessage: false,
				response: null
			}
		},
		validations() {
			return {
				name: { required, minLength: minLength(3) },
			}
		},
		methods: {
			handleSubmit(isFormValid) {
				this.submitted = true;

				if (!isFormValid) {
					return;
				}
				
				let data = {
					name: this.name,
				}

				this.addGroup( this.addGroupUrl, data );

			},
			toggleDialog() {
				this.showMessage = !this.showMessage;
			},
			async addGroup( url, data ) {
				try {
					await User.refreshedToken();

					await axios.post( url, data,  {
								headers: {
									Authorization: 'Bearer ' + User.getToken()
								}
							}).then( response => {
								this.response = response.data
								this.toggleDialog();
								this.$store.dispatch("groups/getGroups");
							})
				} catch (err) {
					Toast.fire({
						icon: 'error',
						timer: 5000,
						title: "Unable to add group"
					})
					throw 'Unable to add group'
				}
			}
		},
		computed: {
			...mapGetters({ addGroupUrl: 'links/addGroup' })
		},
		components: { DeleteItem }
	}
</script>
 
 
<style lang='scss' scoped>
.card {
	max-width: 576px;
	.group {
		line-height: 2rem;
	}
	.itext {
		width: 100%;
	}
}
</style>