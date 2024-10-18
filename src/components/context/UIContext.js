import {createContext, useState} from 'react';

const UIContext = createContext();

const UIProvider = ({children}) => {
  const [playingTitle, setPlayingTitle] = useState('');
  const [artistName, setArtistName] = useState('');
  const [playingImage, setPlayingImage] = useState('');
  const [backgroundColor, setBackgroundColor] = useState('');

  return (
    <UIContext.Provider
      value={{
        playingTitle,
        setPlayingTitle,
        artistName,
        setArtistName,
        playingImage,
        setPlayingImage,
        backgroundColor,
        setBackgroundColor,
      }}>
      {children}
    </UIContext.Provider>
  );
};

export {UIProvider, UIContext};
