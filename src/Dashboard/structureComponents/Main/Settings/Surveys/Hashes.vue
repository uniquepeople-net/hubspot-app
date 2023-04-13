<template>
	<div>
		<h5 class="text-center mb-4">Hashes</h5>
		<div>
			<div class="limit my-4">
				<label for="limit">Survey limit:</label>
				<InputNumber inputId="limit" v-model="limit" showButtons mode="decimal" :max="50" :min="1" :change="handleLimit()"/>
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
				<div class="row gen-item align-items-center" v-if="input.value && input.hash">
					<span class="col-8 col-md-4 col-lg-3 col-xl-2">{{ decrypt(input.hash) }}&nbsp;
						<i class="col-auto bi bi-arrow-right"></i>
					</span>
					<span class="col-auto text-decoration-underline trimmed-url">{{ trimString(input.link, 20, 40) }}</span>
					<Button icon="bi bi-clipboard" severity="secondary" class="copy p-button-secondary p-button-raised p-button-outlined" 
								aria-label="Copy" :label="copyText" @click="copyToClipboard(input.link, $event)" />
				</div>
			</div>

			<div v-if="existedHashes.length">
				<h6 class="mt-3">Existed hashes:</h6>
				<div v-for="( hash, index ) in existedHashes" class="mt-3 generated">
					<div class="row gen-item align-items-center">
						<span class="col-8 col-md-4 col-lg-3 col-xl-2">{{ decrypt(hash.hash) }}&nbsp;
							<i class="bi bi-arrow-right"></i>
						</span>
						<span class="col-auto text-decoration-underline trimmed-url">{{ trimString(hash.link, 20, 40) }}</span>
						<Button icon="bi bi-clipboard" severity="secondary" class="copy p-button-secondary p-button-raised p-button-outlined" 
								aria-label="Copy" :label="copyText" @click="copyToClipboard(hash.link, $event)" />
						<div class="col-1 trash">
							<i class="bi bi-trash" @click="deleteExistedHash(index)"></i>
						</div>
					</div>
				</div>
			</div>

		</div>
	</div>
</template>
 
 
<script>
	import uniqueId from 'lodash/uniqueId';
	import { debounce } from 'lodash';
	import InputNumber from 'primevue/inputnumber';

	export default {
		props: { 
			name: String,
			hashesArr: Array
		},
		mounted() {
			if ( this.hashesArr && this.hashesArr.length ) {
				this.hashesArr.map( h => {
					this.existedHashes.push({
						value: this.decrypt(h.hash),
						id: uniqueId(),
						hash: h.hash,
						link: this.generateExistedUrl(h.hash)
					})
					this.existedHashesArr.push(h.hash)
				})
				this.limit = this.hashesArr[0].max_limit
				this.$store.dispatch( "surveys/setHashes", { hashes: this.hashes, limit: this.limit, existedHashes: this.existedHashesArr } )
			} else {
				this.$store.dispatch( "surveys/setHashes", { hashes: this.hashes, limit: this.limit, existedHashes: this.existedHashesArr } )
			}
		},
		data() {
			return {
				existedHashes: [],
				existedHashesArr: [],
				inputs: [],
				hashes: [],
				showHashes: false,
				limit: 25,
				copyText: 'Copy',
			}
		},
		methods: {
			addItem() {
				if ( (this.inputs.length + this.existedHashesArr.length) < 50 ) {
					let newObj = { value: '', id: uniqueId(), hash: '', link: ''}
					this.inputs = [...this.inputs, newObj] 
				} else {
					return
				}
			},
			removeItem(index) {
				this.inputs = this.inputs.filter( q => q.id !== index )
				this.generateUrl()
			},
			deleteExistedHash(index) {
				this.existedHashes = this.existedHashes.filter( (h, i) => i !== index )
				this.existedHashesArr = []
				this.existedHashes.map( h => this.existedHashesArr.push(h.hash) )
				this.$store.dispatch( "surveys/setHashes", { hashes: this.hashes, limit: this.limit, existedHashes: this.existedHashesArr } )
			},
			handleLimit() {
				this.updateValue()
			},
			updateValue: debounce(function () {
				this.$store.dispatch( "surveys/setHashes", { limit: this.limit } )
			}, 100),
			encrypt(string) {
				return Helpers.encryptAes(string)
			},
			decrypt(phrase) {
				return Helpers.decryptAes(phrase)
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

				this.$store.dispatch( "surveys/setHashes", { hashes: this.hashes, limit: this.limit, existedHashes: this.existedHashesArr } )
			},
			generateExistedUrl(hash) {
				let url = window.location.origin + '/survey/' + Helpers.stringToSlug(this.name) 
				return url + '?hash=' + hash
			},
			copyToClipboard(text, event) {
				this.copiedText(event)
				Helpers.copyToClipboard(text)
			},
			copiedText(event) {
				if ( !event.target.classList.contains('copy') ) {				
						event.target.textContent ='Copied' 
						setTimeout(function() {
							event.target.textContent = 'Copy'
						}, 1000);
				} else {
					event.target.querySelector('.p-button-label').textContent = 'Copied'
					setTimeout(function() {
						event.target.querySelector('.p-button-label').textContent = 'Copy'
					}, 1000);
				}	
			},
			trimString(str, maxLength) {
				return Helpers.trimString(str, maxLength)
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
.copy {
	width:auto;
	padding: .25rem .5rem;
	margin: 0 .5rem;
}
.limit {
	max-width: 7rem;
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
.trimmed-url {
	min-width: 20rem;
}
</style>