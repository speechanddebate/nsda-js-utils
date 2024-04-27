import { assert } from 'chai';
import { vi } from 'vitest';
import { randomPhrase } from './randomPhrase.js';

describe('Random Phrase helper', () => {
    it('should return a random phrase', () => {
        const phrase1 = randomPhrase();
        const phrase2 = randomPhrase();
        assert.isString(phrase1, 'Returns a string');
        assert.match(phrase1, /[a-zA-Z]/, 'Contains letters');
        assert.match(phrase1, /\d/, 'Contains numbers');
        assert.notEqual(phrase1, phrase2, 'Different phrases');

        // Avoids stupid numbers because kids are stupider
        vi.spyOn(Math, 'random').mockReturnValue(0.069);
        assert.isFalse(randomPhrase().includes('69'));
        assert.isTrue(randomPhrase().includes('70'));

        vi.spyOn(Math, 'random').mockReturnValue(0.42);
        assert.isFalse(randomPhrase().includes('420'));
        assert.isTrue(randomPhrase().includes('421'));

        vi.spyOn(Math, 'random').mockReturnValue(0.667);
        assert.isFalse(randomPhrase().includes('666'));
        assert.isTrue(randomPhrase().includes('667'));

        vi.restoreAllMocks();
    });
});
