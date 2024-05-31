const API_URL = "http://localhost:5174/content";

/**
 * Fetch the content from the api
 * In case of an error, return content as "<speak><s>There was an error</s></speak>"
 */


const fetchContent = (url = API_URL): Promise<string> => {
	return new Promise(async (resolve, reject) => { // Wrap in Promise
		try {
			const response = await fetch(url);
			if (!response.ok) {
				throw new Error("Error fetching content");
			}
			const data = await response.json();
			resolve(data.content); // Resolve on success
		} catch (error) {
			console.error(error);
			resolve("<speak><s>There was an error</s></speak>"); // Resolve with error message
		}
	});
};

/**
 * Parse the content into sentences, and return an array of sentences. Look at the Readme for sample input and expected output.
 * Avoid using DOMParser for implementing this function.
 */
const parseContentIntoSentences = (content: string): Promise<string[] | null> => {
	return new Promise((resolve) => {
		try {
			// SSML validation: Return empty array if invalid
			if (!content || !content.startsWith("<speak>")) {
				resolve([]); // Resolve with an empty array
				return;
			}

			// Sentence extraction (updated regex)
			const regex = /<s>\s*([^<]+?)\s*<\/s>/g; // Require at least one character between tags
			const matches = content.match(regex);
			const sentences = matches?.map((match) => match.replace(/<s>|<\/s>/g, "")) || [];


			// Ensure consistent return type (string[] | null)
			resolve(sentences || []); // Return null if no sentences are found
		} catch (error) {
			console.error(error);
			resolve([]);
		}
	});
};

export { fetchContent, parseContentIntoSentences };
