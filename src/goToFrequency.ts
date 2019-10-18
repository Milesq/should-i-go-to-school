// eslint-disable-next-line
import * as puppeteer from 'puppeteer';

import { delay } from './utils';

const UONET = 'https://uonetplus.vulcan.net.pl/bydgoszcz/LoginEndpoint.aspx';
const FREQUENCY_TAB = '#app-menu > div > *:nth-child(3)';
const SCHOOL_LINK = '#idAppUczenExt > a';
const STATS_LINK = '#frekwencjaTabId .x-button-el';

export default async (page: puppeteer.Page) => {
    await page.goto(UONET);

    const { LOGIN, PASS } = process.env;

    // Login
    await page.evaluate(
        (LOGIN: string, PASS: string) => {
            (<HTMLInputElement>document.getElementById('LoginName')).value = LOGIN;
            (<HTMLInputElement>document.getElementById('Password')).value = PASS;
        },
        LOGIN,
        PASS
    );

    await page.click('input[type=submit]');
    await page.waitForNavigation({ waitUntil: 'load' });

    // Go to frequency tab
    await page.click(SCHOOL_LINK); // Go to school

    await page.waitForSelector(FREQUENCY_TAB);
    await delay(3000);

    await page.click(FREQUENCY_TAB); // Got to frequency tab
    await delay(3000);

    await page.evaluate((STATS_LINK: string) => {
        (<HTMLElement>document.querySelectorAll(STATS_LINK)[1]).click();
    }, STATS_LINK);
};
