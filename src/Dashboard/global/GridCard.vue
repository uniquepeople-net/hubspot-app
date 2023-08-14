<template>
	<div class="app-card grid-bg" :style="bgStyle">
		<div class="grid-gradient" :style="gradientStyle">
			<slot name="content"></slot>
		</div>
	</div>
</template>
 
 
<script>
	export default {
		props: {
			gradient: {
				type: Number,
				default: 225
			},
			bgSize: String,
			padding: String
		},
		data() {
			return {
			}
		},
		computed: {
			gradientStyle() {
				return {
					background: `linear-gradient(${this.gradient}deg, var(--gradient-bg) 0%, var(--card-bg) 35.08%)`,
					padding: this.padding
				};
			},
			bgStyle() {
				return {
					backgroundSize: this.bgSize
				}
			}
		}
	}
</script>
 
 
<style lang='scss' scoped>
.grid-bg {
	background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHQAAABvCAMAAAAKVRRNAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAEtQTFRFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA5mA6dAAAABl0Uk5TACAwEECf/7/fcH/PUO+QgODAoGCwj1/Qr7vuw94AAAKPSURBVHic7ZpRk6sgDIVFK2IVFWXX+/9/6YV9yglOo9Pt3c7dnDfT5GiR4YOMVaX6X2VqvG5qwwI3VlEmNBctW2s7KHDW9jRwt9bRGjNYe6cJo7cO7iJajtZipEvXnjy5yQkTSZhygN4kWcJNRMuqzxkzCSw5QDLqfB1IwpoDIwnka3fFsjI+BejozcyiyX9kI4GbZePdsaEQLVNKjDhR+jDBvDBr3CBhCyvMi2YNMySIliqVSvVOMnyF4oHGPJtQBBL8PuD3tMB/0kDmKa1puhM85ZYeLF/FU8qIkzwl4/VdPIXNBw+IPN0kntaSZRqMEEcIzAyXJgbY4CSeRniFJvEUJsqB5cTnmkqlUr2NmgJ+PEHG5VXLewk/Bytn7wWe1h4BIFuOHFQxw49WcFD1p3hKLTtmKcPv9gKe3vhzFzz1Z3jaXrHM8At4/Jz2iDwNC/K03wPj6cJ5KliqVCrVO0mEX8UTipZbkXCZp5110NlLPP0DJgVPncTTjh1gC/itEk83DiqRp9zyB3lKh/MUT73I00eWyWNHXDbrEuAN1WHBdu5c8hTbuaKlSqVS/XYlXAIdC/h9etvC0tpaB93berADLK2iZYGEczylT8F5Klr+IE+pxXTEU0qqYucg8pRbnuHpznm6DNBBSAdYrFCeqlQqlaDe+8fwGzlPPzx2b1NFx3haWA4yTykSvr65eZ6nQJlzPI3M4iFP5xfwtOcWwxFPH1mm53Kewc/i8XN0foKKyS/QzjW7RVyKliqVSvXb1TsH8Gs6j6fNevDQva3ufuA8bZGnoqUEv6+vdDhP/XM8LeA3/CueUlLFI55Si/mIp/TUXPCUWyYPj/AzgW1oRsd6+JNlFY7zVLJUqZ7UXwMpKUSSzdO8AAAAAElFTkSuQmCC");
	background-position: center center;
	position: relative;
	.grid-gradient {
		width: 100%;
		height: 100%;
		background: rgb(232,232,232);
		//background: linear-gradient(45deg, rgba(232,232,232,1) 75%, rgba(255,255,255,0) 100%);
		//background: linear-gradient(225deg, var(--gradient-bg) 0%, var(--card-bg) 35.08%);
	}
}
</style>