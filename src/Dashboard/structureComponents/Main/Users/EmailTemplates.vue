<template>
	<div>
		<CustomDialog :visible="showMessage" :response="response" @hideDialog="hideDialog"/>
	
		<Card class="card">
			<template #title>
				<h5 class="card-header d-flex justify-content-between align-items-center">
					{{ $t('message.Templates') }}
					<Button icon="bi bi-plus-lg" class="p-button-success p-button-outlined" @click="addTemplate"/>
					<!-- <Button :label="$t('message.Add') + ' ' + $t('message.template') " icon="bi bi-plus-lg" class="p-button-success p-button-outlined" @click="addTemplate"/> -->
				</h5>
			</template>
			<template #content>
	
				<div v-if="templatesAdd.length !== 0">
					<div v-for="(templateAdd, index) in templatesAdd" class="my-2 d-flex center-center" :key="index">
						<InputText id="title" v-model="templateAdd.title" :class="`ms-1 w-100 ${submittedTemplate && !templateAdd.title && 'p-invalid'}`"
								name="title" :placeholder="$t('message.Title')" />
						<Button icon="bi bi-dash-lg" class="p-button-rounded p-button-danger p-button-text remove-btn" 
								@click="removeItem()"/>
					</div>
					<div class="center-center">
						<Button :label="$t('message.Save') + ' ' + $t('message.template')" 
								severity="success" outlined class="d-block" @click="saveTemplate" />
					</div>
				</div>
				
				<Divider v-if="templatesAdd.length > 0"/>
	
				<div v-for="(template, index) in templates" class="d-flex justify-content-between align-items-center">
					<span class="me-5">{{ template.title }}</span> 
					<div class="d-flex align-items-center">
						<span class="me-1">{{$t('message.AddTo')}}</span>
						<div class="d-flex flex-column">
							<Button :label="$t('message.Start')" severity="secondary" link @click="prepend(template.content)" />
							<Button :label="$t('message.End')" severity="secondary" link @click="append(template.content)"/>
						</div>
						<DeleteItem :delete="true" :itemId="template.id" :itemName="template.title" 
								item="template" url="/api/templates/" callback="emails/getTemplates"></DeleteItem>
					</div>
				</div>
	
			</template>
		</Card>
	</div>
</template>
 
 
<script>
	import { mapGetters } from 'vuex'
	import CustomDialog from '../../../global/CustomDialog.vue'
	import DeleteItem from '../Users/DeleteItem.vue'

	export default {
		props: {
			content: String
		},
		created() {
			this.$store.dispatch("emails/getTemplates");
		},
		data() {
			return {
				templatesAdd: [],
				submittedTemplate: false,
				showMessage: false,
				response: null
			}
		},
		methods: {
			toggleDialog() {
				this.showMessage = !this.showMessage
			},
			hideDialog() {
				this.showMessage = false
			},
			prepend(data) {
				this.$emit( 'prependTemplate', data )
			},
			append(data) {
				this.$emit( 'appendTemplate', data )
			},
			addTemplate() {
				if ( this.templatesAdd.length === 0 ) {
					let obj = { title: '', content: this.content }
					this.templatesAdd.push(obj)
				}
			},
			removeItem() {
				this.templatesAdd = []
			},
			saveTemplate() {
				if ( this.templatesAdd.length !== 0 
					 && this.templatesAdd[0].title.length > 0 
					 && this.templatesAdd[0].content.length > 0 ) {

					this.templatesAdd[0].content = this.content

					axios.post( this.templatesLink, this.templatesAdd[0], {
						headers: {
							Authorization: 'Bearer ' + User.getToken()
						}
					}).then( response => {
						this.toggleDialog()
						this.response = response.data
						this.$store.dispatch("emails/getTemplates");
					}).catch( error => {
						Toast.fire({
							icon: 'error',
							timer: 5000,
							title: "Unable to save template"
						})
					})

				} else {
					Toast.fire({
						icon: 'error',
						timer: 4000,
						title: 'Unable to save template'
					}) 
				}
			},
			/* disabledBtn() {
				return this.templatesAdd[0].title > 2 ? true : false
			}  */
		},
		computed: {
			...mapGetters({ templates: 'emails/templates',
							templatesLink: 'links/templates' })
		},
		components: { CustomDialog, DeleteItem }
	}
</script>
 
 
<style lang='scss' scoped>
</style>