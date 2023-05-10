<template>
	<div>
		<span v-if="language === 'en'" class="lang-btn" @click="switchLanguage('sk')">
			<i class="bi bi-translate"></i>
			<span class="ms-1">SK</span>
		</span>
		<span v-if="language === 'sk'" class="lang-btn" @click="switchLanguage('en')">
			<i class="bi bi-translate"></i>
			<span class="ms-1">EN</span>
		</span>
	</div>
</template>
 
 
<script>
	export default {
		methods: {
			switchLanguage(lang) {
				const currentPath = this.$route.path
				this.$router.push('/' + lang + currentPath.substring(3));
				this.$i18n.locale = lang;
				localStorage.setItem('lang', lang)
			}
		},
		computed: {
			language() {
				return this.$i18n.locale
			}
		}
	}
</script>
 
 
<style lang='scss' scoped>
.lang-btn {
	cursor: pointer;
	.bi-translate {
		font-size: 1.4rem;
	}
}
</style>