<template>
  <video class="video" :width="width" :height="height" 
  		 ref="videoPlayer" controls="true" preload="auto">
    <source :src="src" type="video/mp4"/>
    Your browser does not support the video tag.
  </video>
</template>

<script>
export default {
	name: "App",
	props: [ 'src', 'width', 'height', 'poster' ],
}
</script>

<style lang='scss' scoped>
.video {
	width: 100%;
	max-width: 100%;
	height: auto;
}
</style>