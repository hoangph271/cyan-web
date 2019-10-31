interface FirestoreDocument {
  id: string,
}
interface Artist {
  title?: string,
  avatarURL?: string,
}
interface ArtistDocument extends Artist {
  id: string,
}
interface Song {
  title?: string,
  artists?: Array<Artist>,
  audio?: File | null,
  audioURL?: string,
}
interface SongDocument extends Song {
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
