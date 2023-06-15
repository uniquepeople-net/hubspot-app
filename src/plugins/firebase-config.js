// firebaseConfig.js

import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyAs4QUKvwBQRzqBKLyvGWDLWT_2Hmm8DBo",
	//databaseURL: 'https://project-id.firebaseio.com',
	authDomain: "ufp-project-389208.firebaseapp.com",
	projectId: "ufp-project-389208",
	storageBucket: "ufp-project-389208.appspot.com",
	messagingSenderId: "465240835637",
	appId: "1:465240835637:web:bb67169ef6579cc361d37c",
	measurementId: "G-9VD8LK4Y77"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;


