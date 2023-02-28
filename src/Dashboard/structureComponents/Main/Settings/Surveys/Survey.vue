<template>
	<Card class="card">
		<template #title>
			<div class="card-header d-flex align-items-center justify-content-between">
				<h4 class="m-0">{{ survey.name }}</h4>				
				<Tag class="mr-2" :severity="activityTag(survey.survey_status.name)" :value="survey.survey_status.name" rounded></Tag>
			</div>	
		</template>
		<template #content>			
			
			<div class="row">
				<div class="col-7 col-r-border">
					<h5 class="fw-light">Start date: <span class="fw-normal d-block">{{ formatDateToSk(survey.start_date) }}</span></h5>
					<h5 class="fw-light">Finish date: <span class="fw-normal d-block">{{ formatDateToSk(survey.finish_date) }}</span></h5>
				</div>
				<div class="col-5 d-flex align-items-center justify-content-center">
					<h5>Length:<span class="fw-normal d-block text-center">{{ getDiffDate( survey.start_date, survey.finish_date ) }}</span></h5>
				</div>
			</div>
			<Divider />
			<div class="d-flex">
				<h5 class="fw-light">Description: <span class="fw-normal">{{ survey.description }}</span></h5>
			</div>
			<Divider />

			
			
		</template>
		<template #footer>
			<div class="d-flex justify-content-between edit-icon">
				<div>
					<a class="link-survey" :href="stringToSlug(survey.name)"><i class="bi bi-box-arrow-up-right"></i></a>
				</div>
				<router-link :to="{name: 'specific-survey', params: {survey_id: survey.id}}">
					<i class="bi bi-pencil-square"></i>
				</router-link>
			</div>
		</template>
	</Card>
</template>
 
 
<script>
	import Tag from 'primevue/tag';

	export default {
		props: {
			survey: Object,
		},
		data() {
			return {
			}
		},
		methods: {
			activityTag(data) {
				return (data === 'Waiting') ? 'warning' : (data === 'Running') ? 'success' : 'info'
			},
			formatDateToSk(date) {
				return Helpers.formatDateToSk(date)
			},
			getDiffDate( startDate, finishDate ) {
				let length = Helpers.getDiffDays(startDate, finishDate)
				return length > 1 ? length + ' days' : length + ' day'
			},
			stringToSlug(data) {
				let path = window.location.origin + '/survey/' + Helpers.stringToSlug(data)
				return path
			},
			surveyLink() {
				this.$router.push(stringToSlug(survey.name))
			}
		},
		components: { Tag }
	}
</script>
 
 
<style lang='scss' scoped>
.edit-icon {
	.bi {
		font-size: 1.4rem;
	}
}
.bi-pencil-square {
	color: var(--yellow-700);
}
.card {
	:deep(.p-card-footer) {
		padding: 0;
	}
	.pay-btn {
		width: 100%;
		justify-content: center;
	}
}
.col-r-border {
	border-right: 1px solid var(--gray-300);
}
.link-survey {
	padding: .5rem 1.5rem;
	box-shadow: rgba(17, 17, 26, 0.1) 0px 0px 16px;
	border-radius: 6px;
}
</style>