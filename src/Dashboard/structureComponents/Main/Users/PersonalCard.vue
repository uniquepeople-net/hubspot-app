<template>
	<Card class="card">
		<template #header>
			<img v-if="photo" alt="user-photo" :src="photo" class="personal-card-img">
			<Skeleton v-if="!photo" shape="circle" class="img-skeleton" width="230px" height="230px"/>
		</template>
		<template #title>
			<div class="row">
				<div class="col-8 col-sm-6 name">
					<h3 v-if="firstname" class="fw-semibold">{{ firstname + ' ' + lastname }}</h3>
					<h5 v-if="position" class="fw-light">{{ position }}</h5>
					<Skeleton v-if="!firstname" shape="rectangle" class="img-skeleton py-3" width="100%"/>
				</div>
				<div class="col-4 col-sm-6 team flex-column d-flex justify-content-center">
					<div class="team-wrapper">
						<img v-if="teamphoto" :src="teamphoto" alt="">
						<h5 v-if="teamname">{{ teamname }}</h5>
					</div>
					<Skeleton v-if="!teamname" shape="rectangle" class="img-skeleton py-3" width="100%"/>
				</div>
			</div>
			
		</template>
		<template #content>
			
		</template>
		<template #footer>
			<Button icon="pi pi-check" label="Save" />
			<Button icon="pi pi-times" label="Cancel" class="p-button-secondary" style="margin-left: .5em" />
		</template>
	</Card>
</template>
 
 
<script>
	export default {
		props: [ 'photo', 'firstname', 'lastname', 'position', 'teamname', 'teamphoto' ],
		data() {
			return {
			}
		},
		methods: {
 
		},
	}
</script>
 
 
<style lang='scss' scoped>
.card {
	margin: auto;
	max-width: 576px;
	:deep(.p-card-header) {
		display: flex;
		justify-content: center;
		padding: 1rem 0;
	}
	.personal-card-img, .img-skeleton {
		width: 250px;
	}
	.team {
		img {
			max-width: 70px;
		}
		.team-wrapper {
			width: fit-content;
			margin-left: auto;
			text-align: center;
		}
	}
}
@media( max-width: 576px ) {
	.card {
		.personal-card-img, .img-skeleton {
			width: 150px;
		}
		.name {
			h3 {
				font-size: 1.1rem;
			}
			h5 {
				font-size: .9rem;
			}
		}
		.team {
			.team-wrapper {
				h5 {
					font-size: .6rem;
				}
				img {
					max-width: 50px;
				}
			}
		}
	}
}

</style>