<template>
		<router-view :key="$route.fullPath" v-if="groups" :groups="groups"></router-view>
		<LoadingIcon v-if="!groups"/>
</template>
 
 
<script>
	import { mapGetters } from 'vuex'

	export default {
		created() {
			this.$store.dispatch("groups/getGroups");
		},
		computed: {
			...mapGetters({ groups: 'groups/groups' })
		}
	}
</script>
 
 
<style lang='scss' scoped>
</style>