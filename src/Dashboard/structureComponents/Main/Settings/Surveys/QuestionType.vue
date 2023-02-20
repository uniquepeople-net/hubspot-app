<template>
	<div>
		<QuestionTypeOpen v-if="type === 1" />
		<QuestionTypeClosed v-if="type === 2" />
		<QuestionTypeMulti v-if="type === 3 || type === 4 || type === 5" :type="type"/>
	</div>
</template>
 
 
<script>
	import SelectButton from 'primevue/selectbutton';
	import QuestionTypeOpen from './QuestionTypeOpen.vue';
	import QuestionTypeClosed from './QuestionTypeClosed.vue';
	import QuestionTypeMulti from './QuestionTypeMulti.vue';

	export default {
		props: [ 'type' ],
		data() {
			return {
				}
		},
		methods: {
			
		},
		components: { QuestionTypeOpen, QuestionTypeClosed, QuestionTypeMulti },
	}
</script>
 
 
<style lang='scss' scoped>
</style>