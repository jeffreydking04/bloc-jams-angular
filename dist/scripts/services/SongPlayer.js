(function() {
  function SongPlayer($rootScope, Fixtures) {
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
    * @desc Stops currently playing song and loads new audio file as
    * currentBuzzObject, assigns the currentSong variable,
    * and assigns the title, song, and total time variables for use
    * in the view
    * @param [Object] song
    */
    var setSong = function(song) {
      if(currentBuzzObject) {
        stopSong();
      }

      currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
      });

      currentBuzzObject.bind('timeupdate', function() {
        $rootScope.$apply(function() {
          SongPlayer.currentTime = currentBuzzObject.getTime();
        });
      });

      SongPlayer.currentSong = song;
      SongPlayer.currentSongTitle = currentAlbum.songs[getSongIndex(song)].title;
      SongPlayer.currentSongArtist = currentAlbum.artist;
      SongPlayer.currentSongTotalTime = currentAlbum.songs[getSongIndex(song)].duration;
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
    * @function stopSong
    * @desc stops current buzz song and sets the currentSong.playing
    * attribute to be null
    * no @param passed
    */
    var stopSong = function() {
      currentBuzzObject.stop();
      SongPlayer.currentSong.playing = null;
    };

    /**
    * @desc variable that stores the currently selected song
    * @type {object}
    */
    SongPlayer.currentSong = null;

    /**
    * @desc Current playback time (in seconds) of currently playing song
    * @type {number}
    */
    SongPlayer.currentTime = null;

    /**
    * @desc variable that stores the currently selected song title
    * @type {int}
    */
    SongPlayer.currentSongTitle = null;

    /**
    * @desc variable that stores the currently selected song title
    * @type {int}
    */
    SongPlayer.currentSongArtist = null;

    /**
    * @desc variable that stores the currently selected song total
    * @type {int}
    */
    SongPlayer.currentSongTotalTime = null;

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
    * @desc determines previous song and plays it, stops playing if current
    * song is first
    * no @param passed
    */
    SongPlayer.previous = function() {
      var currentSongIndex = getSongIndex(SongPlayer.currentSong);
      currentSongIndex--;

      if(currentSongIndex < 0) {
        stopSong();
      } else {
        var song = currentAlbum.songs[currentSongIndex];
        setSong(song);
        playSong(song);
      }
    };

    /**
    * @function SongPlayer.next
    * @desc determines next song and plays it, stops playing if current
    * song is last and sets current song to first
    * no @param passed
    */
    SongPlayer.next = function() {
      var currentSongIndex = getSongIndex(SongPlayer.currentSong);
      currentSongIndex++;

      if(currentSongIndex === currentAlbum.songs.length) {
        setSong(currentAlbum.songs[0]);
      } else {
        var song = currentAlbum.songs[currentSongIndex];
        setSong(song);
        playSong(song);
      }
    };

    /**
    * @function SongPlayer.setCurrentTime
    * @desc Set current time (in seconds) of currently playing song
    * @param {Number} time
    */
    SongPlayer.setCurrentTime = function(time) {
      if(currentBuzzObject) {
        currentBuzzObject.setTime(time);
      }
    };

    return SongPlayer;
  }

  angular
    .module('blocJams')
    .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
})();