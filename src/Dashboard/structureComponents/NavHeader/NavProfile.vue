<template>
	<div class="dropdown">
		<a href="#" data-bs-toggle="dropdown" aria-expanded="false" @click="toggle" aria-haspopup="true" aria-controls="overlay_menu">
			<div class="user-menu d-flex flex-column align-items-center">
				<div class="user-name">
					<small class="mb-0 text-gray-600">{{ playerDetails ? playerDetails.shortName : user.surname }}</small>
				</div>
				<div class="user-img d-flex align-items-center">
					<div class="avatar avatar-md">
						<img v-if="!playerDetails" src="../../../../assets/images/ndplayer_100x130.png" />
						<img v-if="playerDetails" :src="playerDetails.imageDataURL" />
					</div>
				</div>
			</div>
		</a>
		<Menu id="overlay_menu" ref="menu" :model="items" :popup="true" class="mt-2 menu-profile">
			<template #item="{item}">
				<router-link :to="item.to">
					<div :class="`p-menuitem-link ${item.notice ? 'pb-0' : ''}`">
						<div class="d-flex flex-column">
							<span class="text-data">{{ item.label }}</span>
							<span class="text-sm-notice menuitem-notice" v-if="item.notice">{{item.notice}}</span>
						</div>
						<i :class="item.icon"></i>
					</div>
				</router-link>
			</template>
		</Menu>
	</div>
</template>
 
 
<script>
	import { mapGetters } from 'vuex';
	import {loadStripe} from '@stripe/stripe-js';
	//import { i18n } from '../../../plugins/vuelidate-i18n'

	export default {
		methods: {
			toggle(event) {
				this.$refs.menu.toggle(event);
			},
		},
		computed: {
			...mapGetters({ user: 'user/user',
							playerDetails: 'stats/playerDetails' }),
			items(){
				return [                   
                    {
                        label: this.$i18n.t("message.Profile"),
                        icon: 'pi pi-angle-right',
						to:	{ name: 'my-profile' },
						notice: this.$i18n.t("message.ProfileNotice"),
                    },
					{
						separator: true,
					},
                    {
                        label: this.$i18n.t("message.Payments"),
                        icon: 'pi pi-angle-right',
						to: { name: 'wallet-info' },
						notice: this.$i18n.t("message.PaymentsNotice"),
                        command: () => {
                            //this.$toast.add({ severity: 'warn', summary: 'Delete', detail: 'Data Deleted', life: 3000});
                        }
                    },
					{
						separator: true,
					},
                    /* {
                        label: this.$i18n.t("message.Notifications"),
                        icon: 'pi pi-angle-right',
						//to: { name: 'wallet-info' },
						notice: this.$i18n.t("message.NotificationsNotice"),
                        command: () => {
                            //this.$toast.add({ severity: 'warn', summary: 'Delete', detail: 'Data Deleted', life: 3000});
                        }
                    },
					{
						separator: true,
					}, */
                    {
                        label: this.$i18n.t("message.Change") + ' ' + this.$i18n.t("message.Language"),
                        icon: 'pi pi-angle-right',
						to: { name: 'languages' },
						notice: this.$i18n.t("message.LanguageNotice"),
                        command: () => {
                            //this.$toast.add({ severity: 'warn', summary: 'Delete', detail: 'Data Deleted', life: 3000});
                        }
                    },
					{
						separator: true,
					},
					{
                        label: this.$i18n.t("message.Logout"),
                        icon: 'pi pi-angle-right',
                        to: { name: 'logout' },
						//notice: this.$i18n.t("message.LogoutNotice")
						/* style: {
							background: '#fa9c9c',
						} */
                    }
				]
			}

		},
	}
</script>
 
 
<style lang='scss'>
.avatar-md {
	img {
		width: 50px;
		height: 50px;
		border-radius: 50%;
	}
}
.p-menu.menu-profile {
	width: auto;
	padding: 0;
	.p-menuitem-separator {
		margin: 0;
	}
	.p-menuitem {
		background: var(--main-white);
		.p-menuitem-content {
			padding-bottom: .25rem;
			background: var(--main-white);
		}
		.p-menuitem-link {
			display: flex;
			justify-content: space-between;
		}
	}
	.menuitem-notice {
		padding-right: 2rem;
		color: var(--text-light-color);
	}
}

</style>