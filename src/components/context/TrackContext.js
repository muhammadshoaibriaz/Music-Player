import {createContext, useCallback, useState} from 'react';
import {ToastAndroid} from 'react-native';
import {PlaybackContext} from './PlaybackContext';

const TrackContext = createContext();

const TrackProvider = ({children}) => {
  const [track, setTrack] = useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const {playTrack} = useContext(PlaybackContext);

  const playNextTrack = useCallback(() => {
    const nextIndex = currentTrackIndex + 1;
    if (nextIndex < track.length) {
      setCurrentTrackIndex(nextIndex);
      playTrack(track[nextIndex]?.track);
    } else {
      ToastAndroid.show('No next tracks are available', 3000);
    }
  }, [currentTrackIndex, track, playTrack]);

  const playPreviousTrack = useCallback(() => {
    const previousIndex = currentTrackIndex - 1;
    if (previousIndex >= 0) {
      setCurrentTrackIndex(previousIndex);
      playTrack(track[previousIndex]?.track);
    } else {
      ToastAndroid.show('No previous tracks', 3000);
    }
  }, [currentTrackIndex, track, playTrack]);

  const playRandomSong = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * track.length);
    playTrack(track[randomIndex]?.track);
  }, [track, playTrack]);

  return (
    <TrackContext.Provider
      value={{
        track,
        setTrack,
        currentTrackIndex,
        playNextTrack,
        playPreviousTrack,
        playRandomSong,
      }}>
      {children}
    </TrackContext.Provider>
  );
};

export {TrackProvider, TrackContext};
