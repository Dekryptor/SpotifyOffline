const request = require('request');
const { encode } = require('base-64');

const { options } = require('./secrets');

const API_URL = 'https://api.spotify.com/v1';
const TOKEN_URL = 'https://api.spotify.com/api/token';

module.exports.login = () => {

    // Scopes for what data the application wants to access
    const scopes = 'user-read-private ' +
        'user-read-email ' +
        'playlist-read-private ' +
        'playlist-read-collaborative';

    return 'https://accounts.spotify.com/authorize' +
        '?response_type=code' +
        '&client_id=' + options.client_id +
        (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
        '&redirect_uri=' + encodeURIComponent(options.redirect);

};

/**
 * POST https://accounts.spotify.com/api/token
 */
module.exports.getAccessToken = (authorization_code) => {
   console.log("getting user access token");

   const req_options = {
       url: TOKEN_URL,
       headers: {
           'Authorization': 'Basic ' + encode(options.client_id + ':' + options.client_secret)
       },
       postData: {
           mineType: 'application/x-www-form-urlencoded',
           params: [
               {
                   name: 'grant_type',
                   value: 'authorization_code'
               },
               {
                   name: 'code',
                   value: authorization_code
               },
               {
                   name: 'redirect_uri',
                   value: options.redirect_url
               }
           ]
       }
   };

   request.post(req_options, (err, res, body) => {
        if (err) {
            console.error(err);
            return err;
        }

        options.access_token = res.access_token;
        options.refresh_token = res.refresh_token;
        options.expirationTime = Date().getTime() + (res.expires_in * 1000);
   })
};

/**
 * POST https://accounts.spotify.com/api/token
 */
const refreshAccessToken = () => {

    console.log("refreshing access token");

    const req_options = {
        url: TOKEN_URL,
        headers: {
            'Authorization': 'Basic ' + encode(options.client_id + ':' + options.client_secret)
        },
        postData: {
            mineType: 'application/x-www-form-urlencoded',
            params: [
                {
                    name: 'grant_type',
                    value: 'refresh_token'
                },
                {
                    name: 'refresh_token',
                    value: options.refresh_token
                },
            ]
        }
    };

    request.post(req_options, (err, res, body) => {
        if (err) {
            console.error(err);
            return err;
        }

        options.access_token = res.access_token;
        options.expirationTime = Date().getTime() + (res.expires_in * 1000);

    })
};

/**
 *  GET https://api.spotify.com/v1/users/{user_id}/playlists
 *
 *  EXAMPLE RESPONSE
 *  {
  "href": "https://api.spotify.com/v1/users/wizzler/playlists",
  "items": [{
          "collaborative": false,
          "external_urls": {
            "spotify": "http://open.spotify.com/user/wizzler/playlists/53Y8wT46QIMz5H4WQ8O22c"
          },
          "href": "https://api.spotify.com/v1/users/wizzler/playlists/53Y8wT46QIMz5H4WQ8O22c",
          "id": "53Y8wT46QIMz5H4WQ8O22c",
          "images": [],
          "name": "Wizzlers Big Playlist",
          "owner": {
            "external_urls": {
              "spotify": "http://open.spotify.com/user/wizzler"
            },
            "href": "https://api.spotify.com/v1/users/wizzler",
            "id": "wizzler",
            "type": "user",
            "uri": "spotify:user:wizzler"
          },
          "public": true,
          "snapshot_id": "bNLWdmhh+HDsbHzhckXeDC0uyKyg4FjPI/KEsKjAE526usnz2LxwgyBoMShVL+z+",
          "tracks": {
            "href": "https://api.spotify.com/v1/users/wizzler/playlists/53Y8wT46QIMz5H4WQ8O22c/tracks",
            "total": 30
          },
          "type": "playlist",
          "uri": "spotify:user:wizzler:playlist:53Y8wT46QIMz5H4WQ8O22c"
        },
        {
          "collaborative": false,
          "external_urls": {
            "spotify": "http://open.spotify.com/user/wizzlersmate/playlists/1AVZz0mBuGbCEoNRQdYQju"
          },
          "href": "https://api.spotify.com/v1/users/wizzlersmate/playlists/1AVZz0mBuGbCEoNRQdYQju",
          "id": "1AVZz0mBuGbCEoNRQdYQju",
          "images":[],
          "name": "Another Playlist",
          "owner": {
            "external_urls": {
              "spotify": "http://open.spotify.com/user/wizzlersmate"
            },
            "href": "https://api.spotify.com/v1/users/wizzlersmate",
            "id": "wizzlersmate",
            "type": "user",
            "uri": "spotify:user:wizzlersmate"
          },
          "public": true,
          "snapshot_id": "Y0qg/IT5T02DKpw4uQKc/9RUrqQJ07hbTKyEeDRPOo9LU0g0icBrIXwVkHfQZ/aD",
          "tracks": {
            "href": "https://api.spotify.com/v1/users/wizzlersmate/playlists/1AVZz0mBuGbCEoNRQdYQju/tracks",
            "total": 58
          },
          "type": "playlist",
          "uri": "spotify:user:wizzlersmate:playlist:1AVZz0mBuGbCEoNRQdYQju"
        }],
    "limit": 9,
    "next": null,
    "offset": 0,
    "previous": null,
    "total": 9
};
 */
module.exports.getUserPlaylists = (user_id) => {
    console.log("getting user playlists");

    // Check if token has expired and refresh if necessary
    if (!options.expirationTime || new Date().getTime() > options.expirationTime) {
        refreshAccessToken();
    }

    const req_options = {
        url: API_URL + '/users/' + user_id + '/playlists',
        headers: {
            'Authorization': 'Bearer ' + options.access_token
        }
    };

    let ret = null;

    request.get(req_options, (err, res, body) => {
        if (err) {
            console.error(err);
            return err;
        }

        ret = res.items;
    });

    return ret;
};

/**
  * GET https://api.spotify.com/v1/playlists/{playlist_id}/tracks
  *
  * EXAMPLE RESPONSE
 {
  "href" : "https://api.spotify.com/v1/users/spotify_espa%C3%B1a/playlists/21THa8j9TaSGuXYNBU5tsC/tracks",
  "items" : [ {
    "added_at" : "2016-10-11T13:44:40Z",
    "added_by" : {
      "external_urls" : {
        "spotify" : "http://open.spotify.com/user/spotify_espa%C3%B1a"
      },
      "href" : "https://api.spotify.com/v1/users/spotify_espa%C3%B1a",
      "id" : "spotify_españa",
      "type" : "user",
      "uri" : "spotify:user:spotify_espa%C3%B1a"
    },
    "is_local" : false,
    "track" : {
      "album" : {
        "album_type" : "single",
        "artists" : [ {
          "external_urls" : {
            "spotify" : "https://open.spotify.com/artist/21451j1KhjAiaYKflxBjr1"
          },
          "href" : "https://api.spotify.com/v1/artists/21451j1KhjAiaYKflxBjr1",
          "id" : "21451j1KhjAiaYKflxBjr1",
          "name" : "Zion & Lennox",
          "type" : "artist",
          "uri" : "spotify:artist:21451j1KhjAiaYKflxBjr1"
        } ],
        "available_markets" : [ "AD", "AR", "AT", "AU", "BE", "BG", "BO", "BR",
                                "CA", "CH", "CL", "CO", "CR", "CY", "CZ", "DE",
                                "DK", "DO", "EC", "EE", "ES", "FI", "FR", "GB",
                                "GR", "GT", "HK", "HN", "HU", "ID", "IE", "IS",
                                "IT", "JP", "LI", "LT", "LU", "LV", "MC", "MT",
                                "MX", "MY", "NI", "NL", "NO", "NZ", "PA", "PE",
                                "PH", "PL", "PT", "PY", "SE", "SG", "SK", "SV",
                                "TR", "TW", "UY" ],
        "external_urls" : {
          "spotify" : "https://open.spotify.com/album/5GjKG3Y8OvSVJO55dQTFyD"
        },
        "href" : "https://api.spotify.com/v1/albums/5GjKG3Y8OvSVJO55dQTFyD",
        "id" : "5GjKG3Y8OvSVJO55dQTFyD",
        "images" : [ {
          "height" : 640,
          "url" : "https://i.scdn.co/image/b16064142fcd2bd318b08aab0b93b46e87b1ebf5",
          "width" : 640
        }, {
          "height" : 300,
          "url" : "https://i.scdn.co/image/9f05124de35d807b78563ea2ca69550325081747",
          "width" : 300
        }, {
          "height" : 64,
          "url" : "https://i.scdn.co/image/863c805b580a29c184fc447327e28af5dac9490b",
          "width" : 64
        } ],
        "name" : "Otra Vez (feat. J Balvin)",
        "type" : "album",
        "uri" : "spotify:album:5GjKG3Y8OvSVJO55dQTFyD"
      },
      "artists" : [ {
        "external_urls" : {
          "spotify" : "https://open.spotify.com/artist/21451j1KhjAiaYKflxBjr1"
        },
        "href" : "https://api.spotify.com/v1/artists/21451j1KhjAiaYKflxBjr1",
        "id" : "21451j1KhjAiaYKflxBjr1",
        "name" : "Zion & Lennox",
        "type" : "artist",
        "uri" : "spotify:artist:21451j1KhjAiaYKflxBjr1"
      }, {
        "external_urls" : {
          "spotify" : "https://open.spotify.com/artist/1vyhD5VmyZ7KMfW5gqLgo5"
        },
        "href" : "https://api.spotify.com/v1/artists/1vyhD5VmyZ7KMfW5gqLgo5",
        "id" : "1vyhD5VmyZ7KMfW5gqLgo5",
        "name" : "J Balvin",
        "type" : "artist",
        "uri" : "spotify:artist:1vyhD5VmyZ7KMfW5gqLgo5"
      } ],
      "available_markets" : [ "AD", "AR", "AT", "AU", "BE", "BG", "BO", "BR",
                            "CA", "CH", "CL", "CO", "CR", "CY", "CZ", "DE",
                            "DK", "DO", "EC", "EE", "ES", "FI", "FR", "GB",
                            "GR", "GT", "HK", "HN", "HU", "ID", "IE", "IS",
                            "IT", "JP", "LI", "LT", "LU", "LV", "MC", "MT",
                            "MX",  "MY", "NI", "NL", "NO", "NZ", "PA", "PE",
                            "PH", "PL", "PT", "PY", "SE", "SG", "SK", "SV",
                            "TR", "TW", "UY" ],
      "disc_number" : 1,
      "duration_ms" : 209453,
      "explicit" : false,
      "external_ids" : {
        "isrc" : "USWL11600423"
      },
      "external_urls" : {
        "spotify" : "https://open.spotify.com/track/7pk3EpFtmsOdj8iUhjmeCM"
      },
      "href" : "https://api.spotify.com/v1/tracks/7pk3EpFtmsOdj8iUhjmeCM",
      "id" : "7pk3EpFtmsOdj8iUhjmeCM",
      "name" : "Otra Vez (feat. J Balvin)",
      "popularity" : 85,
      "preview_url" : "https://p.scdn.co/mp3-preview/79c8c9edc4f1ced9dbc368f24374421ed0a33005",
      "track_number" : 1,
      "type" : "track",
      "uri" : "spotify:track:7pk3EpFtmsOdj8iUhjmeCM"
    }
  }, {
    "added_at" : "2016-10-11T13:44:40Z",
    "added_by" : {
      "external_urls" : {
        "spotify" : "http://open.spotify.com/user/spotify_espa%C3%B1a"
      },
      "href" : "https://api.spotify.com/v1/users/spotify_espa%C3%B1a",
      "id" : "spotify_españa",
      "type" : "user",
      "uri" : "spotify:user:spotify_espa%C3%B1a"
    },
    "is_local" : false
  } ],
  "limit" : 100,
  "next" : null,
  "offset" : 0,
  "previous" : null,
  "total" : 58
}
  */
module.exports.getPlaylistTracks = (playlist_id) => {
    console.log('getting playlist tracks');

    // Check if token has expired and refresh if necessary
    if (!options.expirationTime || new Date().getTime() > options.expirationTime) {
        refreshAccessToken();
    }

    const req_options = {
        url: API_URL + '/playlists/' + playlist_id + '/tracks',
        headers: {
            'Authorization': 'Bearer ' + options.access_token
        }
    };

    let ret = null;

    request.get(req_options, (err, res, body) => {
        if (err) {
            console.error(err);
            return err;
        }

        ret = res.items;
    });

    return ret;
};
