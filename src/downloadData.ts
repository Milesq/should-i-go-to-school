const puppeteer = require('puppeteer');
import goToFrequency from './goToFrequency';

export default async () => {
    // Init
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.setViewport({
        width: 1920,
        height: 1080
    });

    await goToFrequency(page);

    await page.screenshot({ path: 'example.png' });
    await browser.close();
};
