import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyA48D3W1AARiDnwjFC2TtmjTGYxJQLkLZw",
	authDomain: "rick-y-morty-practice-redux.firebaseapp.com",
	databaseURL: "https://rick-y-morty-practice-redux.firebaseio.com",
	projectId: "rick-y-morty-practice-redux",
	storageBucket: "rick-y-morty-practice-redux.appspot.com",
	messagingSenderId: "613933354376",
	appId: "1:613933354376:web:f4091e088bfb320762fe3d",
	measurementId: "G-2JG4XFTZGD",
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore().collection("favourites");

export function getFavourites(uid) {
	return db
		.doc(uid)
		.get()
		.then((snap) => {
			return snap.data().favourites;
		});
}

export function updateDB(array, uid) {
	return db.doc(uid).set({ favourites: [...array] });
}

export function signOutGoogle() {
	firebase.auth().signOut();
}

export function loginWithGoogle() {
	const provider = new firebase.auth.GoogleAuthProvider();
	return firebase
		.auth()
		.signInWithPopup(provider)
		.then((snap) => snap.user);
}
