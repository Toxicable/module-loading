import { MypluginCliPage } from './app.po';

describe('myplugin-cli App', () => {
  let page: MypluginCliPage;

  beforeEach(() => {
    page = new MypluginCliPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
