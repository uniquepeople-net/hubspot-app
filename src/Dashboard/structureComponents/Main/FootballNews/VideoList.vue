<template>
    <div>
		<span>{{app}}</span>
        <span v-for="( video, index ) in videoData">
            <h5 class="mt-4">{{ video[0].competition.name }}</h5>
            
            <p v-for="match in video">
                <span class="match-link" @click="handleClick(match, $event)">
                    {{ match.title + ' (' + matchDate(match.date) + ')' }}
                </span>
            </p> 
		    
            <!-- <video-player
                src="/your-path/video.mp4"
                poster="/your-path/poster.jpg"
                controls
                :loop="true"
                :volume="0.6"
            /> -->
            
        </span>

        <Dialog v-model:visible="visibleDialog" modal :header="title" :style="{ minWidth: '360px', width: '50vw'}" class="video-dialog">
            <EmbedVideo :embed="embed"/>
        </Dialog>

    </div>
</template>
 
 
<script>
    import EmbedVideo from './EmbedVideo.vue'
    /* import { VideoPlayer } from '@videojs-player/vue'
    import 'video.js/dist/video-js.css' */

    export default {
        created() {

            axios.get( 'https://free-football-soccer-videos.p.rapidapi.com/', {
				headers: {
                    'X-RapidAPI-Key': '4a92dc9d40mshd58c6b154847142p166715jsnbd94a2bb7cc1',
                    'X-RapidAPI-Host': 'free-football-soccer-videos.p.rapidapi.com'
                }
			}).then(
				resp => {
					this.videoData = resp.data

					// Sort data by competition id
                    this.videoData.sort( (a, b) => {
                        return a.competition.id - b.competition.id
                    })
                    
					// Create in object arrays of matches with same id 
					const result = Object.values(this.videoData.reduce((acc, obj) => {
                        const id = obj.competition.id;
                        if (acc[id]) {
							acc[id].push(obj);
                        } else {
							acc[id] = [obj];
                        }
                        return acc;
                    }, {}));

					// Sort arrays in result based on the "date" value in each array
					const sortedResult = {};
					const sortedArrayKeys = Object.keys(result).sort((a, b) => {
						const maxDateA = new Date(Math.max(...result[a].map(obj => new Date(obj.date))));
						const maxDateB = new Date(Math.max(...result[b].map(obj => new Date(obj.date))));
						
						return maxDateB - maxDateA;
					});

					sortedArrayKeys.forEach( (key, index) => {
						sortedResult[index] = result[key];
					});

					this.videoData = sortedResult
				}				
			).catch( error => {
				Toast.fire({
					icon: 'error',
					timer: 4000,
					title: "Unable to register user"
				})
			})
        },  
        data() {
            return {
                videoData: [],
                visibleDialog: false,
                embed: null,
                title: null,
				app: process.env.VUE_APP_URL
            }
        },
        methods: {
            handleClick( data, event ) {
                this.visibleDialog = true
                this.embed = data.videos[0].embed
                this.title = data.title
            },
            matchDate(dateString) {
                const date = new Date(dateString);
                const formattedDate = date.toLocaleDateString("sk-SK", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric"
                });
                return formattedDate
            }
        },
        components: { EmbedVideo }
    }
</script>
 
 
<style lang='scss' scoped>
.match-link {
    cursor:pointer;
}
.video-dialog {
    .p-dialog {
        min-width: 768px;
    }
}
</style>