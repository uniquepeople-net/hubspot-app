<template>
	<div class="mb-5">
		<div v-for="method in methods" :key="method.key" class="my-3 methods-wrapper app-card" @click="choosedMethod">
			
				<label :for="method.key" class="me-2 w-100 d-flex label-wrapper">
					<i v-if="method.key !== 'google'" :class="`${method.icon} me-3`"></i>
					<GooglePayMark v-if="method.key === 'google'"/>
					<span>{{ method.name }}</span>
				</label>
			
				<RadioButton v-model="selectedMethod" :inputId="method.key" name="pizza" :value="method.key" class="me-3 check-radio"/>
		</div>
	</div>
</template>
 
 
<script>
	import RadioButton from 'primevue/radiobutton'
	import GooglePayMark from '../../../global/GooglePayMark.vue'
	import CircleCheckFilled from '../Stats/Vectors/CircleCheckFilled.vue'
	import CircleBorder from '../Stats/Vectors/CircleBorder.vue'

	export default {
		props: [ 'changeProduct' ],
		data() {
			return {
				selectedMethod: /* 'card' */'',
				methods: [
					{ name: this.$i18n.t('message.CreditDebitCard'), key: 'card', icon: 'bi bi-credit-card-2-back' },
					{ name: 'Google Pay', key: 'google', icon: 'bi bi-google' },
					//{ name: 'Apple Pay', key: 'apple', icon: 'bi bi-apple' },
				]
			}
		},
		methods: {
			choosedMethod() {
				this.$emit('choosedMethod', this.selectedMethod)
			},
		},
		watch: {
			changeProduct(data) {
				this.selectedMethod = data
			}
		},
		components: { RadioButton, GooglePayMark, CircleCheckFilled, CircleBorder }
	}
</script>
 
 
<style lang='scss' scoped>
.methods-wrapper {
	display: flex;
	justify-content: space-between;
	align-items: center;
	//box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
	cursor: pointer;
	.check-radio {
		:deep(.p-radiobutton-box.p-highlight) {
			border-color: var(--main-dark);
			background: var(--main-dark);
		}
		:deep(.p-radiobutton-box:not(.p-disabled):not(.p-highlight):hover) {
			border-color: var(--main-dark);
		}
	}
	.label-wrapper {
		padding: .5rem .5rem;
		cursor: pointer;
		display: flex;
		align-items: center;
		i {
			font-size: 30px;
			margin-left: 10px;
		}
	}
	label {
		flex: 1;
	}
}
</style>