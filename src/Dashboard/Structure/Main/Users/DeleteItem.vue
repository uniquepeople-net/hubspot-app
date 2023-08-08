<template>
	<div>
		<Dialog class="delete-dialog" v-model:visible="showMessage" :modal="true" :breakpoints="{ '960px': '80vw' }" :style="{ width: '30vw' }" position="center">
			<div class="d-flex align-items-center flex-row pt-6 px-3">
				<i v-if="!deleteMessage" class="bi bi bi-exclamation-triangle" :style="{fontSize: '4rem', color: 'var(--red-400)' }"></i>
				<i v-if="deleteMessage" class="pi pi-check-circle" :style="{fontSize: '4rem', color: 'var(--green-400)' }"></i>
				<h5 v-if="!deleteMessage" class="mt-3 ms-4">Do you really want to delete this {{item}}: <b>{{ itemName }}</b></h5>
				<h5 v-if="deleteMessage" class="mt-3 ms-4">{{ deleteMessage }}: {{ itemName }}</h5>
			</div>
			<template #footer>
				<div :class="`d-flex justify-content-between position-relative ${deleteMessage ? 'justify-content-end' : ''}`">
					<div class="position-relative">
						<Button v-if="!deleteMessage" label="DELETE" @click="deleteUser" class="p-button-raised p-button-danger" />
						<div v-if="loading" class="spinner-grow position absolute" role="status"></div>
					</div>
					<Button v-if="!deleteMessage" label="Cancel" @click="toggleDialog" class="p-button-raised p-button-warning" />
					<Button v-if="deleteMessage" label="OK" @click="redirect" class="p-button-raised p-button-secondary" />
				</div>
			</template>
		</Dialog>
	
		<i v-if="delete" class="bi bi-trash" @click="toggleDialog"></i>
	</div>	
</template>
 
 
<script>
	export default {
		props: ['delete', 'itemId', 'itemName', 'item', 'url', 'redirectRoute', 'callback'],
		data() {
			return {
				showMessage: false,
				deleteMessage: null,
				loading: false
			}
		},
		methods: {
			toggleDialog() {
				this.showMessage = !this.showMessage;
			},
			deleteUser() {
				this.loading = true				
				axios.delete( DOMAIN_URL + this.url + this.itemId, {
						headers: {
							Authorization: 'Bearer ' + User.getToken()
						}
					}).then( response => {
						this.deleteMessage = response.data.message
						this.loading = false
					}).catch( error => {
						this.toggleDialog()
						this.loading = false
						Toast.fire({
							icon: 'error',
							timer: 5000,
							title: "Unable to delete " + this.item
						})						
					})
			},
			redirect() {
				if ( this.callback ) {
					this.$store.dispatch(this.callback);
				}
				if ( this.redirectRoute ) {
					this.$router.push({name: this.redirectRoute})
				}
				this.toggleDialog()
				this.deleteMessage = null
			}
		},
	}
</script>
 
 
<style lang='scss' scoped>
.bi-trash {
	color: var(--red-700);
	padding: 0 1rem;
	cursor: pointer;
}
</style>