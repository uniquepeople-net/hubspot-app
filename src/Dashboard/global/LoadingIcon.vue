<template>
	<div class="loading-icon" v-if="!disapear">
		<svg v-if="!error && !timeout" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: rgb(241, 242, 243, 0); display: block; shape-rendering: auto;" width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
			<g transform="rotate(0 50 50)">
			<rect x="48" y="22.5" rx="2" ry="2.6" width="4" height="13" fill="#a7abae">
				<animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1.2195121951219512s" begin="-1.132404181184669s" repeatCount="indefinite"></animate>
			</rect>
			</g><g transform="rotate(25.714285714285715 50 50)">
			<rect x="48" y="22.5" rx="2" ry="2.6" width="4" height="13" fill="#a7abae">
				<animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1.2195121951219512s" begin="-1.0452961672473868s" repeatCount="indefinite"></animate>
			</rect>
			</g><g transform="rotate(51.42857142857143 50 50)">
			<rect x="48" y="22.5" rx="2" ry="2.6" width="4" height="13" fill="#a7abae">
				<animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1.2195121951219512s" begin="-0.9581881533101045s" repeatCount="indefinite"></animate>
			</rect>
			</g><g transform="rotate(77.14285714285714 50 50)">
			<rect x="48" y="22.5" rx="2" ry="2.6" width="4" height="13" fill="#a7abae">
				<animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1.2195121951219512s" begin="-0.8710801393728222s" repeatCount="indefinite"></animate>
			</rect>
			</g><g transform="rotate(102.85714285714286 50 50)">
			<rect x="48" y="22.5" rx="2" ry="2.6" width="4" height="13" fill="#a7abae">
				<animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1.2195121951219512s" begin="-0.7839721254355401s" repeatCount="indefinite"></animate>
			</rect>
			</g><g transform="rotate(128.57142857142858 50 50)">
			<rect x="48" y="22.5" rx="2" ry="2.6" width="4" height="13" fill="#a7abae">
				<animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1.2195121951219512s" begin="-0.6968641114982578s" repeatCount="indefinite"></animate>
			</rect>
			</g><g transform="rotate(154.28571428571428 50 50)">
			<rect x="48" y="22.5" rx="2" ry="2.6" width="4" height="13" fill="#a7abae">
				<animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1.2195121951219512s" begin="-0.6097560975609756s" repeatCount="indefinite"></animate>
			</rect>
			</g><g transform="rotate(180 50 50)">
			<rect x="48" y="22.5" rx="2" ry="2.6" width="4" height="13" fill="#a7abae">
				<animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1.2195121951219512s" begin="-0.5226480836236934s" repeatCount="indefinite"></animate>
			</rect>
			</g><g transform="rotate(205.71428571428572 50 50)">
			<rect x="48" y="22.5" rx="2" ry="2.6" width="4" height="13" fill="#a7abae">
				<animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1.2195121951219512s" begin="-0.4355400696864111s" repeatCount="indefinite"></animate>
			</rect>
			</g><g transform="rotate(231.42857142857142 50 50)">
			<rect x="48" y="22.5" rx="2" ry="2.6" width="4" height="13" fill="#a7abae">
				<animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1.2195121951219512s" begin="-0.3484320557491289s" repeatCount="indefinite"></animate>
			</rect>
			</g><g transform="rotate(257.14285714285717 50 50)">
			<rect x="48" y="22.5" rx="2" ry="2.6" width="4" height="13" fill="#a7abae">
				<animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1.2195121951219512s" begin="-0.2613240418118467s" repeatCount="indefinite"></animate>
			</rect>
			</g><g transform="rotate(282.85714285714283 50 50)">
			<rect x="48" y="22.5" rx="2" ry="2.6" width="4" height="13" fill="#a7abae">
				<animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1.2195121951219512s" begin="-0.17421602787456444s" repeatCount="indefinite"></animate>
			</rect>
			</g><g transform="rotate(308.57142857142856 50 50)">
			<rect x="48" y="22.5" rx="2" ry="2.6" width="4" height="13" fill="#a7abae">
				<animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1.2195121951219512s" begin="-0.08710801393728222s" repeatCount="indefinite"></animate>
			</rect>
			</g><g transform="rotate(334.2857142857143 50 50)">
			<rect x="48" y="22.5" rx="2" ry="2.6" width="4" height="13" fill="#a7abae">
				<animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1.2195121951219512s" begin="0s" repeatCount="indefinite"></animate>
			</rect>
			</g>
		</svg>
		<div v-if="error || timeout" class="my-5 text-center"><h4 class="fw-normal py-5">{{ `${$t('message.No')} ${title ? title : 'data'} !`}}</h4></div>
	</div>
</template>
 
 
<script>
	export default {
		mounted() {
			this.timeoutF()
		},
		props: ['error', 'title', 'hide', 'infinite'],
		data() {
			return {
				timeout: false,
				disapear: false
			}
		},
		methods: {
			timeoutF() {
				let interval = this.infinite ? 999999 : 20000
				setTimeout( () => {
					this.timeout = true
					if ( this.hide ) {
						this.disapear = true
					}
				}, interval);
			}
		}
	}
</script>
 
 
<style lang='scss' scoped>
.loading-icon svg {
	width: 100px;
}
@media( min-width: 768px ) {
	.loading-icon svg {
		width: 130px;
	}
}
</style>