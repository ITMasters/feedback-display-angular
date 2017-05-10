import { FeedbackDisplayAngularPage } from './app.po';

describe('feedback-display-angular App', () => {
  let page: FeedbackDisplayAngularPage;

  beforeEach(() => {
    page = new FeedbackDisplayAngularPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
