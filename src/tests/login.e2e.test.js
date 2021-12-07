import puppeteer from "puppeteer";

jest.setTimeout(3000000);

describe("App.js", () => {
    let browser;
    let page;

    beforeAll(async () => {
        browser = await puppeteer.launch({ headless: false});
        page = await browser.newPage();
        page.setDefaultNavigationTimeout(0);
    });

    it("shows an error message if authentication fails", async () => {
        await page.goto("http://localhost:3000/login");
        await page.waitForSelector("#formheader");

        await page.click("#EmailInput");
        await page.type("#EmailInput", "username@gmail.com");

        await page.click("#PasswordInput");
        await page.type("#PasswordInput", "password123");

        await page.click("#LoginButton");

        await page.waitForSelector("#LoginErrors");

        const text = await page.$eval("#LoginErrors", (e) => e.textContent);
        expect(text).toContain("Invalid login request");
    });

    it("shows message if authentication succeeds", async () => {


        await page.goto("http://localhost:3000/login");
        await page.waitForSelector("#formheader");

        await page.click("#EmailInput");
        await page.type("#EmailInput", "test@example.com");

        await page.click("#PasswordInput");
        await page.type("#PasswordInput", "Test2021!");

        await page.click("#LoginButton");

        page.on("dialog", async dialog => {
            await page.evaluate(() => alert('Logged in succesfully'))
            expect(dialog.message).toEqual('Logged in succesfully');
            await dialog.accept();
        });
    });

    afterAll(async () => await browser.close())
})