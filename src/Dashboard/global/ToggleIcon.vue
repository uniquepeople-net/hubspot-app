<template>
	<div>
		<i v-if="dataComp" @click="toggleData" class="bi bi-toggle-on toggle-active"></i>
		<i v-if="!dataComp" @click="toggleData" class="bi bi-toggle-on toggle-inactive"></i>
	</div>
</template>
 
 
<script>
	export default {
		props: ['data'],
		data() {
			return {
				dataComp: this.data
			}
		},
		methods: {
			toggleData() {
				this.dataComp = !this.dataComp
				this.$emit('toggleValue', this.dataComp)
			}

		},
	}
</script>
 
 
<style lang='scss' scoped>
.toggle-active, .toggle-inactive {
	font-size: 1.5rem;
	cursor: pointer;
	display: inline-block;
}
.toggle-active {
	color: var(--green-600);
}
.toggle-inactive {
	transform: rotate(180deg) translateY(-2px);	
	color: var(--red-700);
}
</style>