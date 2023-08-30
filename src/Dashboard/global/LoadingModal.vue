<template>
	<Dialog v-model:visible="loading" modal :showHeader="false" 
			style="box-shadow:unset;"
			contentStyle="background: transparent;">
		<template #default>

			<div><LoadingIcon :infinite="true"/></div>

		</template>
	</Dialog>
</template>
 
 
<script>
	import LoadingIcon from "./LoadingIcon.vue"

	export default {
		props: ['loading'],
		data() {
			return {
			}
		},
		methods: {
			
		},
		components: { LoadingIcon },
	}
</script>
 
 
<style lang='scss' scoped>

</style>