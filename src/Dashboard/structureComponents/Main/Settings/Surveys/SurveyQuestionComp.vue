<template>
	<div :class="`row pb-3 ${ index % 2 == 0 ? 'bgGrey' : 'bgBlue' }`">
		<div class="inputgroup my-3 col-12 col-lg-6">			
			<span class="p-inputgroup-addon">
				{{ questionNum() }}
			</span>
			<InputText id="title" v-model="v$.title.$model" :class="{'p-invalid':v$.title.$invalid && submitted}" 
						name="title" :placeholder="'Question ' + questionNum()" :change="handleQuestionTitle()"/>
		
			<InputError :validator="v$.title" :submitted="submitted" replace="Question"></InputError>
		</div>

		<div class="inputgroup my-3 col-11 col-lg-5">
			<InputIcon icon="bi bi-justify"></InputIcon>
			<Dropdown v-model="type" :options="types" optionLabel="type" optionValue="id" 
					  placeholder="Select a Type" @change="selectType" />
			
			<InputError :validator="v$.type" :submitted="submitted" replace="Type"></InputError>
		</div>

		<div class="my-3 col-1 trash">
			<i class="bi bi-trash" @click="deleteItem(qId)"></i>
		</div>

		<QuestionType v-if="questionType" :type="type" :qId="qId" :question="question ? question : null"/>
	</div>
</template>
 
 
<script>
	import { debounce } from 'lodash';
	import { required, minLength, maxLength } from "@vuelidate/validators";
	import { useVuelidate } from "@vuelidate/core";
	import QuestionType from './QuestionType.vue';

	export default {
		props: {
			types: Object,
			qId: String,
			index: Number,
			submitted: Boolean,
			question: Object
		},
		mounted() {
			if ( this.question ) {
				this.title = this.question.title
				this.type = this.question.type_id
				this.questionType = true
			}			
		},
		setup: () => ({ v$: useVuelidate() }),
		data() {
			return {
				title: '',
				type: null,
				questionType: false,
			}
		},
		validations() {
			return {
				title: { required, minLength: minLength(3), maxLength: maxLength(255) },
				type: { required },
			}
		},
		methods: {
			deleteItem() {
				this.$emit('deleteItem', this.qId)
			},
			selectType() {
				this.questionType = true;
			},
			questionNum() {
				return (this.index + 1).toString()
			},
			handleQuestionTitle() {	
				this.updateValue()
			},
			updateValue: debounce(function () {
				this.$store.dispatch("surveys/setNewSurvey", { title: this.title, type: this.type, qId: this.qId })
			}, 100),

		},
		components: { QuestionType }
	}
</script>
 
 
<style lang='scss' scoped>
.inputgroup {
	position: relative;
	display: flex;
	& span.error-msg {
		position: absolute;
		bottom: -60%;
	}
	& > .p-button {
		border-radius: 0 4px 4px 0;
	} 
	:deep(.p-dropdown) {
		width: 100%;
	}
	:deep(.p-inputtext), :deep(.p-dropdown) {
		border-radius: 0 6px 6px 0;
	}
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
.bgGrey {
	background: var(--green-50);
}
.bgBlue {
	background: var(--yellow-50);
}
</style>