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
