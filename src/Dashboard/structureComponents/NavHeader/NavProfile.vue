<template>
	<div class="dropdown">
		<a href="#" data-bs-toggle="dropdown" aria-expanded="false" @click="toggle" aria-haspopup="true" aria-controls="overlay_menu">
			<div class="user-menu d-flex flex-column align-items-center">
				<div class="user-name">
					<h6 class="mb-0 text-gray-600">{{ user.name }}</h6>
				</div>
				<div class="user-img d-flex align-items-center">
					<div class="avatar avatar-md">
						<img src="../../../../assets/images/faces/2.jpg" />
					</div>
				</div>
			</div>
		</a>
		<Menu id="overlay_menu" ref="menu" :model="items" :popup="true" class="mt-2"/>
	</div>
</template>
 
 
<script>
	import { mapGetters } from 'vuex';

	export default {
		data() {
			return {
				items: [                   
                    {
                        label: 'My Profile',
                        icon: 'pi pi-user-edit',
						to:	'/my-profile'
                    },
                    {
                        label: 'Wallet',
                        icon: 'pi pi-euro',
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
                        to: '/logout',
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
			...mapGetters({ user: 'user/user' }),
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