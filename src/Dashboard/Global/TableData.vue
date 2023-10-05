<template>
	<div>
		<table class="table table-striped">
			<thead class="thead-dark">
				<tr>
					<th class="text-center" v-for="label in labels">{{ label }}</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(product, index) in list">
					<td v-for="(item, index) in data">{{ getData(product, item) }}</td>
					<td class="edit" @click="update(product)">
						<Pen />
					</td>
					<td class="delete" @click="remove(product)">
						<Trash />
					</td>
				</tr>
			</tbody>
		</table>
		<div class="center-center">
			<Button icon="pi pi-plus" severity="success" text raised rounded aria-label="Add" @click="add">
				<Plus />
			</Button>
		</div>
	</div>
</template>
 
 
<script>
import _ from 'lodash'
import Pen from './Vectors/Pen.vue'
import Trash from './Vectors/Trash.vue'
import Plus from './Vectors/Plus.vue'

export default {
	props: {
		labels: Array,
		list: Array,
		data: Array,
	},
	data() {
		return {
		}
	},
	methods: {
		getData( obj, item ) {
			return _.get( obj, item )
		},
		update(data) {
			this.$emit('update', data)
		},
		remove(data) {
			this.$emit('remove', data)
		},
		add() {
			this.$emit('add', null)
		}
	},
	components: { Pen, Trash, Plus }
}
</script>
 
 
<style lang='scss' scoped>
.bi-trash3 {
	fill: rgb(255, 84, 84);
}
.edit, .delete {
	text-align: center;
	cursor: pointer;
}
</style>