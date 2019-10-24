import firebase from 'firebase'

const rolesCollection = _ => firebase.firestore().collection('roles')
const usersCollection = _ => firebase.firestore().collection('users')
const songsCollection = _ => firebase.firestore().collection('songs')
const artistsCollection = _ => firebase.firestore().collection('artists')

export {
  rolesCollection,
  usersCollection,
  songsCollection,
  artistsCollection,
}