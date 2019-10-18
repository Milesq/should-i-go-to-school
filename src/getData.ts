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

export default async (page: puppeteer.Page): Promise<Lesson[]> => {
    await page.click(ARROW);
    await page.click(ARROW);
    await delay(30);

    const lessons = await getLessons(page);

    const down = () =>
        new Promise(resolve => {
            page.keyboard.press('ArrowDown');
            delay(300).then(resolve);
        });

    const space = () =>
        new Promise(resolve => {
            page.keyboard.press('Space');
            delay(1500).then(resolve);
        });

    const computedLessons: any[] = [];
    let i: number = 0;

    const next = () => page.click(ARROW).then(down).then(space);

    page.on('requestfinished', ev => {
        if (i >= lessons.length) return;

        computedLessons.push({
            type: lessons[i],
            res: ev.response().text()
        });

        ev.response().text();
        ++i;
        next();
    });

    next();

    await waitUntil(() => lessons.length === i, () => i);

    await page.screenshot({ path: 'example.png' });

    console.log(computedLessons);
    return [];
};

async function getLessons(page: puppeteer.Page): Promise<string[]> {
    return await page.evaluate((WRAPPER: string): string[] => {
        const elements = document.querySelector(WRAPPER).querySelectorAll('span');
        return Array.from(elements)
            .map(({ innerText }) => innerText)
            .slice(1, -1);
    }, WRAPPER);
}

function waitUntil(cb: () => boolean, elseCb: () => any, ms: number = 50) {
    return new Promise(resolve => {
        setInterval(() => {
            if (cb()) resolve();
            else console.log('test...', elseCb());
        }, ms);
    });
}
