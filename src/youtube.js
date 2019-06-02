
const ydl = require('youtube-dl');

module.exports.downloadSong = function(title, playlist) {

   // If the song is part of a playlist then
   // perhaps create a directory with the playlist's name
   // and save all of the songs in the directory.
   playlist = playlist || "";

   ydl.exec('ytsearch1:' + title, ['-x', '--audio-format', 'mp3'], {}, (err, output) => {
      if (err) {
         console.error(err);
         return;
      }

      console.log("OUTPUT: " + output.join('\n'));
   });
};
