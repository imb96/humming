import { getApps, initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'

import authSignIn from './authSignIn'
import authSignOut from './authSignOut'
import authSignUp from './authSignUp'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  databaseURL: 'https://humming-414107-default-rtdb.firebaseio.com/',
}
// Initialize Firebase

const app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]

const database = getDatabase(app)

export { app, database, authSignUp, authSignIn, authSignOut }
