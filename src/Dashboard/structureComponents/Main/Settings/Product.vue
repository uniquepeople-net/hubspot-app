<template>
	<Card class="card">
		<template #title>
			<div class="card-header d-flex align-items-center justify-content-between">
				<h4 class="m-0">{{ product.name }}<i :class="`bi ${activityIcon(product.active)} ${activityClass(product.active)} mx-sm-1`"></i></h4>
				<i class="bi bi-pencil-square"></i>
			</div>
		</template>
		<template #content>			
			<div :class="`small-activity ${activityClass(product.active)}`">
				{{ activity(product.active) }}
			</div>
			<Divider />
			<h2 class="text-center">{{ product.amount }}<span> €</span></h2>
			<Divider />
			<div class="d-flex">
				<h5 class="fw-normal">{{ product.description }}</h5>
			</div>
			<Divider />
			<h5 class="fw-light">Interval: <span class="fw-normal">{{ product.interval }}</span></h5>
			<Divider />
			
		</template>
	</Card>
</template>
 
 
<script>
	export default {
		props: {
			product: Object
		},
		data() {
			return {
			}
		},
		methods: {
			activity(data) {
				return Boolean(data) === true ? 'active' : 'inactive'
			},
			activityClass(data) {
				return Boolean(data) === true ? 'active-color' : 'inactive-color'
			},
			activityIcon(data) {
				return Boolean(data) === true ? 'bi-check2' : 'bi-x'
			}
		},
	}
</script>
 
 
<style lang='scss' scoped>
.small-activity {
	font-size: 1rem;
	.bi {
		font-size: 1.2rem;
	}
}
.active-color {
	color: var(--green-600)
}
.inactive-color {
	color: var(--red-600);
}
.bi-pencil-square {
	color: var(--orange-500);
}
</style>