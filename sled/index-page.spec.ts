/// <reference types="@wix/sled-test-runner" />
import { Page } from 'puppeteer';
import { injectBMOverrides } from 'yoshi-flow-bm';
import { TextTestkit } from 'wix-style-react/dist/testkit/puppeteer';

describe('happy flow', () => {
  let _page: Page;

  const SLED_DEFAULT_MSID = 'eeaf3519-1406-45f0-a8ea-a59a4ecbc1a6';

  beforeEach(async () => {
    const { page } = await sled.newPage({
      authType: 'free-user',
    });

    _page = page;

    await injectBMOverrides({
      page,
      appConfig: require('../target/module-sled.merged.json'),
    });

    const bmUrl = `https://www.wix.com/dashboard/${SLED_DEFAULT_MSID}/test`;

    await _page.goto(bmUrl);
  });

  it('should render dashboard home for authenticated user', async () => {
    const textTestkit = await TextTestkit({
      page: _page,
      dataHook: 'get-started',
    });

    const text = await textTestkit.getText();
    expect(text).toMatch(/Get started .+here.+/);
  });
});
