import puppeteer from "puppeteer";

jest.setTimeout(60000);

describe("App.js", () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({headless : true});
    page = await browser.newPage();
    page.setDefaultNavigationTimeout(0);
  });

  it("contains the link to products", async () => {
    await page.goto("http://localhost:3000");
    await page.waitForSelector("#productlink");
    const text = await page.$eval("#productlink", (e) => e.textContent);
    expect(text).toContain("View All Products");
  });

  it("contains the link to categories", async () => {
    await page.goto("http://localhost:3000");
    await page.waitForSelector("#categorylink");
    const text = await page.$eval("#categorylink", (e) => e.textContent);
    expect(text).toContain("View All Categories");
  });

  it("contains the link to create product", async () => {
    await page.goto("http://localhost:3000");
    await page.waitForSelector("#productcreatelink");
    const text = await page.$eval("#productcreatelink", (e) => e.textContent);
    expect(text).toContain("Add New Product");
  });

  it("contains the link to chat", async () => {
    await page.goto("http://localhost:3000");
    await page.waitForSelector("#chatlink");
    const text = await page.$eval("#chatlink", (e) => e.textContent);
    expect(text).toContain("Chat");
  });

  it("navigates to the about page", async () => {
    await page.goto("http://localhost:3000");
    await page.waitForSelector("#about-page-link");
    const text = await page.$eval("#about-page-link", (e) => e.textContent);
    expect(text).toContain("About Us");
    await page.click("#about-page-link");
    await page.waitForSelector("#AboutUs");
    const text2 = await page.$eval("#AboutUs", (e) => e.textContent);
    expect(text2).toContain("This is the About us page");
  });

  it("navigates to multiple pages", async () => {
    const urls = ["http://localhost:3000/chat", "http://localhost:3000/products", "http://localhost:3000/categories",
                  "http://localhost:3000/login", "http://localhost:3000/register", "http://localhost:3000/cart",
                  "http://localhost:3000/product/1", "http://localhost:3000/category/1"]

    await page.goto("http://localhost:3000");
    for(let i = 0; i < urls.length; i++){
      const url = urls[i];
      await page.goto(`${url}`, { waitUntil: 'networkidle0' });
    }
  });

  afterAll(async () => await browser.close())
})