interface Artist {
  id: string,
  title: string,
}
interface Song {
  id: string,
  title: string,
  artists: Array<Artist>
}
