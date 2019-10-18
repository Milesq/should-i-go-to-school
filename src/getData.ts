// eslint-disable-next-line
import * as puppeteer from 'puppeteer';
import { delay } from './utils';

const ARROW = '#ext-expandtrigger-3';
const WRAPPER =
    '.x-list-inner-ct.x-show-selection.x-size-monitored.x-paint-monitored.x-no-row-lines.x-layout-auto';

export default async (page: puppeteer.Page): Promise<Array<string>> => {
    const lessons = await getLessons(page);
    page.keyboard.press('ArrowDown');
    page.keyboard.press('Space');

    return lessons;
};

async function getLessons(page: puppeteer.Page): Promise<Array<string>> {
    await page.click(ARROW);

    return await page.evaluate((WRAPPER: string): Array<string> => {
        const elements = document.querySelector(WRAPPER).querySelectorAll('span');
        return Array.from(elements).map(({ innerText }) => innerText);
    }, WRAPPER);
}
