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

            const readable = extractReadable(dom.window.document, 'all');
            // await writeFile('testcases/add-article.actual.html', readable!, 'utf-8');

            expect(readable).toBe(expected);
        })
    })
})

describe('sites', () => {
    describe('craftinginterpreters.com', () => {
        test.only('add code blocks correctly', async () => {
            const html = await readFile('testcases/craftinginterpreters.com/code-block.html', 'utf-8');

            const dom = new JSDOM(html);

            const readable = extractReadable(dom.window.document, 'craftinginterpreters.com');
            await writeFile('testcases/craftinginterpreters.com/code-block.actual.html', readable!, 'utf-8');

        })
    })
})