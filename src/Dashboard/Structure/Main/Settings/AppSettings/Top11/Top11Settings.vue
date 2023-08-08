<template>
	<Card class="card">
		<template #title>
			<div class="card-header d-flex justify-content-between align-items-center">
				<h5>TOP 11</h5>
				<OpenBlockIcon :collapsed="collapsed" @click="() => { collapsed = !collapsed }" />
			</div>
		</template>

		<template #content v-if="collapsed">
			<Skeleton v-if="!top11" height="2rem" class="mb-2"></Skeleton>
			
			<div v-for="gender in top11.genders" v-if="top11" class="mb-3 top-11-list">
				<div class="d-flex justify-content-between align-items-center">
					<h5>{{ gender.gender.toUpperCase() }}</h5>
				</div>
	
				<DataTable :value="gender.topelevens" tableStyle="min-width: 50rem">
					<Column header="Season">
						<template #body="slotProps">
							{{ slotProps.data.season.season }}
						</template>
					</Column>
					<Column field="goalkeeper" :header="$t('message.Goalkeeper')"></Column>				
					<Column :header="$t('message.Defenders')">
						<template #body="slotProps">
							<span>
								{{ fullText ? slotProps.data.defenders.join(', ') : shorten(slotProps.data.defenders.join(', '))}} 
							</span>
						</template>
					</Column>
					<Column :header="$t('message.Midfielders')">
						<template #body="slotProps">
							<span>
								{{ fullText ? slotProps.data.midfielders.join(', ') : shorten(slotProps.data.midfielders.join(', ')) }} 
							</span>
						</template>
					</Column>
					<Column :header="$t('message.Strikers')">
						<template #body="slotProps">
							<span>
								{{ fullText ? slotProps.data.strikers.join(', ') : shorten(slotProps.data.strikers.join(', ')) }} 
							</span>
						</template>
					</Column>
									
					<Column>
						<template #body="slotProps">
							<Button :label="fullText ? 'Short' : 'Full'" v-if="checkStrLength(slotProps.data.strikers.join(', ')) || checkStrLength(slotProps.data.defenders.join(', ')) || checkStrLength(slotProps.data.midfielders.join(', '))"
										@click="handleText" plain text raised />
						</template>
					</Column>
					
					<Column>
						<template #body="slotProps">
							<DeleteItem :delete="true" :itemId="slotProps.data.id" 
										:itemName="slotProps.data.title" callback="surveys/getSurveysTop11"
										item="TOP 11" url="/api/surveys-top11/" redirectRoute="app-settings"></DeleteItem>
						</template>
					</Column>
				</DataTable>
			</div>
	
		</template>

		<template #footer v-if="collapsed">
			<div class="add-bg p-1">
				<Top11SettingsAdd v-if="top11" :top11Data="top11"/>
			</div>
		</template>
	</Card>
</template>
 
 
<script>
	import { mapGetters } from 'vuex';
	import OpenBlockIcon from '../../../../../global/OpenBlockIcon.vue';
	import DeleteItem from '../../../Users/DeleteItem.vue';
	import Top11SettingsAdd from './Top11SettingsAdd.vue';

	export default {
		created() {
			this.$store.dispatch("surveys/getSurveysTop11");
		},
		data() {
			return {
				top11Data: [],
				collapsed: false,
				fullText: false,
				maxLength: 25
			}
		},
		methods: {
			shorten(string) {
				if (string.length <= this.maxLength) {
					return string;
				} else {
					return string.slice(0, this.maxLength) + '...';
				}
			},
			handleText() {
				this.fullText = !this.fullText
			},
			checkStrLength(string) {
				if (string.length <= this.maxLength) {
					return false
				} else {
					return true
				}
			},
			arrToReadable(arrayString) {

			}
		},
		computed: {
			...mapGetters({ top11: 'surveys/surveysTop11' })
		},
		components: { DeleteItem, OpenBlockIcon, Top11SettingsAdd },
	}
</script>
 
 
<style lang='scss' scoped>
.top-11-list {
	:deep(.p-button) {
		margin-left: 1rem;
		padding: 0 .5rem;
	}
}
</style>