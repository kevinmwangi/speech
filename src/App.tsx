import { useState, useEffect } from 'react';
import './App.css';

import { Controls } from './components/Controls';
import { CurrentlyReading } from './components/CurrentlyReading';
import { useSpeech } from './lib/useSpeech';
import { fetchContent, parseContentIntoSentences } from './lib/content';

function App(){
	const [ sentences, setSentences ] = useState<Array<string>>( [] );
	const { currentSentenceIdx, currentWordRange, playbackState, play, pause } = useSpeech( sentences );
	const [isLoading, setIsLoading] = useState(true);

	useEffect( () => {
		loadNewContent();
	}, [] );

	const loadNewContent = async () => {
		try {
			setIsLoading(true); // Start loading

			// Fetch content from API
			const content = await fetchContent();

			// Parse content into sentences
			const parsedSentences = await parseContentIntoSentences(content);

			// Handle case when no sentences are found
			if (!parsedSentences) {
				console.error("No sentences found in content");
				return;
			}

			// Set sentences state
			setSentences(parsedSentences);
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoading(false); // End loading
		}
	};

	return (
		<div className="app">
			<header className="app_header">
				<h1>Text to speech</h1>
			</header>
			<section className="app_body">
				<div className="currently_reading">
					{ isLoading ? (
						<div className="loading"><p>Loading <span className="dot">.</span><span className="dot">.</span><span className="dot">.</span></p></div>
					) : ( <CurrentlyReading
							currentWordRange={currentWordRange}
							currentSentenceIdx={currentSentenceIdx}
							sentences={sentences}
						/>
					)}
				</div>

				<div className="play_pause_controls">
					<Controls
						play={play}
						pause={pause}
						loadNewContent={() => {
							loadNewContent();
						}}
						state={playbackState}
					/>
				</div>
			</section>
		</div> );
}

export default App;
