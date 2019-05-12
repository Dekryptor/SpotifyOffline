
const ydl = require('youtube-dl');

module.exports.downloadSong = function(title, playlist) {

   playlist = playlist || "";

   ydl.exec('ytsearch1:' + title, ['-x', '--audio-format', 'mp3'], {}, (err, output) => {
      if (err) {
         console.error(err);
         return;
      }

      console.log("OUTPUT: " + output.join('\n'));
   });
};