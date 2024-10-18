import {createContext, useCallback, useRef, useState} from 'react';
import {ToastAndroid} from 'react-native';
import SoundPlayer from 'react-native-sound-player';

const PlaybackContext = createContext();

const PlaybackProvider = ({children}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPause, setIsPause] = useState(false);
  const [sound, setSound] = useState(null);
  const [looping, setLooping] = useState(false);
  const loopingRef = useRef(looping);

  const playTrack = track => {
    if (sound) {
      SoundPlayer.stop();
    }

    const previewUrl = track?.preview_url;
    if (previewUrl) {
      setIsPlaying(true);
      setSound(previewUrl);
      SoundPlayer.playUrl(previewUrl);
    } else {
      setIsPlaying(false);
      ToastAndroid.show('Audio link not found', 3000);
    }

    SoundPlayer.addEventListener('FinishedPlaying', ({success}) => {
      if (success && loopingRef.current) {
        SoundPlayer.playUrl(previewUrl);
      } else {
        setIsPlaying(false);
      }
    });
  };

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

  const toggleLoop = () => {
    setLooping(!looping);
    loopingRef.current = !looping;
  };

  return (
    <PlaybackContext.Provider
      value={{
        isPlaying,
        isPause,
        playTrack,
        pauseSong,
        resumeSong,
        toggleLoop,
        looping,
      }}>
      {children}
    </PlaybackContext.Provider>
  );
};

export {PlaybackProvider, PlaybackContext};
