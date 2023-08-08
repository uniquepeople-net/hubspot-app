<template>
    <Card class="card">
        <template #content>
            <h4 class="text-center">
                <i class="d-block bi bi-exclamation-triangle-fill mb-4"></i>
                <span class="mx-3">{{ message }}</span >
                <!-- <i class="d-block bi bi-exclamation-triangle-fill mt-4"></i> -->
            </h4>
			<div class="d-flex justify-content-center mt-5">
				<slot name="button"></slot>
			</div>
        </template>
    </Card>
</template>
 
 
<script>
    export default {
        props: ['message'],
        data() {
            return {
            }
        },
        methods: {
 
        },
    }
</script>
 
 
<style lang='scss' scoped>
.card {
    padding: 2rem;
    margin: 2rem;
}
.bi-exclamation-triangle-fill {
	font-size: 3rem;
    color: var(--orange-400);
}
</style>