<template>	
	<Divider />
	<p class="mt-2">{{ $t('message.Suggestions')}}</p>
	<ul class="pl-2 ml-2 mt-0" style="line-height: 1.5">
		<li>{{ $t('message.Atleast') + ' ' + $t('message.oneIt') + ' ' + $t('message.lowercase') + '.' }}</li>
		<li>{{ $t('message.Atleast') + ' ' + $t('message.oneIt') + ' ' + $t('message.uppercase') + '.' }}</li>
		<li>{{ $t('message.Atleast') + ' ' + $t('message.oneIt') + ' ' + $t('message.numeric') + '.'}}</li>
		<li>{{ 'Minimum' + ' ' + '8' + ' ' + $t('message.characters') + '.' }}</li>
	</ul>					
</template>
 
 
<script>
	export default {
		data() {
			return {
			}
		},
		methods: {
 
		},
	}
</script>
 
 
<style scope>
</style>