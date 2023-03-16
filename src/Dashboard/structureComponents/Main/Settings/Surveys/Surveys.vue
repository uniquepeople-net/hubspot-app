<template>
	<div>
		<router-view :key="$route.fullPath" v-if="surveys" :surveys="surveys"></router-view>
		
		<LoadingIcon v-if="!surveys"/>
	</div>
</template>
 
 
<script>
import { mapGetters } from 'vuex'

export default {
	created() {
		this.$store.dispatch("surveys/getSurveys");
	},
	computed: {
		...mapGetters({ surveys: 'surveys/surveys' })
	}
}
</script>
 
 
<style lang='scss' scoped>
</style>