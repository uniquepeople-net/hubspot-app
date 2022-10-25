<template>
	<span v-if="validator.$error && submitted" class="error-msg">
		<span id="name-error" v-for="(error, index) of validator.$errors" :key="index">
			<small class="p-error">{{error.$message.replace('Value', replace)}}</small>
		</span>
	</span>
	<span v-else-if="(validator.$invalid && submitted) || validator.$pending.$response" class="p-error error-msg">
		<small>{{validator.required.$message.replace('Value', replace)}}</small>
	</span>
</template>
 
 
<script>
	export default {
		props: [ 'validator', 'submitted', 'replace' ],
	}
</script>
 
 
<style scope>
</style>