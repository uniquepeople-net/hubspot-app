<template>
	<AuthWrapper>
		<template v-slot:title>
			<h3 class="mb-4 text-gt-bold text-center">{{ $t('message.WeProtectIntro') }}</h3>
			<h5 class="text-description text-center intro-description">{{ $t('message.WelcomeIntro') }}</h5>
		</template>

		<template v-slot:body>
			<div class="center-center flex-column">
				<Button :label="$t('message.Create') + ' ' +  $t('message.Account')" 
						@click="redirectRegister" class="btn-black"/>
			</div>

			<div class="mt-4 center-center flex-column">
				<Button :label="$t('message.LoginV')" class="btn-border"
						@click="redirectLogin"/>
			</div>
		</template>

	</AuthWrapper>
</template>
 
 
<script>
	import AuthWrapper from '../Auth/AuthWrapper.vue';

	export default {
		data() {
			return {
			}
		},
		methods: {
			redirectRegister() {
				this.$router.push({name: 'register'})
			},
			redirectLogin() {
				this.$router.push({ name: 'login' })
			}
		},
		components: { AuthWrapper }
	}
</script>
 
 
<style lang='scss' scoped>
.intro-description {
	margin-bottom: 5rem;
}
</style>