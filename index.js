const { AxePuppeteer } = require('@axe-core/puppeteer');
const puppeteer = require('puppeteer');
const { createHtmlReport } = require("axe-html-reporter");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setBypassCSP(true);

  await page.goto('https://coffeentech.com.br/');

  const results = await new AxePuppeteer(page).disableRules('color-contrast').analyze();
  console.log(results.violations);
  createHtmlReport({
    results
  });

  await page.close();
  await browser.close();
})();