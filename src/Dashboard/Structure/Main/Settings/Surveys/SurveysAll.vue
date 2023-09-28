<template>
	<div>
		<BackButton :title="$t('message.Surveys')" class="mb-4" route="my-board"/>

		<div><Button label="Add New Survey" icon="pi pi-book" class="p-button-raised mt-4 btn-border" @click="addNewSurvey"/></div>
	
		<div class="row g-4 mt-3" v-if="surveys">			
			<div class="col-12 col-sm-6 col-xl-4 col-xxl-3 mb-3 mb-sm-0" v-for="(survey, key) in surveys">
				<Survey :survey="survey"/>
			</div>
		</div>	
	
	</div>
</template>
 
 
<script>
	import Survey from './Survey.vue';
	import { mapGetters } from 'vuex';
	import BackButton from '../../../../global/BackButton.vue';

	export default {
		props: {
			surveys: Array
		},
		methods: {
			addNewSurvey() {
				this.$router.push({name: 'add-new-survey'})			
			}
		},
		components: { Survey, BackButton }
	}
</script>
 
 
<style lang='scss' scoped>
</style>