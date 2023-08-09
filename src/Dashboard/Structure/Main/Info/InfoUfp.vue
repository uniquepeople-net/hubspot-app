<template>
	<div>
		<BackButton :title="$t('message.Contact')" class="mb-4" route="my-board"/>
		<BoardMembers class="mb-5"/>
		<ContactForm />
	</div>
</template>
 
 
<script>
	import BackButton from '../../../global/BackButton.vue';
	import BoardMembers from './BoardMembers.vue';
	import ContactForm from './ContactForm.vue';

	export default {
		data() {
			return {
			}
		},
		methods: {
 
		},
		components: { ContactForm, BoardMembers, BackButton }
	}
</script>
 
 
<style lang='scss' scoped>
</style>