import { extractReadable } from './code';

import { JSDOM } from 'jsdom';
import { readFile, writeFile } from 'fs/promises';

const tester = (testName: string, caseName: string, hostname: string, generate: boolean) => {
    const testFn = generate ? test.only : test;

    testFn(testName, async () => {
        const html = await readFile(`testcases/${hostname}/${caseName}.html`, 'utf-8');
        const dom = new JSDOM(html);
        const result = extractReadable({
            doc: dom.window.document,
            hostname,
            resultDir: '0 Reading',
        });

        const expectedPath = `testcases/${hostname}/${caseName}.expected.html`
        if (generate) {
            await writeFile(expectedPath, result.readable!, 'utf-8');
        } else {
            const expected = await readFile(expectedPath, 'utf-8');
            expect(result.readable).toBe(expected);
        }
    })
}

describe('tags', () => {
    const hostname = 'example.com'
    describe('<article>', () => {
        const cases = [
            ['add correctly', 'add-article'],
        ]
        cases.forEach(([testName, caseName]) => tester(testName, caseName, hostname, false))
    })

    describe('<img>', () => {
        tester('src should be absolute', 'image-src', hostname, false)
    })
})

describe('sites', () => {
    describe('craftinginterpreters.com', () => {
        const hostname = 'craftinginterpreters.com';
        const cases = [
            ['add code block', 'code-block'],
            ['remove footer', 'footer'],
            ['chapter number: add space after small', 'chapter-number'],
        ]

        cases.forEach(([testName, caseName]) => tester(testName, caseName, hostname, false))
    })
})