(function() {
  function SongPlayer() {
    var SongPlayer = {};

    /**
    * @desc variable that stores the currently selected song
    * @type {object}
    */
    var currentSong = null;

    /**
    * @desc Buzz object audio file
    * @type {object}
    */
    var currentBuzzObject = null;

    /**
    * @function setSong
    * @desc Stops currently playing song and loads new audio file as currentBuzzObject
    * @param [Object] song
    */
    var setSong = function(song) {
      if(currentBuzzObject) {
        currentBuzzObject.stop();
        currentSong.playing = null;
      }

      currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
      });

      currentSong = song;
    }

    /**
    * @desc calls for passed song to be played and, if different than current
    *       song, calls for the passed song to be set current
    * @param [object] song
    */
    SongPlayer.play = function(song) {
      if(currentSong !== song) {       
        setSong(song);
        playSong(song);
      } else if(currentSong === song) {
          if(currentBuzzObject.isPaused()) {
          playSong(song);
          }
      }
    };

    /**
    * @desc pauses the song, sets "playing" attribute to false
    * @param [object] song
    */
    SongPlayer.pause = function(song) {
      currentBuzzObject.pause();
      song.playing = false;
    }

    /**
    * @desc plays the song, sets "playing" attribute to true
    * @param [object] song
    */
    var playSong = function(song) {
      currentBuzzObject.play();
      song.playing = true;
    }

    return SongPlayer;
  }

  angular
    .module('blocJams')
    .factory('SongPlayer', SongPlayer);
})();