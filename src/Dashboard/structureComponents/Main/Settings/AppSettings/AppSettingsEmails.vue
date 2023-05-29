<template>
	<div>
		<Card class="card">
			<template #title>
				<div class="card-header d-flex justify-content-between align-items-center">
					<h5><span class="fw-normal">Emails</span></h5>
				</div>
			</template>

			<template #content>
				<DataTable v-if="emails" :value="emails" tableStyle="min-width: 50rem">
					<Column field="email" header="Email"></Column>
					<Column field="title" header="Title"></Column>
					<Column field="report" header="Report">
						<template #body="slotProps">
							<ToggleIcon :value="slotProps.data.report" @toggleValue="toggleReport(slotProps.data, $event)"/>
						</template>
					</Column>
					<Column field="contact" header="Contact">
						<template #body="slotProps">
							<ToggleIcon :value="slotProps.data.contact" @toggleValue="toggleContact(slotProps.data, $event)"/>
						</template>
					</Column>
					<Column>
						<template #body="slotProps">
							<DeleteItem :delete="true" :itemId="slotProps.data.id" 
										:itemName="slotProps.data.title" callback="emailsSet/getEmailsSet"
										item="email" url="/api/settings-emails/" redirectRoute="app-settings"></DeleteItem>
						</template>
					</Column>
				</DataTable>
			</template>

			<template #footer>
				<div class="card-header d-flex justify-content-between align-items-center">
					<h6><span class="fw-normal">Add Emails</span></h6>
				</div>
				<AppSettingsAdd />
			</template>
		</Card>
	</div>
</template>
 
 
<script>
	import { mapGetters } from 'vuex';
	import ToggleIcon from '../../../../global/ToggleIcon.vue';
	import DeleteItem from '../../Users/DeleteItem.vue';
	import AppSettingsAdd from './AppSettingsAdd.vue';

	export default {
		created() {
			this.$store.dispatch("emailsSet/getEmailsSet");
		},
		data() {
			return {
				emailsData: null
			}
		},
		methods: {
			toggleReport(data, event) {
				this.emailsData.map( e =>  {
					if ( e.id === data.id ) {
						e.report = event
					}
				})
			},
			toggleContact(data, event) {
				this.emailsData.map( e =>  {
					if ( e.id === data.id ) {
						e.contact = event
					}
				})
			}
		},
		computed: {
			...mapGetters({ emails: 'emailsSet/emails' }),
		},
		watch: {
			emails: function(data) {
				if (data) {
					this.emailsData = data
				}
			}
		},
		components: { ToggleIcon, AppSettingsAdd, DeleteItem },
	}
</script>
 
 

AppSettingsAdd<style lang='scss' scoped>

</style>