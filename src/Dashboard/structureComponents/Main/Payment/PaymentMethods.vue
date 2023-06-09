<template>
	<div class="mb-5">
		<h6 class="mb-4">{{ $t('message.Choose') + ' ' + $t('message.PaymentMethod') + ':' }}</h6>
		<div v-for="method in methods" :key="method.key" class="my-3 methods-wrapper">
			
				
				<label :for="method.key" class="me-2 w-100 d-flex label-wrapper">
					<i v-if="method.key !== 'google'" :class="`${method.icon} me-3`"></i>
					<GooglePayMark v-if="method.key === 'google'"/>
					<span>{{ method.name }}</span>
				</label>
			
			<RadioButton v-model="selectedMethod" :inputId="method.key" name="pizza" :value="method.key" class="me-3"/>
		</div>

		<div class="d-flex justify-content-center">
			<Button :label="$t('message.Continue')" severity="success" text raised class="mt-5 mx-auto" 
					@click="choosedMethod"/>
		</div>
		
	</div>
</template>
 
 
<script>
	import RadioButton from 'primevue/radiobutton'
	import GooglePayMark from '../../../global/GooglePayMark.vue'

	export default {
		data() {
			return {
				selectedMethod: 'card',
				methods: [
					{ name: this.$i18n.t('message.CreditDebitCard'), key: 'card', icon: 'bi bi-credit-card-2-back' },
					{ name: 'Google Pay', key: 'google', icon: 'bi bi-google' },
					/* { name: 'Apple Pay', key: 'apple', icon: 'bi bi-apple' }, */
				]
			}
		},
		methods: {
			choosedMethod() {
				this.$emit('choosedMethod', this.selectedMethod)
			}
		},
		components: { RadioButton, GooglePayMark }
	}
</script>
 
 
<style lang='scss' scoped>
.methods-wrapper {
	display: flex;
	justify-content: space-between;
	align-items: center;
	box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
	cursor: pointer;
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