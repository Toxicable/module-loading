import { ModuleLoadingPage } from './app.po';

describe('module-loading App', function() {
  let page: ModuleLoadingPage;

  beforeEach(() => {
    page = new ModuleLoadingPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
