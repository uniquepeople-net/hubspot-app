<template>
	specific email {{ emailId }}
</template>
 
 
<script>
	export default {
		data() {
			return {
				//emailId: this.$route.params.email_id			
			}
		},
		methods: {
 
		},
		computed: {
			emailId() {
				return this.$route.params.email_id
			}
		} 
	}
</script>
 
 
<style lang='scss' scoped>
</style>