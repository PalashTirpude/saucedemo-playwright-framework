export class BasePage {

    constructor(page) {
        this.page = page;
    }

    /*--------------------------------------------------------Navigation--------------------------------------------------------*/

    async navigate(url) {
        await this.page.goto(url);
    }

    async getTitle() {
        return this.page.title();
    }

    async waitForURL(urlPattern) {
        await this.page.waitForURL(urlPattern)
    }

    /*--------------------------------------------------------Locator Factory----------------------------------------------------*/

    /**
     * Finds element(s) by a css or Xpath
     * @param {string} selector 
     * @returns {import ('@playwright/test').Locator}
     */
    locator(selector) {
        return this.page.locator(selector);
    }

    /**
     * Finds element(s) by role and additional options
     * @param {string} role 
     * @param {object} options 
     * @returns @returns {import ('@playwright/test').Locator} 
     */
    getByRole(role, options) {
        return this.page.getByRole(role, options);
    }

    /**
     * Finds element(s) by text content and additional options
     * @param {string} text 
     * @param {object} options 
     * @returns {import ('@playwright/test').Locator} 
     */
    getByText(text) {
        return this.page.getByText(text);
    }

    /**
     * Finds element(s) by label and additional options
     * @param {string} text 
     * @param {object} options 
     * @returns {import ('@playwright/test').Locator} 
     */
    getByLabel(text) {
        return this.page.getByLabel(text);
    }

    /**
     * Finds element(s) by placeholder and additional options
     * @param {string} text 
     * @returns {import ('@playwright/test').Locator} 
     */
    getByPlaceHolder(text) {
        return this.page.getByPlaceholder(text);
    }

    /**
     * Finds an element by its data-testid attribute
     * @param {string} testId 
     * @returns {import ('@playwright/test').Locator} 
     */
    getByTestId(testId) {
        return this.page.getByTestId(testId);
    }

    /**
     * Returns a frame by its name attribute
     * @param {string} name 
     * @returns {import ('@playwright/test').Frame | null} 
     */
    getByFrame(name) {
        return this.page.frame(name);
    }


    /**
     * clicks on given locator
     * @param {import('playwright/test').Locator} locator 
     */
    async click(locator) {
        await locator.click();
    }

    /**
     * Types text into the given locator (sets value directly)
     * @param {import('playwright/test').Locator} locator
     * @param {string} text 
     */
    async fill(locator, text) {
        await locator.fill(text);
    }

    /**
     * Checks a checkbox or radio button
     * @param {import('playwright/test').Locator} locator 
     */
    async check(locator) {
        await locator.check();
    }

    /**
     * Uncheck a checkbox
     * @param {import('playwright/test').Locator} locator 
     */
    async check(locator) {
        await locator.uncheck();
    }

    /**
     * Selects an option by its value
     * @param {import('playwright/test').Locator} locator 
     * @param {string} value 
     */
    async selectByValue(locator, value) {
        await locator.selectOption(value);
    }

    /**
     * Selects an option by its label
     * @param {import('playwright/test').Locator} locator 
     * @param {string} label 
     */
    async selectByLabel(locator, label) {
        await locator.selectOption({ label });
    }

    /**
     * Selects an option by its index
     * @param {import('playwright/test').Locator} locator 
     * @param {number} index 
     */
    async selectByIndex(locator, index) {
        await locator.selectOption({ index });
    }

    /*---------------------------------------------------------Screenshots------------------------------------------------------*/

    /**
     * Takes a screenshot of the current page
     * options are:
     * - fullPage: boolean (default: false) - Whether to capture the entire page or just the visible viewport.
     * - quality: number (0-100) - The quality of the screenshot, where 0 is the lowest and 100 is the highest. This option is only applicable for JPEG images.
     * - type: 'png' | 'jpeg' | 'webp' - The file format of the screenshot. If not specified, the format will be inferred from the file extension in the path.
     * @param {string} path - The file path to save the screenshot
     * @param {object} options - Additional options for the screenshot
     * @returns {Promise<Buffer>} - A promise that resolves to a buffer containing the screenshot data
     */
    async takeScreenshot(path, options) {
        return await this.page.screenshot({ path, ...options });
    }



}