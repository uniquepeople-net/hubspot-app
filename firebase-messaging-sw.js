// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
/* importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js'); */


import { initializeApp } from "firebase/app";
import { getMessaging, onBackgroundMessage } from "firebase/messaging/sw";

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
const firebaseApp = initializeApp({
	apiKey: "AIzaSyAs4QUKvwBQRzqBKLyvGWDLWT_2Hmm8DBo",
	//databaseURL: 'https://project-id.firebaseio.com',
	authDomain: "ufp-project-389208.firebaseapp.com",
	projectId: "ufp-project-389208",
	storageBucket: "ufp-project-389208.appspot.com",
	messagingSenderId: "465240835637",
	appId: "1:465240835637:web:bb67169ef6579cc361d37c",
	measurementId: "G-9VD8LK4Y77"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = getMessaging(firebaseApp);

//console.log(messaging)


/* messaging.onBackgroundMessage((payload) => {
	console.log(
	  '[firebase-messaging-sw.js] Received background message ',
	  payload
	);
	// Customize notification here
	const notificationTitle = payload.notification.title;
	const notificationOptions = {
	  body: payload.notification.body,
	  icon: './assets/images/face.png'
	};
  
	self.registration.showNotification(notificationTitle, notificationOptions);
  }); */

onBackgroundMessage(messaging, (payload) => {
	console.log('[firebase-messaging-sw.js] Received background message ', payload);
	// Customize notification here
	const notificationTitle = payload.notification.title;
	const notificationOptions = {
		body: payload.notification.body,
		//icon: './assets/images/face.png'
	};

	self.registration.showNotification(notificationTitle, notificationOptions);
});