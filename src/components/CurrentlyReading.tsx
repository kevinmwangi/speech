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
	// const sentence = sentences[currentSentenceIdx];
	// const word = sentence?.slice(currentWordRange[0], currentWordRange[1]);
	//
	// const beforeWord = sentence?.slice(0, currentWordRange[0]);
	// const afterWord = sentence?.slice(currentWordRange[1]);

	const currentSentence = sentences[currentSentenceIdx] || "";
	const beforeWord = currentSentence.slice(0, currentWordRange[0]);
	const currentWord = currentSentence.slice(currentWordRange[0], currentWordRange[1]);
	const afterWord = currentSentence.slice(currentWordRange[1]);

	return (
		<div data-testid="currently-reading">
			<p className="current-sentence" data-testid="current-sentence">
				{/*{sentence} <span className="current_word" data-testid="current-word">{word}</span>*/}
				{beforeWord}<span className="current_word" data-testid="current-word">{currentWord}</span>{afterWord}
			</p>
			<p className="all-sentences">
				{sentences.join(' ')}
			</p>
		</div>
	);
};
