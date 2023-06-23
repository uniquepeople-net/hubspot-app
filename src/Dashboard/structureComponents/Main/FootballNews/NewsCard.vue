<template>
	<div class="news-card mt-4 mx-3 mx-lg-auto">
		<Card class="card" v-if="redditNews">
			<template #title>
				<div class="card-header"><h5>{{ $t('message.GlobalNews') }}</h5></div>
			</template>
			<template #content>
				<ul class="list">
					<li v-for="(news, index) in newestNews" :key="news.data.id">
						<span class="ms-3 fw-light d-block text-end">{{ timeBeforePosted(news.data.created_utc) }}  ago</span>
						{{news.data.title}}
					</li>
				</ul>
			</template>
		</Card>
		<LoadingIcon v-if="!redditNews"/>
	</div>
</template>
 
 
<script>
	import { mapGetters } from 'vuex'
	import LoadingIcon from '../../../global/LoadingIcon.vue';

	export default {
	components: { LoadingIcon },
		created() {
			this.$store.dispatch("news/getRedditNews", 'new');
		},
		mounted() {
			//this.translateText()
		},
		data() {
			return {
			}
		},
		methods: {
			timeBeforePosted(time) {				
				return Helpers.timeBeforePosted(time)
			},
			async translateText() {
				try {
					const response = await axios.post(
						'https://api.openai.com/v1/chat/completions',
						{
							model: "gpt-3.5-turbo",
  							messages: [
								{role: "user", content: "TRanslate to slovak: [Romano] Brighton will insist for Levi Colwill this week after £30m bid rejected. There are more clubs interested. Chelsea's position remains clear: keep the player, offer him new deal. ￼ #CFC Blues hope Koulibaly exit can help Colwill to get guarantees on game time and sign new deal."}, 
								//{role: "system", content: "Hello world"}
							],
						},
						{
							headers: {
								'Content-Type': 'application/json',
								'Authorization': 'Bearer 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', // Replace with your actual API key
							},
						}
					);
					console.log(response/* , completion.data.choices[0].message */)
				} catch (error) {
					console.error(error);
				}
			},
		},
		computed: {
			...mapGetters({ redditNews: 'news/redditNews' }),
			newestNews() {
				return this.redditNews.slice(0, 3)
			}			
		},
	}
</script>
 
 
<style lang='scss' scoped>
.list {
	padding: 0;
	li {
		list-style: none;
		margin-bottom: 1.2rem;
		font-size: .9rem;
	}
}
.news-card {
	max-width: 992px;
	margin: 3rem auto;
}
</style>