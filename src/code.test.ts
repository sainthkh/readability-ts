import { add, extractReadable } from './code';

import { JSDOM } from 'jsdom';
import { readFile, writeFile } from 'fs/promises';

test('add', () => {
    expect(add(1, 2)).toBe(3);
})

describe('tags', () => {
    describe('<article>', () => {
        test('add correctly', async () => {
            const html = await readFile('testcases/add-article.html', 'utf-8');
            const expected = await readFile('testcases/add-article.expected.html', 'utf-8');
            const dom = new JSDOM(html);

            const readable = extractReadable(dom.window.document);
            // await writeFile('testcases/add-article.actual.html', readable!, 'utf-8');

            expect(readable).toBe(expected);
        })
    })
})