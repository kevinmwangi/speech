/**
 * Implement the CurrentlyReading component here
 * This component should have the following,
 * - A container tag with text containing all sentences supplied
 * - A p tag containing the current sentence with testID "current-sentence"
 * - A span tag inside the p tag containing the current word with testID "current-word"
 *
 * See example.gif for an example of how the component should look like, feel free to style it however you want as long
 * as the testID exists
 */
export const CurrentlyReading = ( {
	currentWordRange, currentSentenceIdx, sentences,
}: {
	currentWordRange: [ number, number ]; currentSentenceIdx: number; sentences: string[];
} ) => {
	const sentence = sentences[currentSentenceIdx];
	let startIdx = currentWordRange[0];
	while ( startIdx > 0 && sentence[startIdx] !== ' ' ) {
		startIdx--;
	}

	let endIdx = currentWordRange[1];
	while ( endIdx < sentence?.length && sentence[endIdx] !== ' ' ) {
		endIdx++;
	}

	const beforeWord = sentence?.slice( 0, startIdx );
	const word = sentence?.slice( startIdx, endIdx );
	const afterWord = sentence?.slice( endIdx );


	return ( <div data-testid="currently-reading">
			<p className="current-sentence" data-testid="current-sentence">
				{beforeWord}<span className="current_word" data-testid="current-word">{word}</span>{afterWord}
			</p>

			<p className="all-sentences">
				{sentences.join( ' ' )}
			</p>
		</div> )
};
