<template>
	<div>
		<h5 class="mb-4 text-gt-bold">{{ $t('message.Contact') }}</h5>
		<BoardMembers class="mb-5"/>
		<ContactForm />
	</div>
</template>
 
 
<script>
	import BoardMembers from './BoardMembers.vue';
	import ContactForm from './ContactForm.vue';

	export default {
		data() {
			return {
			}
		},
		methods: {
 
		},
		components: { ContactForm, BoardMembers }
	}
</script>
 
 
<style lang='scss' scoped>
</style>