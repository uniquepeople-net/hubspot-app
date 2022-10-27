<template>
	<li class="sidebar-item" :class="hasSub" v-if="permitItem(permissions)">
		<router-link v-if="link" :to="link" class="sidebar-link content-link">
			<i class="bi" :class="icon"></i>
			<span>{{ title }}</span>
		</router-link>
		<div v-if="!link" href="" class="sidebar-link">
			<i class="bi" :class="icon"></i>
			<span>{{ title }}</span>
		</div>
		<ul v-if="hasSub" class="submenu">
			<li v-for="sub in submenu" class="submenu-item">
				<router-link :to="sub.sublink" class="content-link">{{ sub.subtitle }}</router-link>
			</li>                
        </ul>
	</li>
</template>
 
 
<script>
	import { toRaw } from 'vue'

	export default {
		props: ['title', 'icon', 'hasSub', 'submenu', 'link', 'permissions', 'userRoleId'],
		data() {
			return {
			}
		},
		methods: {
			permitItem(roles) {		
				if( roles ) {
					return toRaw(roles).includes(this.userRoleId) ? true : false
				}
				return true
			}
		},
	}
</script>
 
 
<style scope>
</style>