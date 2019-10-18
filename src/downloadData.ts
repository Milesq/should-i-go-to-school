import { writeFileSync } from 'fs';
import * as puppeteer from 'puppeteer';
import goToFrequency from './goToFrequency';
import getData from './getData';

export default async () => {
    // Init
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.setViewport({
        width: 1920,
        height: 1080
    });

    await goToFrequency(page);

    const data = await getData(page);

    writeFileSync('./data.json', JSON.stringify(data));

    await browser.close();
};
