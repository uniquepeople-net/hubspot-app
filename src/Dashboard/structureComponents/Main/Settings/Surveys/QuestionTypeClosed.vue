<template>
	<div class="select-question">
		<div class="row my-4 mx-auto">
			<div class="col-12 col-lg-6">
				<span class="p-float-label">
					<InputText id="value1" v-model="options[0]" />
					<label for="value1">Value "true"</label>
				</span>
			</div>

			<div class="col-12 col-lg-6 mt-4 mt-lg-0">
				<span class="p-float-label">
					<InputText id="value2" v-model="options[1]" />
					<label for="value2">Value "false"</label>
				</span>
			</div>

			<SelectButton v-model="valueDefault" :options="options" aria-labelledby="single" class="mt-4"/>
		</div>
	</div>
</template>
 

<script>
	import SelectButton from 'primevue/selectbutton';

	export default {
		data() {
			return {
				valueDefault: '',
				options: ['', ''],
			}
		},
		methods: {
 
		},
		components: { SelectButton }
	}
</script>
 
 
<style lang='scss' scoped>
.select-question {
	.row {
		max-width: 576px;
	}
}
</style>