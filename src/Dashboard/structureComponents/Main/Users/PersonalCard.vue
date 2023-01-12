<template>
	<Card class="card mb-4">
		<!-- <template #header> -->
			<!-- <img v-if="photo" alt="user-photo" :src="photo" class="personal-card-img">
			<Skeleton v-if="!photo" shape="circle" class="img-skeleton" width="230px" height="230px"/> -->
		<!-- </template> -->
		<template #title>
			<!-- <div class="row">
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
			</div> -->
			{{ user.name }}
			<Divider />
		</template>
		<template #content>
			<h5><span class="fw-lighter">Club:&nbsp;</span>{{user.club}}</h5>
			<h5><span class="fw-lighter">Tel. number:&nbsp;</span>{{user.tel_number}}</h5>
			<h5><span class="fw-lighter">Birth date:&nbsp;</span>{{user.birth_date}}</h5>
			<h5><span class="fw-lighter">Active member:&nbsp;</span>
				<i v-if="user.active_member" class="pi pi-check-circle" :style="{fontSize: '1.2rem', color: 'var(--green-400)' }"></i>
                <i v-if="!user.active_member" class="pi pi-times-circle" :style="{fontSize: '1.2rem', color: 'var(--red-400)' }"></i>
			</h5>
			<h5><span class="fw-lighter">Member from:&nbsp;</span>{{formatDateToSk(user.member_from)}}</h5>
			<h5><span class="fw-lighter">Var. symbol:&nbsp;</span>{{user.var_symbol}}</h5>
		</template>
		<template #footer>
		</template>
	</Card>
</template>
 
 
<script>
	export default {
		props: { 
			user: Object 
		},
		methods: {
			activity(data) {
				return
			},
			formatDateToSk(date) {
				return Helpers.formatDateToSk(date)
			}
		}
	}
</script>
 
 
<style lang='scss' scoped>
.card {
	margin: auto;
	//max-width: 576px;
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