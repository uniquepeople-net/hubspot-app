<template>
	<div class="timer-wrapper">
		<div>
			<span>Trial</span>&nbsp;
			<span>{{'('}}{{ timer.days}}d</span>&nbsp;
			<span>{{ timer.hours}}h</span>&nbsp;
			<span>{{ timer.minutes}}m</span>&nbsp;
			<span>{{timer.seconds}}s{{')'}}</span>&nbsp;
		</div>
		<!-- <button @click="startTimer">Start</button>
		<button @click="pauseTimer">Pause</button>
		<button @click="resumeTimer">Resume</button> -->
		<!-- <button @click="restartFive">Restart</button> -->
	</div>
</template>

<script>
import { watchEffect, onMounted, ref } from "vue";
import { useTimer } from "vue-timer-hook";

export default {
	props: ['timeInSeconds'],
	created() {
		const time = ref(new Date());
		time.value.setSeconds(time.value.getSeconds() + this.timeInSeconds); // 10 minutes timer
		this.timer = useTimer(time.value);
	},
	data() {
		return {
			timer: null
		}
	},
	methods: {
		pauseTimer() {
			this.timer.pause();
		},
		resumeTimer() {
			this.timer.resume();
		},
		startTimer() {
			this.timer.start();
		},
		restartFive() {
			// Restarts to 5 minutes timer
			const newTime = new Date();
			newTime.setSeconds(newTime.getSeconds() + 300);
			this.timer.restart(newTime);
		}
	}
};
</script>

<style lang="scss" scoped>
.timer-wrapper {
	font-size: .75rem;
	color: var(--cyan-600);
}
</style>
