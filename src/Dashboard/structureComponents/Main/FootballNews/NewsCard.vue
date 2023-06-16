<template>
	<div>
		<Card class="card mx-3" v-if="redditNews">
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
		data() {
			return {
			}
		},
		methods: {
			timeBeforePosted(time) {				
				return Helpers.timeBeforePosted(time)
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
</style>