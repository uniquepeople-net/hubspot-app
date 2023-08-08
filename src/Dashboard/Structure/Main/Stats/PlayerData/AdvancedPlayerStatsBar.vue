<template>
	<div class="row g-1 my-2">
		<div :class="`col-12 bar bar-dark`">
			<ProgressBar :value="100">
				<span class="ms-2 bar-text">{{ title }}</span><span class="me-2">{{ value }}</span> 
			</ProgressBar>
		</div>
	</div>
</template>
 
 
<script>
	import ProgressBar from 'primevue/progressbar';

	export default {
		props: {
			title: String,
			value: Number
		},
		data() {
			return {
			}
		},
		components: { ProgressBar },
	}
</script>
 
 
<style lang='scss' scoped>
.bar-dark {
	:deep(.p-progressbar-value) {
		background: var(--bluegray-600);
	}
}
.bar {
	:deep(.p-progressbar-value span) {
		.bar-text {
			font-weight: 600;
		}
	}
	:deep(.p-progressbar-label) {
		display: flex;
		width: 100%;
		justify-content: space-between;
	}
}
.title {
	font-size: .8rem;
	text-align: center;
}
:deep(.p-progressbar) {
	border-radius: 100px;
}
@media(min-width: 576px) {
	.title {
		font-size: 1.1rem;
	}
}
</style>