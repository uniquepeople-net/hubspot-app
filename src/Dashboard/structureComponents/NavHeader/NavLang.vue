<template>
	<div>
		<!-- <span v-if="language === 'en'" class="lang-btn" @click="switchLanguage('sk')">
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
			<span class="img-wrapper">
				<img class="inactive-img" src="../../../../assets/images/united-kingdom.png" alt="slovak-lang">
				<img class="active-img" src="../../../../assets/images/slovakia.png" alt="slovak-lang">
			</span>
			<span class="d-flex flex-column">
				<span class="ps-1 f-size text-center">SK</span>
				<span class="ps-1 f-inactive text-center">EN</span>
			</span>
		</span> -->
		<div class="mb-4 d-flex justify-content-between lang-switch" @click="switchLanguage('en')">
			<p class="text-undertitle">
				English
				<span class="text-sm-notice"></span>
			</p>
			<i class="pi pi-check" v-if="language === 'en'"></i>
		</div>
		<div class="mb-4 d-flex justify-content-between lang-switch" @click="switchLanguage('sk')">
			<p class="text-undertitle">
				Slovenčina
				<span class="text-sm-notice d-block">Slovak</span>
			</p>
			<i class="pi pi-check" v-if="language === 'sk'"></i>
		</div>
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
				this.$router.push({ name: 'my-board' })
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
.text-sm-notice {
	color: var(--text-light-color);
}
.lang-switch {
	cursor: pointer;
}
.pi-check {
	color: var(--stat-chart-bg);
}
</style>