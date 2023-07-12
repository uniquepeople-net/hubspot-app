<template>
	<Card class="card">
		<template #title>
			<h5 class="card-header d-flex justify-content-between align-items-center">
				{{ $t('message.Templates') }}
				<Button icon="bi bi-plus-lg" class="p-button-success p-button-outlined" />
			</h5>
		</template>
		<template #content>
			<div v-for="(template, index) in templates" class="d-flex justify-content-between align-items-center">
				<span class="me-5">{{ template.title }}</span> 
				<span class="d-flex align-items-center">
					{{$t('message.AddTo')}}
					<div class="d-flex flex-column">
						<Button :label="$t('message.Start')" severity="secondary" link @click="prepend(template.content)" />
						<Button :label="$t('message.End')" severity="secondary" link @click="append(template.content)"/>
					</div>
				</span>
			</div>
			<Divider />
			<!-- <div v-for="(dynamic, index) in dynamicArr" class="my-2 d-flex">
				<Dropdown v-model="dynamic.data" :options="dynamicData" :key="index"
						optionLabel="name" optionValue="value" placeholder="Select an Value" 
						:class="`dynamic-dropdown ${submitted && !dynamic.data && 'p-invalid' }`"/>
				<InputText id="value" v-model="dynamic.value" :class="`ms-1 dynamic-input ${submitted && !dynamic.value && 'p-invalid'}`"
						name="value" placeholder="Value" />
				<Button icon="bi bi-dash-lg" class="p-button-rounded p-button-danger p-button-text remove-btn" 
						@click="removeItem(index)"/>
			</div> -->
		</template>
	</Card>
</template>
 
 
<script>
	import { mapGetters } from 'vuex'

	export default {
		created() {
			this.$store.dispatch("emails/getTemplates");
		},
		data() {
			return {
			}
		},
		methods: {
			prepend(data) {
				this.$emit( 'prependTemplate', data )
			},
			append(data) {
				this.$emit( 'appendTemplate', data )
			}
		},
		computed: {
			...mapGetters({ templates: 'emails/templates' })
		}
	}
</script>
 
 
<style lang='scss' scoped>
</style>