<template>
	<div>
		<span v-if="language === 'en'" class="lang-btn" @click="switchLanguage('sk')">
			<span class="pe-1 f-size">EN</span>
			<i class="bi bi-translate"></i>
			<span class="ps-1 opacity-50">SK</span>
		</span>
		<span v-if="language === 'sk'" class="lang-btn" @click="switchLanguage('en')">
			<span class="pe-1 opacity-50">EN</span>
			<i class="bi bi-translate"></i>
			<span class="ps-1 f-size">SK</span>
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
	.f-size {
		font-weight: 700;
	}
}
</style>