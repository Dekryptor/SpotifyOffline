
const ydl = require('youtube-dl');

module.exports.downloadSong = function(title) {
   ydl.exec('ytsearch1:' + title, ['-o', title + '.mp3', '-x', '--audio-format', 'mp3'], {}, (err, output) => {
      if (err) {
         console.error(err);
         return;
      }
      console.log("OUTPUT: " + output.join('\n'));
   });
};