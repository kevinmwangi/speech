import { useEffect, useState } from 'react';
import { createSpeechEngine, PlayingState } from './speech';

/*
  @description
  Implement a custom useSpeech hook that uses a speech engine defined in 'speech.ts'
  to play the sentences that have been fetched and parsed previously.
  
  This hook should return react friendly controls for playing, and pausing audio as well as provide information about
  the currently read word and sentence
*/
const useSpeech = (sentences: Array<string>) => {
  const [currentSentenceIdx, setCurrentSentenceIdx] = useState(0);
  const [currentWordRange, setCurrentWordRange] = useState([0, 0]);
  const [playbackState, setPlaybackState] = useState<PlayingState>("paused");

  const speechEngine = createSpeechEngine({
    onBoundary: (e) => {
      setCurrentSentenceIdx(e.charIndex, e.charLength);
    },
    onEnd: (e) => {
      setCurrentSentenceIdx((idx) => idx + 1);
    },
    onStateUpdate: (state: PlayingState) => {
      setPlaybackState(state)
    }
  });

  useEffect(() => {
    if ( sentences.length > 0 ){
      speechEngine.load(sentences[currentSentenceIdx])
    }
  },[sentences, currentSentenceIdx]);

  const play = () => {
    speechEngine.play();
  };
  const pause = () => {
    speechEngine.pause()
  };

  return {
    currentSentenceIdx,
    currentWordRange,
    playbackState,
    play,
    pause,
  };
};

export { useSpeech };
