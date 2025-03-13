export const add = (a: number, b: number) => a + b;

export const extractReadable = (doc: Document, context: string) => {
    const article = doc.querySelector('article');

    if (context === 'craftinginterpreters.com') {
        // code block
        article?.querySelectorAll('.codehilite pre').forEach(pre => {
            const codeElement = doc.createElement('code');
            const lines = pre.innerHTML.split('\n');
            let minIndent = 10000;
            lines.forEach((line, i) => {
                if (i === 0) return;

                let count = 0
                while (line[count] === ' ') {
                    count++;
                }

                if (count < minIndent) {
                    minIndent = count;
                }
            })
            const trimmed =
                minIndent === 10000
                    ? lines.join('\n')
                    : lines.map((line, i) => i === 0 ? line : line.slice(minIndent)).join('\n');
            codeElement.innerHTML = trimmed;
            pre.innerHTML = '';
            pre.appendChild(codeElement);
        })

        // remove footer
        article?.querySelectorAll('footer').forEach(footer => { footer.remove() })

        // add space after <small>
        article?.querySelectorAll('a small').forEach(small => {
            const html = small.innerHTML;
            small.innerHTML = html + ' ';
        })
    }

    return article?.innerHTML;
}