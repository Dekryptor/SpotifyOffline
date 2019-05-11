
const request = require('request');

const spotify_url = 'https://api.spotify.com/v1';

/**
 *  GET https://api.spotify.com/v1/users/{user_id}/playlists
 */
function getUserPlaylists(access_token, user_id) {
    console.log("getting user playlists");

    const options = {
        url: spotify_url + '/users/' + user_id + '/playlists',
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
}

/**
  * GET https://api.spotify.com/v1/playlists/{playlist_id}/tracks
  */
function getPlaylistTracks(access_token, playlist_id) {
    console.log('getting playlist tracks');

    const options = {
        url: spotify_url + '/playlists/' + playlist_id + '/tracks',
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
}