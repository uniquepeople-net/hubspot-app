<template>
	<div class="col-12 col-xl-6 col-xxl-4 mx-auto">
		<Card class="card">
			<template #title>
				<div class="card-header"><h5>{{ $t('message.Change') + ' ' + $t('message.Language') }}</h5></div>
			</template>
			<template #content>
				<NavLang />
			</template>
		</Card>
	</div>
</template>
 
 
<script>
	import NavLang from '../structureComponents/NavHeader/NavLang.vue'
	

	export default {
		data() {
			return {
			}
		},
		methods: {
 
		},
		components: { NavLang }
	}
</script>
 
 
<style lang='scss' scoped>
</style>