<template>
	<GridCard class="shot-accordion" :gradient="160" bgSize="4rem" :padding="`${collapsed ? '1rem' : '.5rem 1rem'}`">
		<template #content>
			<div class="center-center justify-content-between" @click="toggle">
				<span class="text-data">{{ $t('message.Shot') }}</span>
				<span>
					<span class="text-sm-notice">
						<i class="bi bi-arrow-right"></i>
						<span class="ms-2">{{name}}</span>
					</span>
					·
					<span class="text-sm-bold">{{time}}</span>
				</span>
				<i v-if="!collapsed" class="pi pi-chevron-down"></i>
				<i v-if="collapsed" class="pi pi-chevron-up"></i>
			</div>
			<div v-if="collapsed">
				<Divider class="divider-dark"/>
				<div class="row">
					<div class="col-6">
						<PassDetailsInfo :value="accurate === true ? $t('message.Accurate') : ( accurate === 'goal' ? $t('message.Goal') : $t('message.Inaccurate') )" :description="''">
							<template #vector>
								<CircleCheckBlue v-if="accurate === true" :stroke="strokeCheck"/>
								<CircleFailed v-if="!accurate"/>
								<Football v-if="accurate === 'goal'" :color="'green'" class="goal"/>
							</template>
						</PassDetailsInfo>
					</div>
					<div class="col-6">
						<PassDetailsInfo :value="time" :description="$t('message.DuelTime')">
							<template #vector>
								<TimeWatch />
							</template>
						</PassDetailsInfo>
					</div>
					<div class="col-6">
						<PassDetailsInfo :value="formatName(secondaryName)" :description="$t('message.DuelType')">
							<template #vector>
								<Football24 />
							</template>
						</PassDetailsInfo>
					</div>
					<div class="col-6">
						<PassDetailsInfo :value="name ? name : '-'" :description="$t('message.DuelOpponent')">
							<template #vector>
								<Person />
							</template>
						</PassDetailsInfo>
					</div>
				</div>
			</div>
		</template>
	</GridCard>
</template>
 
 
<script>
	import GridCard from "../../../../../global/GridCard.vue"
	import PassDetailsInfo from '../../Global/PassDetailsInfo.vue';
	import CircleCheckBlue from '../../Vectors/CircleCheckBlue.vue';
	import CircleFailed from '../../Vectors/CircleFailed.vue';
	import Football from '../../Vectors/Football.vue';
	import Football24 from '../../Vectors/Football24.vue';
	import Person from '../../Vectors/Person.vue';
	import TimeWatch from '../../Vectors/TimeWatch.vue';

	export default {
		props: ['name', 'time', 'length', 'secondaryName', 'accurate'],
		data() {
			return {
				collapsed: false
			}
		},
		methods: {
			toggle() {
				this.collapsed = !this.collapsed
			},
			formatName(text) {
				return text && text.replace(/_/g, ' ') 
			},
			strokeCheck() {
				return 'var(--stat-chart-bg)'
			}
		},
		components: { GridCard, CircleCheckBlue, CircleFailed, TimeWatch, PassDetailsInfo, Football24, Person, Football },
	}
</script>
 
 
<style lang='scss' scoped>
.shot-accordion {
	.goal {
		width: 25px;
		height: 25px;
	}
}
</style>