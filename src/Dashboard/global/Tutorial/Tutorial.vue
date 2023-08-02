<template>
	<div>
		<div class="tutorial-wrapper position-relative" v-if="user">
			<BackButton class="back-button" @click="prevTab" v-if="active !== 0"/>
			<p class="skip-link text-link" @click="completeTutorial">{{ $t('message.Skip') }}</p>
			<TabView class="tutorial-steps" v-model:activeIndex="active" ref="tabview">
				<TabPanel v-for="(tab, index) in tabs" :key="index">
					<template #header>
						<CircleFull v-if="active >= index" />
						<CircleBorder v-if="active < index" />
					</template>
					<TutorialPage>
						<template v-slot:vector>
							<component :is="tab.vector"/>
						</template>
						<template v-slot:title>
							<h2 class="text-gt-bold mt-5 mb-4">{{tab.title}}</h2>
						</template>
						<template v-slot:description>
							<p class="">{{tab.description}}</p>
						</template>
						<template v-slot:vector2 v-if="index === 0">
							<div class="wyscout-logo center-center">
								<Wyscout />
							</div>
						</template>
					</TutorialPage>
				</TabPanel>
			</TabView>
			<Button label="Next" class="btn-black mb-5" @click="nextTab"/>
		</div>
		<LoadingIcon v-if="!user"/>
	</div>
</template>
 
 
<script>
	import { mapGetters } from 'vuex'
	import TabView from 'primevue/tabview';
	import TabPanel from 'primevue/tabpanel';
	import CircleBorder from '../../structureComponents/Main/Stats/Vectors/CircleBorder.vue';
	import CircleFull from '../../structureComponents/Main/Stats/Vectors/CircleFull.vue';
	import TutorialPage from './TutorialPage.vue';
	import ReviewStats from '../../structureComponents/Main/Stats/Vectors/ReviewStats.vue'
	import News from '../../structureComponents/Main/Stats/Vectors/News.vue'
	import Connection from '../../structureComponents/Main/Stats/Vectors/Connection.vue'
	import Payment from '../../structureComponents/Main/Stats/Vectors/Payment.vue'
	import Surveys from '../../structureComponents/Main/Stats/Vectors/Surveys.vue'
	import Wyscout from '../../structureComponents/Main/Stats/Vectors/Wyscout.vue'
	import BackButton from '../BackButton.vue';
	import LoadingIcon from '../LoadingIcon.vue';

	export default {
		created() {
			this.$store.dispatch("user/getUser");
		},
		mounted() {
			this.tabsCount = this.$refs.tabview.tabs.length
		},
		data() {
			return {
				tabsCount: 0, 
				active: 0,
				tabs: [
					{ vector: 'ReviewStats', title: this.$i18n.t('message.ReviewAll'), description: this.$i18n.t('message.ReviewAlldesc') },
					{ vector: 'News', title: this.$i18n.t('message.Allthenews'), description: this.$i18n.t('message.Allthenewsdesc') },
					{ vector: 'Connection', title: this.$i18n.t('message.FastConnection'), description: this.$i18n.t('message.FastConnectionDesc') },
					{ vector: 'Payment', title: this.$i18n.t('message.SimplePayment'), description: this.$i18n.t('message.SimplePaymentDesc') },
					{ vector: 'Surveys', title: this.$i18n.t('message.SurveysInvolved'), description: this.$i18n.t('message.SurveysInvolvedDesc') },
				]
			}
		},
		methods: {
			nextTab() {
				this.active = this.active < this.tabsCount ? this.active + 1 : this.active
				if ( this.active === this.tabsCount ) {
					this.completeTutorial()
				}
			},
			prevTab() {
				this.active = this.active > 0 ? this.active - 1 : this.active
			},
			completeTutorial() {
				this.updateFirstLogin()
				this.$router.push({ name: 'checkout' })
			},
			updateFirstLogin() {
				
				axios.post( this.updateFirstLoginLink + this.user.id, { first_login: false }, {
					headers: {
						Authorization: 'Bearer ' + User.getToken()
					}
				}).then( response => {
					return true
				}).catch( error => {
					Toast.fire({
						icon: 'error',
						title: 'Unable to update (first login) user data'
					})
				})
			}
		},
		computed: {
			...mapGetters({ updateFirstLoginLink: 'links/updateFirstLogin',
							user: 'user/user' })
		},
		components: { TabView, TabPanel, CircleBorder, CircleFull, TutorialPage, Wyscout,
					  ReviewStats, News, Connection, Payment, Surveys, BackButton, LoadingIcon }
	}
</script>
 
 
<style lang='scss' scoped>
.tutorial-wrapper {
	width: 100vw;
	height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	.skip-link {
		position: absolute;
		top: 1.5rem;
		right: 1.5rem;
		cursor: pointer;
	}
	.back-button {
		position: absolute;
		left: 1.5rem;
		top: 1.5rem;
	}
	.tutorial-steps {
		display: flex;
		flex-direction: column-reverse;
		max-width: 576px;
		height: 100%;
		align-items: end;
		.wyscout-logo {
			margin-top: 3rem;
		}
		:deep(.p-tabview-nav-link), :deep(.p-tabview-nav) {
			border: 0;
		}
		:deep(.p-tabview-nav-link:not(.p-disabled):focus) {
			box-shadow: unset;
		}
		:deep(.p-tabview-nav-container) {
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: end;
		}
		:deep(.p-tabview-panels) {
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
}
@media ( min-width: 576px ) {
	.tutorial-wrapper {
		justify-content: center;
		.tutorial-steps {
			height: auto;
		}
	}
}
</style>