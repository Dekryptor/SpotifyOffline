
const request = require('request');
const { encode } = require('base-64');

const { options } = require('./secrets');

const API_URL = 'https://api.spotify.com/v1';
const TOKEN_URL = 'https://api.spotify.com/api/token';

module.exports.login = function() {

    // Scopes for what data the application wants to access
    const scopes = 'user-read-private ' +
        'user-read-email ' +
        'playlist-read-private ' +
        'playlist-read-collaborative';

    const authUrl = 'https://accounts.spotify.com/authorize' +
        '?response_type=code' +
        '&client_id=' + options.client_id +
        (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
        '&redirect_uri=' + encodeURIComponent(options.redirect);

    return authUrl;
};

/**
 * POST https://accounts.spotify.com/api/token
 */
module.exports.getAccessToken = function(authorization_code) {
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
const refreshAccessToken = function() {

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
 */
module.exports.getUserPlaylists = function(user_id) {
    console.log("getting user playlists");

    if (!options.expirationTime || new Date().getTime() > options.expirationTime) {
        refreshAccessToken();
    }

    const req_options = {
        url: API_URL + '/users/' + user_id + '/playlists',
        headers: {
            'Authorization': 'Bearer ' + options.access_token
        }
    };

    return request.get(req_options, (err, res, body) => {
        if (err) {
            console.error(err);
            return err;
        }

        console.log('body: ', body);
    });
};

/**
  * GET https://api.spotify.com/v1/playlists/{playlist_id}/tracks
  */
module.exports.getPlaylistTracks = function(playlist_id) {
    console.log('getting playlist tracks');

    if (!options.expirationTime || new Date().getTime() > options.expirationTime) {
        refreshAccessToken();
    }

    const req_options = {
        url: API_URL + '/playlists/' + playlist_id + '/tracks',
        headers: {
            'Authorization': 'Bearer ' + options.access_token
        }
    };

    return request.get(req_options, (err, res, body) => {
        if (err) {
            console.error(err);
            return err;
        }

        console.log('body: ', body)
    });
};