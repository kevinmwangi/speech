import {
  describe,
  expect,
  it,
} from 'vitest';

import {
  act,
  renderHook,
  waitFor,
} from '@testing-library/react';

import { useSpeech } from '../lib/useSpeech';

describe("useSpeech Test Suite", async () => {
  it("should return current sentence idx and current word range as well as playback state", async () => {
    const sentences = ["This is a sentence.", "This is another sentence."];
    const { result } = renderHook(() => useSpeech(sentences));

    // Wait for the hook's useEffect to run and load the sentences
    await waitFor(() => expect(result.current.currentSentenceIdx).toBe(0));


    expect(result.current.currentSentenceIdx).toBe(0);
    expect(result.current.currentWordRange).toEqual([0, 0]);
    expect(result.current.playbackState).toBe("paused");
  });
});
