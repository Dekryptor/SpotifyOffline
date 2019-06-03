
const ydl = require("youtube-dl");

module.exports.downloadPlaylist = function(playlist) {

};

module.exports.downloadSong = function(songTitle, playlistTitle) {

	// If the song is part of a playlist then
	// perhaps create a directory with the playlist's name
	// and save all of the songs in the directory.
	playlist = playlistTitle || "";

	ydl.exec("ytsearch1:" + songTitle, ["-x", "--audio-format", "mp3"], {}, (err, output) => {
		if (err) {
			console.error(err);
			return;
		}

		console.log("OUTPUT: " + output.join("\n"));
	});
};
