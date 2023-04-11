<template>
	<div class="d-flex align-items-center flex-column mt-5">
        
		<a href="https://ufp.sk">
            <img class="img-ufp" src="https://ufp.sk/wp-content/uploads/2020/04/cropped-ikona-192x192.png" alt="">
        </a>
        
		<Card class="card mt-5 text-center">
			<template #content>
				<i class="bi bi-check2-circle"></i>
				<div v-if="survey">{{ survey.advanced.success_message }}</div>
			</template>
		</Card>
        
    </div>
</template>
 
 
<script>
	import { mapGetters } from 'vuex'

	export default {
		data() {
			return {
			}
		},
		methods: {
			
		},
		computed: {
			...mapGetters({ survey: 'surveys/specificSurveyBySlug' }),
		}
	}
</script>
 
 
<style lang='scss' scoped>
.img-ufp {
    max-width: 120px;
}
.card {
	width: 90%;
	max-width: 1400px;
	.bi-check2-circle {
		font-size: 4rem;
		color: var(--green-600);
	}
}
</style>