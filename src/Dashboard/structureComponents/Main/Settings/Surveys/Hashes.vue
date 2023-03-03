<template>
	<div>
		<h5 class="text-center mb-4">Hashes</h5>
		<div>
			<div class="limit my-4">
				<label for="limit">Survey limit for one hash:</label>
				<InputNumber inputId="limit" v-model="limit" showButtons mode="decimal" :max="200"/>
			</div>

			<div class="row gy-2">
				<div v-for="(input, index) in inputs" class="col-12 col-md-6 d-flex align-items-center">
					<InputText v-model="input.value" placeholder="Value" class="d-inline"/>
					
					<Button icon="pi pi-times" class="p-button-rounded p-button-danger p-button-text" @click="removeItem(input.id)"/>
				</div>
			</div>
			
			
			<div class="d-flex my-4 align-items-center">
				<div class="d-flex flex-column add-item">
					<Button icon="bi bi-plus-lg" class="p-button-rounded p-button-success p-button-outlined" 
							@click="addItem"/>
				</div>
				<div class="d-flex flex-column align-items-center">
					<Button icon="bi bi-hash" label="Generate links" 
							class="p-button-outlined p-button-secondary" @click="generateUrl()"/>
				</div>
				
			</div>
			
			<div v-for="( input, index ) in inputs" v-show="showHashes" class="mt-3 generated">
				<div class="row gen-item" v-if="input.value && input.hash">
					<span class="col-auto">{{ decrypt(input.hash, 'ufp') }}</span>
					<span class="col-auto">{{ input.link }}</span>
				</div>
			</div>
		</div>
	</div>
</template>
 
 
<script>
	import uniqueId from 'lodash/uniqueId';
	import InputNumber from 'primevue/inputnumber';

	export default {
		props: [ 'name' ],
		data() {
			return {
				inputs: [],
				hashes: [],
				showHashes: false,
				limit: 25
			}
		},
		methods: {
			addItem() {
				let newObj = { value: '', id: uniqueId(), hash: '', link: ''}
				this.inputs = [...this.inputs, newObj] 
			},
			removeItem(index) {
				this.inputs = this.inputs.filter( q => q.id !== index )
				this.generateUrl()
			},
			encrypt(string, secretKey) {
				return Helpers.encryptAes(string, secretKey)
			},
			decrypt(phrase, secretKey) {
				return Helpers.decryptAes(phrase, secretKey)
			},
			generateUrl() {
				this.showHashes = true
				this.hashes = []
				this.inputs = this.inputs.map( (input , index) => {
					if ( input.value ) {
						let encryptedHash = this.encrypt(input.value, 'ufp')
						this.hashes.push(encryptedHash)
						let url = window.location.origin + '/survey/' + Helpers.stringToSlug(this.name)

						return { ...input, hash: encryptedHash, link: url + '?hash=' + encryptedHash }
					} else {
						return { ...input }
					}
				})

				this.$store.dispatch( "surveys/setHashes", { hashes: this.hashes, limit: this.limit } )
			},
		},
		components: { InputNumber }
	}
</script>
 
 
<style lang='scss' scoped>
.add-item {
	max-width: 8rem;
	margin-right: 2rem;
}
.trash {
	display: flex;
	justify-content: center;
	align-items: center;
	& .bi-trash {
		color: var(--red-700);
		font-size: 1.2rem;
		padding: .3rem .5rem;
		cursor: pointer;
	}
}
.generated:nth-child(odd) {
	.gen-item {
		background: var(--bluegray-50);
	}
}
.limit {
	max-width: 12rem;
}
</style>