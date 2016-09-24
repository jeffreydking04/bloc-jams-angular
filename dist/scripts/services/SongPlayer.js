(function() {
  function SongPlayer(Fixtures) {
    var SongPlayer = {};

    /**
    * @desc variable to hold object containing the album data
    * @typ {object}
    */
    var currentAlbum = Fixtures.getAlbum();

    /**
    * @desc Buzz object audio file
    * @type {object}
    */
    var currentBuzzObject = null;

    /**
    * @function playSong
    * @desc plays the song, sets "playing" attribute to true
    * @param [object] song
    */
    var playSong = function(song) {
      currentBuzzObject.play();
      song.playing = true;
    };

    /**
    * @function setSong
    * @desc Stops currently playing song and loads new audio file as currentBuzzObject
    * @param [Object] song
    */
    var setSong = function(song) {
      if(currentBuzzObject) {
        currentBuzzObject.stop();
        SongPlayer.currentSong.playing = null;
      }

      currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
      });

      SongPlayer.currentSong = song;
    };

    /**
    * @function getSongIndex
    * @desc retrieves and returns the index number of the song passed to it
    * @param [object] song
    */
    var getSongIndex = function(song) {
      return currentAlbum.songs.indexOf(song);
    };

    /**
    * @desc variable that stores the currently selected song
    * @type {object}
    */
    SongPlayer.currentSong = null;

    /**
    * @function SongPlayer.play
    * @desc calls for passed song to be played and, if different than current
    *       song, calls for the passed song to be set current
    * @param [object] song
    */
    SongPlayer.play = function(song) {
      song = song || SongPlayer.currentSong;
      if(SongPlayer.currentSong !== song) {
        setSong(song);
        playSong(song);
      } else if(SongPlayer.currentSong === song) {
          if(currentBuzzObject.isPaused()) {
          playSong(song);
          }
      }
    };

    /**
    * @function SongPlayer.pause
    * @desc pauses the song, sets "playing" attribute to false
    * @param [object] song
    */
    SongPlayer.pause = function(song) {
      song = song || SongPlayer.currentSong;
      currentBuzzObject.pause();
      song.playing = false;
    };

    /**
    * @function SongPlayer.previous
    * @desc determines previous song and plays it
    * no @param passed
    */
    SongPlayer.previous = function() {
      var currentSongIndex = getSongIndex(SongPlayer.currentSong);
      currentSongIndex--;

      if(currentSongIndex < 0) {
        currentBuzzObject.stop();
        SongPlayer.currentSong.playing = null;
      } else {
        var song = currentAlbum.songs[currentSongIndex];
        setSong(song);
        playSong(song);
      }
    };

    return SongPlayer;
  }

  angular
    .module('blocJams')
    .factory('SongPlayer', SongPlayer);
})();