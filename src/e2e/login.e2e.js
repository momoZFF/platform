import puppeteer from 'puppeteer';

describe('Login', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch();
  });

  beforeEach(async () => {
    page = await browser.newPage();
    // await page.goto('http://localhost:8000/#/user/login');
    await page.evaluate(() => window.localStorage.setItem('antd-pro-authority', 'guest'));
  });

  afterEach(() => page.close());

  it('should login with failure', async () => {
    await page.type('#userName', 'mockuser');
    await page.type('#password', 'wrong_password');
    await page.click('button[type="submit"]');
    await page.waitForSelector('.ant-alert-error'); // should display error
  });

  it('should login successfully', async () => {
    await page.type('#userName', 'admin');
    await page.type('#password', '888888');
    await page.click('button[type="submit"]');
    await page.waitForSelector('.ant-layout-sider h1'); // should display error
    const text = await page.evaluate(() => document.body.innerHTML);
    expect(text).toContain('<h1>苏州大数据服务平台</h1>');
  });

  afterAll(() => browser.close());
});
