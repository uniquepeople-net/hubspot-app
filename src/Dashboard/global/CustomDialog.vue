<template>
	<Dialog v-model:visible="visible" :breakpoints="{ '960px': '80vw' }" :style="{ width: '30vw' }" 
				position="center" modal :dismissableMask="true" :closable="false" class="custom-dialog"
				:showHeader="false" @hide="hideDialog">
		
		<span class="warn-icon center-center">
			<Warning class="icon" v-if="response.error"/>
			<Check class="icon" v-if="response.message"/>
		</span>
		
		<template #footer>
			<h5 v-if="response.message" class="mt-3 text-message">{{ response.message }}</h5>
			<h6 v-if="response.error" v-for="(error, key) in response.error" class="mt-3 text-message">
				{{ error[0].replace('validation.', '') }}
			</h6>
			<h5 class="mt-4 text-message">{{ primaryText }}</h5>
			<h5 class="mt-4 text-message">{{ secondaryText }}</h5>
			<div class="center-center mt-4">
				<Button v-if="btnLabel" :label="btnLabel" @click="redirectRoute" class="btn-black dialog-btn"/>
			</div>
		</template>

	</Dialog>
</template>
 
 
<script>
	import Check from '../Structure/Main/Stats/Vectors/Check.vue'
	import Warning from '../Structure/Main/Stats/Vectors/Warning.vue'
	
	export default {
		props: {
			visible: Boolean,
			response: Object,
			primaryText: String,
			secondaryText: String,
			btnLabel: String,
			routeName: String
		},
		methods: {
			hideDialog() {
				this.$emit('hideDialog', false)	
			},
			redirectRoute() {
				this.$router.push({ name: this.routeName })
			}
		},
		components: { Warning, Check }
	}
</script>
 
 
<style lang='scss' scoped>
.custom-dialog {
	position: absolute;
	:deep(.p-dialog-header) {
		padding: 0;
	} 
	.warn-icon {
		background: var(--main-white);
		border-radius: 50%;
		width: 50px;
		height: 50px;
		position: absolute;
		top: -25px;
		left: 0; 
		right: 0; 
		margin-left: auto; 
		margin-right: auto;
		.icon {
			width: 25px;
			height: 25px;
		} 
	}
	.dialog-btn {
		width: 100%;
		max-width: 20rem;
		margin: 0;
	}
}
</style>