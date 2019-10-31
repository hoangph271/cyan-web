interface FirestoreDocumentData {
  id: string,
}
interface Artist {
  title?: string,
  avatarURL?: string,
}
interface ArtistDocumentData extends Artist {
  id: string,
}
interface Song {
  title?: string,
  artists?: Array<Artist>,
  audio?: File | null,
  audioURL?: string,
}
interface SongDocumentData extends Song {
  id: string,
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
