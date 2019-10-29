import firebase from 'firebase'

const rolesCollection = () => firebase.firestore().collection('roles')
const usersCollection = () => firebase.firestore().collection('users')
const songsCollection = () => firebase.firestore().collection('songs')
const artistsCollection = () => firebase.firestore().collection('artists')
const initializeFirebase = () => {
  firebase.initializeApp({
    apiKey: 'AIzaSyDXtazMnwJsEIFxF_5rvh-IO9BkWx-WCdM',
    authDomain: 'cyan-f2d39.firebaseapp.com',
    databaseURL: 'https://cyan-f2d39.firebaseio.com',
    projectId: 'cyan-f2d39',
    storageBucket: 'cyan-f2d39.appspot.com',
    messagingSenderId: '1081599922736',
    appId: '1:1081599922736:web:7213329f4cda7159fd93f5',
    measurementId: 'G-4YH9WVCN1S'
  })
}

export {
  rolesCollection,
  usersCollection,
  songsCollection,
  artistsCollection,
  initializeFirebase,
}
