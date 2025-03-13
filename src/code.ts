export const add = (a: number, b: number) => a + b;

export const extractReadable = (doc: Document) => {
    const article = doc.querySelector('article');

    return article?.innerHTML;
}