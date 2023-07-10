<template>
	<router-view v-slot="{ Component }">
		<transition name="fade">
			<component :is="Component" />
		</transition>
	</router-view>
</template>

<script>
	//import { ref } from "vue";
	/* import firebase from "./plugins/firebase-config";
	import { getFirestore, collection, addDoc, getDoc } from "firebase/firestore";
	import { getMessaging, getToken, onMessage } from "firebase/messaging"; */


	export default {
		setup() {
				
				// Get registration token. Initially this makes a network call, once retrieved
				// subsequent calls to getToken will return from cache.
				//const message = ref("");
				/* const messaging = getMessaging();

				

				getToken(messaging, { vapidKey: 'BDXeh4-h57qX_9MjBmaRZhDR3_1JRzW-W8V55Iq-LVMnzDi8TN9jw-FZhAJOtcLn3bBg2u-YZeshiEy_chFDGUM' }).then((currentToken) => {
					if (currentToken) {
						// Send the token to your server and update the UI if necessary
						console.log('token si:', currentToken )
						
						// ...
					} else {
						// Show permission request UI
						console.log('No registration token available. Request permission to generate one.');
						// ...
					}
				}).catch((err) => {
					console.log('An error occurred while retrieving token. ', err);
				// ...
				});

				onMessage(messaging, (payload) => {
					console.log('Message received. ', payload);
					// ...
				});

				const db = getFirestore(firebase); */

				/* try {
					const docRef = addDoc(collection(db, "test_collection"), {
						name: "FErko",
						surname: "Fericko"
					});
					console.log("Document written with ID: ", docRef);
				} catch (e) {
					console.error("Error adding document: ", e);
				} */

				

				/* console.log( collection(db, 'test_collection'))
				async function getTest(db) {

		
					const testCollection = collection(db, 'test_collection')
					const collection = await getDocs(testCollection)
		
					return collection

				} 

				const coska = getTest(db)

				console.log(coska) */
				

				return {
					//message,
					//sendMessage
				};
			},
	}
</script>

<style lang="scss" scoped>
.fade-enter-active {
	transition: opacity 1.5s;
}
.fade-leave-active {
  	transition: all .1s;
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
