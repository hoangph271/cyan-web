interface FirestoreDocument {
  id?: string,
}
interface Artist extends FirestoreDocument {
  title?: string,
  avatarURL?: string,
}
interface Song extends FirestoreDocument {
  title?: string,
  artists?: Array<Artist>,
  audio?: File | null,
}
type UserInfo = {
  uid: string,
}
type UserDetail = {
  phoneNumber?: string | null,
  displayName?: string | null,
  photoURL?: string | null,
  email?: string | null,
}
