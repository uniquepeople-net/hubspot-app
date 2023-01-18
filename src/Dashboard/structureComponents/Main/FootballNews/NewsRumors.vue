<template>
	<Card v-if="redditNews" class="card news-card" v-for="news in redditNews">
		<template #header>
			{{ timeBeforePosted(news.data.created_utc) }}
		</template>
		<template #title>
			<h5>{{ news.data.title }}</h5>
		</template>
	</Card>
</template>
 
 
<script>
	import { mapGetters } from 'vuex'

	export default {
		created() {
			this.$store.dispatch("news/getRedditNews", 'hot');
			console.log(Date.now())
			
		},
		data() {
			return {
				currentTime: Date.now()
			}
		},
		methods: {
			timeBeforePosted(time) {
				
				let currentTime = new Date( Date.now() )
				let date = new Date(time * 1000)
				
				console.log( (currentTime - date) / 1000 / 3600  )

				let diffTime = (currentTime - date) / 1000 / 3600

				if ( diffTime < 1 ) {
					let returnTime = Math.round(returnTime * 100 / 60 ) + 'minutes'
				} else {
					let returnTime = Math.round((currentTime - date) / 1000 / 3600) + 'hours'
				}

				return returnTime
			}
		},
		computed: {
			...mapGetters({ redditNews: 'news/redditNews' })			
		}
	}
</script>
 
 
<style lang='scss' scoped>
.news-card {
	max-width: 768px;
	margin: auto;
	margin-bottom: .2rem;
}
</style>