import { useEffect, useState } from 'react';
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
	const [ playbackState, setPlaybackState ] = useState<PlayingState>( "paused" );

	const speechEngine = createSpeechEngine( {
		onBoundary: ( e ) => {
			setCurrentWordRange( [ e.charIndex || 0, e.charIndex + e.charLength || 0 ] );
		}, onEnd: () => {
			if ( currentSentenceIdx + 1 < sentences.length ) {
				setCurrentSentenceIdx( ( idx ) => idx < sentences.length - 1 ? idx + 1 : 0 );
			}
		}, onStateUpdate: ( state: PlayingState ) => {
			setPlaybackState( state )
		}
	} );

	useEffect( () => {
		if ( sentences.length > 0 && currentSentenceIdx < sentences.length ) {
			speechEngine.load( sentences[currentSentenceIdx] )
		}
	}, [ sentences, currentSentenceIdx ] );

	const play = () => {

		if ( !speechEngine.state.utterance && currentSentenceIdx < sentences.length ) {
			speechEngine.load( sentences[currentSentenceIdx] );
		}
		speechEngine.play();
	};
	const pause = () => {
		speechEngine.pause()
	};

	return {
		currentSentenceIdx, currentWordRange, playbackState, play, pause,
	};
};

export { useSpeech };
