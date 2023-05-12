<template>
	<div>
		<span v-if="language === 'en'" class="lang-btn" @click="switchLanguage('sk')">
			<!-- <i class="bi bi-translate"></i> -->
			<span class="img-wrapper">
				<img class="active-img" src="../../../../assets/images/united-kingdom.png" alt="slovak-lang">
				<img class="inactive-img" src="../../../../assets/images/slovakia.png" alt="slovak-lang">
			</span>
			<span class="d-flex flex-column">
				<span class="ps-1 f-size text-center">EN</span>
				<span class="ps-1 f-inactive text-center">SK</span>
			</span>
		</span>
		<span v-if="language === 'sk'" class="lang-btn" @click="switchLanguage('en')">
			<!-- <i class="bi bi-translate"></i> -->
			<span class="img-wrapper">
				<img class="inactive-img" src="../../../../assets/images/united-kingdom.png" alt="slovak-lang">
				<img class="active-img" src="../../../../assets/images/slovakia.png" alt="slovak-lang">
			</span>
			<span class="d-flex flex-column">
				<span class="ps-1 f-size text-center">SK</span>
				<span class="ps-1 f-inactive text-center">EN</span>
			</span>
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
	display: flex;
	align-items: center;
	font-size: .8rem;
	.bi-translate {
		font-size: 1.4rem;
	}
	.f-size {
		font-weight: 700;
	}
	.img-wrapper {
		position: relative;
		width: 25px;
		height: 40px;
		left: 0;
	}
	.inactive-img, .active-img {
		position: absolute;
	}
	.inactive-img {
		z-index: 5;
		bottom: 0;
		right: 0;
		width: 20px;
		opacity: .35;
	}
	.active-img {
		z-index: 10;
		width: 25px
	}
}
</style>