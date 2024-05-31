import { useState, useEffect } from 'react';
import './App.css';

import { Controls } from './components/Controls';
import { CurrentlyReading } from './components/CurrentlyReading';
import { useSpeech } from './lib/useSpeech';
import { fetchContent, parseContentIntoSentences } from './lib/content';

function App(){
	const [ sentences, setSentences ] = useState<Array<string>>( [] );
	const { currentSentenceIdx, currentWordRange, playbackState, play, pause } = useSpeech( sentences );

	useEffect( () => {
		loadNewContent();
	}, [] );

	const loadNewContent = async () => {
		try {
			const content = await fetchContent();
			const parsedSentences = parseContentIntoSentences(content) || [];
			setSentences(parsedSentences);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="app">
			<header className="app_header">
				<h1>Text to speech</h1>
			</header>
			<section className="app_body">
				<div className="currently_reading">
					<CurrentlyReading
						currentWordRange={currentWordRange}
						currentSentenceIdx={currentSentenceIdx}
						sentences={sentences}
					/>
				</div>
				<div className="play_pause_controls">
					<Controls
						play={play}
						pause={pause}
						loadNewContent={() => { loadNewContent(); }}
						state={playbackState}
					/>
				</div>
			</section>
		</div>
	);
}

export default App;
