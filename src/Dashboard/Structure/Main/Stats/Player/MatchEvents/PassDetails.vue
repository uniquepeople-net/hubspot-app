<template>
	<GridCard class="pass-accordion" :gradient="160" bgSize="4rem" :padding="`${collapsed ? '1rem' : '.5rem 1rem'}`">
		<template #content>
			<div class="center-center justify-content-between" @click="toggle">
				<span class="text-data">{{ $t('message.Pass') }}</span>
				<span>
					<span class="text-sm-notice">
						<i class="bi bi-arrow-right"></i>
						<span class="ms-2">{{name}}</span>
					</span>
					·
					<span class="text-sm-bold">{{time}}</span>
				</span>
				<i class="pi pi-chevron-down"></i>
				<!-- <i class="pi pi-chevron-up"></i> -->
			</div>
			<div v-if="collapsed">
				<Divider class="divider-dark"/>
				<div class="row">
					<div class="col-6">
						<PassDetailsInfo :value="accurate ? $t('message.Accurate') : $t('message.Inaccurate')" :description="$t('message.PassAccuracy')">
							<template #vector>
								<CircleCheck v-if="accurate"/>
								<CircleFailed v-if="!accurate"/>
							</template>
						</PassDetailsInfo>
					</div>
					<div class="col-6">
						<PassDetailsInfo :value="time" :description="$t('message.PassTime')">
							<template #vector>
								<TimeWatch />
							</template>
						</PassDetailsInfo>
					</div>
					<div class="col-6">
						<PassDetailsInfo :value="length + ' meters'" :description="$t('message.PassLength')">
							<template #vector>
								<Meter />
							</template>
						</PassDetailsInfo>
					</div>
					<div class="col-6">
						<PassDetailsInfo :value="formatName(secondaryName)" :description="$t('message.PassType')">
							<template #vector>
								<Football24 />
							</template>
						</PassDetailsInfo>
					</div>
					<div class="col-6">
						<PassDetailsInfo :value="name ? name : '-'" :description="$t('message.PassRecipient')">
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
import CircleCheck from '../../Vectors/CircleCheck.vue';
import CircleFailed from '../../Vectors/CircleFailed.vue';
import Football24 from '../../Vectors/Football24.vue';
import Meter from '../../Vectors/Meter.vue';
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
			return text.replace(/_/g, ' ') 
		}
  	},
  	components: { GridCard, CircleCheck, CircleFailed, TimeWatch, PassDetailsInfo, Meter, Football24, Person },
};
</script>

<style scoped>
.pass-accordion {
	border-radius: var(--btn-border-radius);
}
</style>