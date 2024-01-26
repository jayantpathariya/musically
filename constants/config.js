export const config = {
  baseURL: "https://www.jiosaavn.com/api.php",
  endpoints: {
    home: "webapi.getLaunchData",
    search: {
      all: "autocomplete.get",
      songs: "search.getResults",
      albums: "search.getAlbumResults",
      artists: "search.getArtistResults",
      playlists: "search.getPlaylistResults",
    },
    songs: {
      id: "song.getDetails",
      link: "webapi.get",
    },
    albums: {
      id: "content.getAlbumDetails",
      link: "webapi.get",
    },
    playlists: {
      id: "playlist.getDetails",
    },
    artists: {
      id: "artist.getArtistPageDetails",
      link: "webapi.get",
      songs: "artist.getArtistMoreSong",
      albums: "artist.getArtistMoreAlbum",
      topSongs: "search.artistOtherTopSongs",
    },
    discover: {
      newReleases: "content.getAlbums",
      topCharts: "content.getCharts",
      topPlaylists: "content.getFeaturedPlaylists",
      topArtists: "social.getTopArtists",
    },
    lyrics: "lyrics.getLyrics",
  },
};
