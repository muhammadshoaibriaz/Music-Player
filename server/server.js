const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const cors = require('cors');
const querystring = require('querystring');
const client = require('./mongoDb');
const router = require('./routes/route');
const {default: axios} = require('axios');

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

app.use('/', router);

// Spotify authorization
const CLIENT_ID = '6d06485cb50646159ee240e6a8262044';
const CLIENT_SECRET = '1e0aed3132494873be2e2e332888959b';
const REDIRECT_URI = 'myapp://callback';
const AUTH_URL = 'https://accounts.spotify.com/authorize';
const TOKEN_URL = 'https://accounts.spotify.com/api/token';

app.post('/login', (req, res) => {
  const scopes =
    'user-read-private user-read-email playlist-read-private playlist-read-collaborative user-read-recently-played user-follow-read user-read-playback-state user-modify-playback-state streaming';
  const authUrl = `${AUTH_URL}?${querystring.stringify({
    response_type: 'code',
    client_id: CLIENT_ID,
    scope: scopes,
    redirect_uri: REDIRECT_URI,
  })}`;
  res.redirect(authUrl);
});

app.get('/callback', async (req, res) => {
  try {
    const code = req.query.code;
    const response = await axios.post(
      `${TOKEN_URL}`,
      querystring.stringify({
        code: code,
        redirect_uri: REDIRECT_URI,
        grant_type: 'authorization_code',
      }),
      {
        headers: {
          Authorization:
            'Basic ' +
            Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64'),
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );
    const {access_token, refresh_token} = tokenResponse.data;
    res.json({access_token: refresh_token});
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Error exchange failed'});
  }
});

app.listen(port, async (req, res) => {
  try {
    client;
  } catch (err) {
    console.log('Error connecting to mongoDb', err);
  }
});

// JVCeC4A21qxvT6y1
// ms0319255
