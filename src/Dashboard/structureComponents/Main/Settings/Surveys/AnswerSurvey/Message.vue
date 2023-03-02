<template>
    <Card class="card">
        <template #content>
            <h4 class="text-center">
                <i class="bi bi-exclamation-triangle-fill"></i>
                <span class="mx-3">{{ message }}</span >
                <i class="bi bi-exclamation-triangle-fill"></i>
            </h4>
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
    color: var(--orange-400);
}
</style>