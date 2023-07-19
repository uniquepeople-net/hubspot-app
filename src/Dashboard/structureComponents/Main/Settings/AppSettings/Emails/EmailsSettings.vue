<template>
	<div>
		<Card class="card">
			<template #title>
				<div class="card-header d-flex justify-content-between align-items-center">
					<h5>Emails</h5>
				</div>
			</template>

			<template #content>
				<Skeleton v-if="!emails" height="2rem" class="mb-2"></Skeleton>
				<DataTable v-if="emails" :value="emailsData" tableStyle="min-width: 50rem">
					<Column field="email" header="Email"></Column>
					<Column field="title" header="Title"></Column>
					<Column field="contact" header="Contact">
						<template #body="slotProps">
							<ToggleIcon :value="slotProps.data.contact" @toggleValue="toggleContact(slotProps.data, $event)"/>
						</template>
					</Column>
					<Column field="report" header="Report">
						<template #body="slotProps">
							<ToggleIcon :value="slotProps.data.report" @toggleValue="toggleReport(slotProps.data, $event)"/>
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
					<h6>Add Emails</h6>
				</div>
				<AppSettingsAdd :existingEmails="emailsData"/>
			</template>
		</Card>
	</div>
</template>
 
 
<script>
	import { mapGetters } from 'vuex';
	import ToggleIcon from '../../../../../global/ToggleIcon.vue';
	import DeleteItem from '../../../Users/DeleteItem.vue';
	import AppSettingsAdd from './EmailSettingsAdd.vue';

	export default {
		created() {
			this.$store.dispatch("emailsSet/getEmailsSet");
		},
		data() {
			return {
				emailsData: []
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


<style lang='scss' scoped>

</style>