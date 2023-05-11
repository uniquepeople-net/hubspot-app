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
		<Menu id="overlay_menu" ref="menu" :model="items" :popup="true" class="mt-2 menu-profile"/>
	</div>
</template>
 
 
<script>
	import { mapGetters } from 'vuex';
	import {loadStripe} from '@stripe/stripe-js';

	export default {
		data() {
			return {
				items: [                   
                    {
                        label: 'My Profile',
                        icon: 'pi pi-user-edit',
						to:	{ name: 'my-profile' }
                    },
                    {
                        label: 'Wallet',
                        icon: 'pi pi-euro',
						to: { name: 'wallet-info' },
                        command: () => {
                            //this.$toast.add({ severity: 'warn', summary: 'Delete', detail: 'Data Deleted', life: 3000});
                        }
                    },
					{
						separator: true,
					},
					{
                        label: 'Logout',
                        icon: 'pi pi-sign-out',
                        to: { name: 'logout' },
						/* style: {
							background: '#fa9c9c',
						} */
                    }
				],
			}
		},
		methods: {
			toggle(event) {
				this.$refs.menu.toggle(event);
			},
		},
		computed: {
			...mapGetters({ user: 'user/user',
							playerDetails: 'stats/playerDetails' }),
		},
	}
</script>
 
 
<style lang='scss' scoped>
.avatar-md {
	img {
		width: 50px;
		height: 50px;
		border-radius: 50%;
	}
}
</style>