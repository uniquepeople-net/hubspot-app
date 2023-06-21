<template>
	<div class="text-center">
		<QuestionMark class="mb-4"/>
		<p class="text-message">{{ $t('message.Inordertoviewyourstatistics')}}</p>
	</div>
</template>
 
 
<script>
	import QuestionMark from './Vectors/QuestionMark.vue'
	
	export default {
		data() {
			return {
				}
		},
		methods: {
			
		},
		components: { QuestionMark },
	}
</script>
 
 
<style lang='scss' scoped>
.text-message {
	max-width: 205px;
	color: var(--text-light-color);
	margin: auto;
}
</style>