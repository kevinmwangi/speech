import { useEffect, useState, useRef } from 'react';
import { createSpeechEngine, PlayingState } from './speech';

/*
  @description
  Implement a custom useSpeech hook that uses a speech engine defined in 'speech.ts'
  to play the sentences that have been fetched and parsed previously.
  
  This hook should return react friendly controls for playing, and pausing audio as well as provide information about
  the currently read word and sentence
*/
const useSpeech = ( sentences: Array<string> ) => {
	const [ currentSentenceIdx, setCurrentSentenceIdx ] = useState( 0 );
	const [ currentWordRange, setCurrentWordRange ] = useState<[ number, number ]>( [ 0, 0 ] );
	const [ playbackState, setPlaybackState ] = useState<PlayingState>( 'ended' );

	const speechEngine = createSpeechEngine( {
		onBoundary: ( e ) => {
			setCurrentWordRange( [ e.charIndex, (e.charIndex + e.charLength) ] );
		}, onEnd: () => {
			if (playbackState === 'playing') {
				if ((currentSentenceIdx + 1) < sentences.length) {
					setCurrentSentenceIdx(prevIdx => prevIdx + 1); // Move to next sentence
					setPlaybackState('playing');
				} else {
					setPlaybackState('ended'); // All sentences played
				}
			}
		}, onStateUpdate: ( state: PlayingState ) => {
			setPlaybackState( state );
		},
	} );

	useEffect( () => {
		if (sentences.length > 0) {
			speechEngine.load(sentences[currentSentenceIdx]);
			// Autoplay if the state is 'playing'
			if (playbackState === 'playing') {
				speechEngine.play();
			}
		}
	}, [sentences, currentSentenceIdx, playbackState]); // Add playbackState as a dependency

	const play = () => {
		if (playbackState === 'ended') {
			setCurrentSentenceIdx(0); // Restart from the beginning if ended
		}
		speechEngine.play();
	};
	const pause = () => {
		speechEngine.pause();
	};

	return {
		currentSentenceIdx, currentWordRange, playbackState, play, pause,
	};
};

export { useSpeech };
