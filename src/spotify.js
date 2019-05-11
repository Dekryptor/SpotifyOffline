
const request = require('request');
const { options } = require('./secrets');

const API_URL = 'https://api.spotify.com/v1';

module.exports.login = function() {

    const redirect = 'https://localhost/oauth/redirect';

    // Scopes for what data the application wants to access
    const scopes = 'user-read-private ' +
        'user-read-email ' +
        'playlist-read-private ' +
        'playlist-read-collaborative';

    const authUrl = 'https://accounts.spotify.com/authorize' +
        '?response_type=code' +
        '&client_id=' + options.client_id +
        (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
        '&redirect_uri=' + encodeURIComponent(redirect);

    return authUrl;
};

/**
 *  GET https://api.spotify.com/v1/users/{user_id}/playlists
 */
module.exports.getUserPlaylists = function(access_token, user_id) {
    console.log("getting user playlists");

    const options = {
        url: API_URL + '/users/' + user_id + '/playlists',
        headers: {
            'Authorization': 'Bearer ' + access_token
        }
    };

    return request.get(options, (err, res, body) => {
        if (err) {
            console.error(err);
            return;
        }

        console.log('body: ', body);
    });
};

/**
  * GET https://api.spotify.com/v1/playlists/{playlist_id}/tracks
  */
module.exports.getPlaylistTracks = function(access_token, playlist_id) {
    console.log('getting playlist tracks');

    const options = {
        url: API_URL + '/playlists/' + playlist_id + '/tracks',
        headers: {
            'Authorization': 'Bearer ' + access_token
        }
    };

    return request.get(options, (err, res, body) => {
        if (err) {
            console.error(err);
            return;
        }

        console.log('body: ', body)
    });
};