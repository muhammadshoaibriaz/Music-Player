import {createContext, useCallback, useRef, useState} from 'react';
import {ToastAndroid} from 'react-native';
import SoundPlayer from 'react-native-sound-player';

const PlayingContext = createContext();

const PlayingProvider = ({children}) => {
  const [playingTitle, setPlayingTitle] = useState('');
  const [backgroundColor, setBackgroundColor] = useState('');
  const [artistName, setArtistName] = useState('');
  const [playingImage, setPlayingImage] = useState('');
  const [songUrl, setSongUrl] = useState('');
  const [items, setItems] = useState(null);
  const [track, setTrack] = useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [playListName, setPlayListName] = useState('');
  const [artistSong, setArtistSong] = useState(null);

  // this is for setting track to favorite
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPause, setIsPause] = useState(false);
  const [sound, setSound] = useState(null);
  const [looping, setLooping] = useState(false);
  const loopingRef = useRef(looping);

  const playTrack1 = track => {
    if (sound) {
      SoundPlayer.stop();
    }
    const preview_url = track?.preview_url;
    // console.log('track is ', track);
    try {
      setPlayingImage(track?.album?.images[0].url);
      setPlayingTitle(track?.name);
      setArtistName(track?.artists[0]?.name);
      setCurrentTrack(track);
      setIsPlaying(true);
      setIsPause(false);
      if (preview_url !== null) {
        setSound(preview_url);
        SoundPlayer.playUrl(preview_url);
      } else {
        setIsPlaying(false);
        return ToastAndroid.show('Audio link not found ', 3000);
      }
      try {
        SoundPlayer.addEventListener('FinishedPlaying', ({success}) => {
          console.log('finished playing', success);
          if (success) {
            if (loopingRef.current) {
              setIsPlaying(true);
              SoundPlayer.playUrl(preview_url);
            } else {
              setIsPlaying(false);
            }
          } else {
            setIsPlaying(false);
          }
        });
      } catch (err) {
        console.log('Error while playing song', err);
      }
    } catch (error) {
      console.log('Error while playing song', error);
    }
  };

  // toggle loop
  const toggleLoop = () => {
    setLooping(!looping);
    loopingRef.current = !looping;
  };

  // for Playing next song on button click
  const playNextTrack = useCallback(() => {
    const nextIndex = currentTrackIndex + 1;
    console.log('nextIndex', nextIndex);
    if (nextIndex < track.length) {
      setCurrentTrackIndex(nextIndex);
      playTrack1(track[nextIndex]?.track);
      // console.log('current track index ', track[nextIndex]?.track);
    } else {
      setIsPlaying(false);
      ToastAndroid.show('No next tracks are available', 3000);
    }
  }, [currentTrackIndex, track, playTrack1]);

  // for Playing previous song on button click
  const playPreviousTrack = useCallback(() => {
    const previousIndex = currentTrackIndex - 1;
    if (previousIndex >= 0) {
      setCurrentTrackIndex(previousIndex);
      playTrack1(track[previousIndex]?.track);
      // console.log('current track index ', track[nextIndex]?.track);
    } else {
      ToastAndroid.show('No previous tracks ', 3000);
    }
  }, [currentTrackIndex, track, playTrack1]);

  // play random songs from list of songs
  const playRandomSong = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * track.length);
    if (randomIndex) {
      // console.log('random index is ', randomIndex);
      setCurrentTrack(randomIndex);
      playTrack1(track[randomIndex]?.track);
    } else {
      ToastAndroid.show('No songs found', 3000);
    }
    // console.log(track[randomIndex]?.track);
  }, [currentTrackIndex, track, playTrack1]);

  const pauseSong = () => {
    if (isPlaying) {
      setIsPause(true);
      SoundPlayer.pause();
    }
  };
  const resumeSong = () => {
    if (sound && isPlaying) {
      setIsPause(false);
      SoundPlayer.resume();
    }
  };

  const repeatSong = useCallback(() => {
    playTrack1(track[currentTrackIndex]?.track);
  }, []);

  // Artist songs
  const playArtistSong = useCallback(
    track => {
      if (sound || artistSong) {
        SoundPlayer.stop();
      }
      try {
        const previewUrl = track?.preview_url;
        if (previewUrl && previewUrl !== null) {
          SoundPlayer.playUrl(previewUrl);
        } else {
          ToastAndroid.show('Music url not found', 3000);
        }
        // console.log(track);
        // console.log(previewUrl);
      } catch (error) {
        console.log('Error while playing song', error);
      }
    },
    [artistSong, setArtistSong],
  );

  return (
    <PlayingContext.Provider
      value={{
        isPlaying,
        playingTitle,
        artistName,
        setArtistName,
        setPlayingTitle,
        playingImage,
        setPlayingImage,
        songUrl,
        setSongUrl,
        items,
        setItems,
        setIsPlaying,
        playTrack1,
        pauseSong,
        resumeSong,
        sound,
        backgroundColor,
        setBackgroundColor,
        track,
        setTrack,
        playNextTrack,
        playPreviousTrack,
        setCurrentTrackIndex,
        currentTrackIndex,
        currentTrack,
        setCurrentTrack,
        playListName,
        setPlayListName,
        playRandomSong,
        repeatSong,
        playArtistSong,
        isPause,
        setIsPause,
        looping,
        setLooping,
        toggleLoop,
        loopingRef,
      }}>
      {children}
    </PlayingContext.Provider>
  );
};

export {PlayingProvider, PlayingContext};
