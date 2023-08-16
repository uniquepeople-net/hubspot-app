<template>
	<div>
		<span class="p-input-icon-left w-100 search-player">
			<i class="pi pi-search" />
			<InputText v-model="value1" :placeholder="$t('message.SearchPlayer').toUpperCase()" class="input w-100"/>
		</span>

		<SearchedItem imgSrc="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ffmdataba.com%2Fimages%2Fp%2F74371.png&f=1&nofb=1&ipt=232ae61d2f58b1c3ca1d46040c62608e0a7a0a9af28545ea459373d3d8d58328&ipo=images"
					  name="Marek Kuzma" position="Forward" />
	</div>
</template>
 
 
<script>
	import SearchedItem from './SearchedItem.vue'

	export default {
		data() {
			return {
			}
		},
		methods: {
			
		},
		components: { SearchedItem },
	}
</script>
 
 
<style lang='scss' scoped>
.search-player {
	.input {
		background: var(--main-white);
		border: 0;
		box-shadow: unset;
		border-radius: 0;
		border-bottom: 1px solid var(--text-light-color);
	}
}
</style>	