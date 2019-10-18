// eslint-disable-next-line
import * as puppeteer from 'puppeteer';
import { delay } from './utils';

const ARROW = '#ext-expandtrigger-3';
const WRAPPER =
    '.x-list-inner-ct.x-show-selection.x-size-monitored.x-paint-monitored.x-no-row-lines.x-layout-auto';

interface Lesson {
    readonly type: string;
    readonly presence: number;
    readonly absence: number;
}

// export default async (page: puppeteer.Page): Promise<Lesson[]> => {
export default async (page: puppeteer.Page): Promise<string> => {
    await page.click(ARROW);
    await page.click(ARROW);
    await delay(30);

    const lessons = await getLessons(page);

    const press = async (key: string) => page.keyboard.press(key);

    const next = () =>
        page
            .click(ARROW)
            .then(() => delay(30))
            .then(() => press('ArrowDown'))
            .then(() => delay(30))
            .then(() => press('Space'))
            .then(() => delay(300));

    const computedLessons: any[] = [];
    let i: number = 0;

    page.on('requestfinished', async ev => {
        if (i >= lessons.length) return;

        computedLessons.push({
            type: lessons[i],
            resp: await ev.response().text()
        });

        ++i;
        next();
    });

    next();

    await waitUntil(() => lessons.length === i, () => i);

    await page.screenshot({ path: 'example.png' });
    await page.close();

    return JSON.stringify(computedLessons);
};

async function getLessons(page: puppeteer.Page): Promise<string[]> {
    return await page.evaluate((WRAPPER: string): string[] => {
        const elements = document.querySelector(WRAPPER).querySelectorAll('span');
        return Array.from(elements)
            .map(({ innerText }) => innerText)
            .slice(1, -1);
    }, WRAPPER);
}

function waitUntil(cb: () => boolean, uncompleteCb: () => void = () => {}, ms: number = 50) {
    return new Promise(resolve => {
        const id = setInterval(() => {
            if (cb()) {
                clearInterval(id);
                resolve();
            } else uncompleteCb();
        }, ms);
    });
}
