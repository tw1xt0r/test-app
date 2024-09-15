// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { initializeAuth, getReactNativePersistence } from 'firebase/auth/'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { getFirestore, collection } from 'firebase/firestore'
// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyAsPiEAteM6EbD_rF3SpOOr6Rp4s1UNMZ8',
	authDomain: 'message-3d0b2.firebaseapp.com',
	projectId: 'message-3d0b2',
	storageBucket: 'message-3d0b2.appspot.com',
	messagingSenderId: '619469656858',
	appId: '1:619469656858:web:b81a6a6e6d48fbd2f392a3',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const auth = initializeAuth(app, {
	persistence: getReactNativePersistence(AsyncStorage),
})

export const db = getFirestore(app)

export const userRef = collection(db, 'users')
export const roomRef = collection(db, 'rooms')
