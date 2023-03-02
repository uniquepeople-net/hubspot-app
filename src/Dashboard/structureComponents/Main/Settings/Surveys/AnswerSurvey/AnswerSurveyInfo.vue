<template>
    <div class="d-flex align-items-center flex-column mt-5">
        <a href="https://ufp.sk">
            <img class="img-ufp" src="https://ufp.sk/wp-content/uploads/2020/04/cropped-ikona-192x192.png" alt="">
        </a>
        
        <div class="mt-4 text-center">
            <h4>{{ survey.name }}</h4>
            <h3>{{  decodedHash(hash)  }}</h3>
        </div>
    </div>
</template>
 
 
<script>
export default {
    props: {
        survey: Object,
        hash: String
    },
    data() {
        return {
        }
    },
    methods: {
        decodedHash(hash) {
            return hash ? Helpers.decryptAes(hash, 'ufp') : null
        }
    },
}
</script>
 
 
<style lang='scss' scoped>
.img-ufp {
    max-width: 120px;
}
</style>