<template>
	<div>
		<span class="p-input-icon-left w-100 search-player">
			<i v-if="!loading" class="pi pi-search" />
			<i v-if="loading" class="pi pi-spin pi-spinner" />
			<InputText v-model="value" :placeholder="$t('message.SearchPlayer').toUpperCase()" class="input w-100" 
					   @update:modelValue="checkValue"/>
		</span>

		<div v-if="showSearched && Array.isArray(searched) && searched.length > 0">
			<SearchedItem v-if="searched && searched !== 'empty'" v-for="item in searched" :imgSrc="item.imageDataURL"
						  :name="item.firstName + ' ' + item.lastName" :team="item.currentTeam ? item.currentTeam.officialName : ''" 
						  :imgSrcClub="item.currentTeam ? item.currentTeam.imageDataURL : null"  @click="addPlayer(item)"/>
		</div>
		<p v-if="searched === 'empty'" class="text-center mt-3 mb-0">{{ $t('message.NoSearched') }}</p>
	</div>
</template>
 
 
<script>
	import { debounce } from 'lodash';
	import SearchedItem from './SearchedItem.vue'
	import { mapGetters } from 'vuex';

	export default {
		props: ['storeAction', 'storeData', 'type'],
		data() {
			return {
				value: null,
				loading: false,
				showSearched: true
			}
		},
		methods: {
			checkValue(event) {
				if ( event.length >= 3 ) {
					this.updateValue()
					this.showSearched = true
					this.loading = true
				} else {
					this.loading = false
				}
			},
			updateValue: debounce(function () {
				this.$store.dispatch( "stats/" + this.storeAction, { phrase: this.value, type: this.type }  )
			}, 500),
			addPlayer(item) {
				this.showSearched = false
				this.$emit('addPlayer', item)
			}
		},
		computed: {
			searched() {
				return this.$store.getters['stats/' + this.type + 'Searched' ]
			}
		},
		watch: {
			searched: function(data) {
				this.loading = false
			} 
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