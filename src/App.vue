<template>
	<router-view v-slot="{ Component }">
		<transition name="fade">
			<component :is="Component" />
		</transition>
	</router-view>
</template>

<script>


export default {
}
</script>

<style lang="scss" scoped>
.fade-enter-active {
	transition: all .5s;
}
.fade-leave-active {
  	transition: all 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  scale: .99;
}


/* .flip-enter-active {
  transition: transform 0.5s;
}

.flip-enter-from,
.flip-leave-to {
  transform: rotateY(-90deg);
} */

/* .bounce-enter-active {
  animation: bounce-in 0.5s;
}

.bounce-enter-from {
  transform: scale(0.5);
  opacity: 0;
}

@keyframes bounce-in {
  0% {
    transform: scale(0.5);
    opacity: 0;
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
} */

/* .rotate-enter-active {
  transition: transform 0.5s;
}

.rotate-enter-from,
.rotate-leave-to {
  transform: rotate(-180deg);
} */

/* .scale-fade-enter-active,
.scale-fade-leave-active {
  transition: transform 0.5s, opacity 0.5s;
}

.scale-fade-enter-from,
.scale-fade-leave-to {
  transform: scale(0);
  opacity: 0;
} */

/* .custom-animation-enter-active {
  animation: slide-in 0.5s;
}

.custom-animation-leave-active {
  animation: slide-out 0.5s;
}

@keyframes slide-in {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}

@keyframes slide-out {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(100%);
  }
} */
</style>
