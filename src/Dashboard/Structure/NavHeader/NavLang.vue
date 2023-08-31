<template>
	<div>
		<div class="mb-4 d-flex justify-content-between lang-switch" @click="switchLanguage('en')">
			<p class="text-undertitle d-flex align-items-center">
				<FlagGB />
				<span class="mx-1">
					{{ $t('message.English') }}
					<span class="text-sm-notice"></span>
				</span>
				<i class="pi pi-check" v-if="language === 'en'"></i>
			</p>
		</div>
		<div class="mb-4 d-flex justify-content-between lang-switch" @click="switchLanguage('sk')">
			<p class="text-undertitle d-flex align-items-center">
				<FlagSK />
				<span class="mx-1">
					{{ $t('message.Slovak') }}
				</span>
				<i class="pi pi-check" v-if="language === 'sk'"></i>
			</p>
		</div>
	</div>
</template>
 
 
<script>
	import FlagGB from '../Main/Stats/Vectors/FlagGB.vue';
	import FlagSK from '../Main/Stats/Vectors/FlagSK.vue';
	
	export default {
		props: {
			auth: Boolean
		},
		methods: {
			switchLanguage(lang) {
				const currentPath = this.$route.path
				this.$router.push('/' + lang + currentPath.substring(3));
				this.$i18n.locale = lang;
				localStorage.setItem('lang', lang)
				if ( !this.auth ) {
					this.$router.push({ name: 'my-board' })
				}
			}
		},
		computed: {
			language() {
				return this.$i18n.locale
			}
		},
		components: { FlagGB, FlagSK },
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