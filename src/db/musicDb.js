const apiBaseUrl = 'https://api.spotify.com/v1';
// these are our endpoints
const getNewReleases = `${apiBaseUrl}/browse/new-releases`;
const getFeaturedPlaylists = `${apiBaseUrl}/browse/featured-playlists`;
const getArtists = `${apiBaseUrl}/me/following?type=artist`;
const getRecentlyPlayed = `${apiBaseUrl}/me/player/recently-played`;
const getTracksFromAlbums = id => `${apiBaseUrl}/albums/${id}/tracks`;
const getArtistDetails = id => `${apiBaseUrl}/artists/${id}/albums`;
const getFavoriteArtistSongs = id =>
  `${apiBaseUrl}/artists/6U5BSRuKoLbpIoYJMdmNT2/top-tracks`;

// -----------------------------------///////////----------------------------------

const apiCall = async (token, url) => {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.json();
  } catch (error) {
    console.log('Error', error);
  }
};

export const fetchNewReleases = token => {
  return apiCall(token, getNewReleases);
};

export const fetchFeaturedPlaylists = token => {
  return apiCall(token, getFeaturedPlaylists);
};

export const fetchArtists = token => {
  return apiCall(token, getArtists);
};

export const fetchRecentlyPlayed = token => {
  return apiCall(token, getRecentlyPlayed);
};

export const fetchTracksFromAlbum = (token, id) => {
  return apiCall(token, getTracksFromAlbums(id));
};

export const fetchArtistAlbums = (token, id) => {
  return apiCall(token, getArtistDetails(id));
};
export const fetchFavoriteArtistTracks = (token, id) => {
  return apiCall(token, getFavoriteArtistSongs(id));
};
