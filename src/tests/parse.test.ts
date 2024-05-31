import {
  describe,
  expect,
  it,
} from 'vitest';

import { parseContentIntoSentences } from '../lib/content';

const testCases = [
  {
    name: "Parses ssml with a single correctly formatted sentence",
    content: "<speak><s>This is a sentence.</s></speak>",
    expected: ["This is a sentence."],
  },
  {
    name: "Parses ssml with multiple correctly formatted ssml",
    content:
      "<speak><s>This is a sentence.</s><s>This is another sentence</s></speak>",
    expected: ["This is a sentence.", "This is another sentence"],
  },
  {
    name: "Parsed output ignores incorrectly formatted ssml",
    content:
      "<speak><s>This is a sentence.</s><s>This is another sentence</s>Some more text</speak>",
    expected: ["This is a sentence.", "This is another sentence"],
  },
  {
    name: "Parses output ignores incorrectly formatted ssml in between correctly formatted ssml",
    content:
      "<speak><s>This is a sentence.</s><s>This is another sentence</s>Some more text<s>This is a longer piece of content</s></speak>",
    expected: [
      "This is a sentence.",
      "This is another sentence",
      "This is a longer piece of content",
    ],
  },
  {
    name: "Parses correctly formatted ssml and ignores P tags",
    content: `<speak><p><s>This is a sentence.</s><s>This is another sentence.</s><p><speak>`,
    expected: ["This is a sentence.", "This is another sentence."],
  },
];

describe("parseContent Test Suite", () => {
  it("returns an array of sentences", async () => {
    const sentences = await parseContentIntoSentences(testCases[0].content);
    expect(sentences).toStrictEqual(testCases[0].expected);
  });

  it("returns an empty array when ssml is invalid or does not start with <speak>", async () => {
    const invalidContent = "This is not valid ssml";
    const sentences = await parseContentIntoSentences(invalidContent);
    expect(sentences).to.deep.equal([]);
  });

  it.each(testCases)("$name", async ({ content, expected }) => {
    const sentences = await parseContentIntoSentences(content);
    expect(sentences).to.deep.equal(expected);
  });
});
