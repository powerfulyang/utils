import { html2md } from './html2md';

describe('html2md', () => {
  it('should convert html to markdown', async () => {
    const html = `<ol><li>Frames and iframes, via <code>&lt;frame&gt;</code> and <code>&lt;iframe&gt;</code></li></ol><pre>1234</pre>`;
    const md = await html2md(html);
    expect(md).toBe('1. Frames and iframes, via `<frame>` and `<iframe>`\n\n```\n1234\n```');
  });
});
