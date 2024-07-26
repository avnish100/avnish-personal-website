require('dotenv').config();
const axios = require('axios');

const {
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET,
  SPOTIFY_REFRESH_TOKEN,
} = process.env;

const getAccessToken = async () => {
  const response = await axios({
    method: 'post',
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${Buffer.from(
        `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`
      ).toString('base64')}`,
    },
    data: `grant_type=refresh_token&refresh_token=${SPOTIFY_REFRESH_TOKEN}`,
  });

  return response.data.access_token;
};

const getRecentlyPlayed = async () => {
  const token = await getAccessToken();
  const response = await axios({
    method: 'get',
    url: 'https://api.spotify.com/v1/me/player/recently-played?limit=8',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.items.map(item => ({
    album: item.track.album.name,
    artist: item.track.artists.map(artist => artist.name).join(', '),
    image: item.track.album.images[0].url,
    link: item.track.external_urls.spotify,
  }));
};

module.exports = { getRecentlyPlayed };
