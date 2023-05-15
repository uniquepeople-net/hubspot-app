<template>
	<div>
		<h2 class="mb-4">{{ $t('message.Contactus') }}</h2>
		<ContactForm />
	</div>
</template>
 
 
<script>
	import ContactForm from './ContactForm.vue';

	export default {
		data() {
			return {
			}
		},
		methods: {
 
		},
		components: { ContactForm }
	}
</script>
 
 
<style lang='scss' scoped>
</style>