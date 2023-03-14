import { html2md } from './html2md';

describe('html2md', () => {
  it('should convert html to markdown', async () => {
    const html = `
    <ul>
        <li><input type="checkbox">Chrome Extensions 可以进入 <code class="MarkdownContainer_inline-code__HOhIb cursor-text">chrome://extensions/shortcuts</code> 地址设置快捷键，比如给 <code class="MarkdownContainer_inline-code__HOhIb cursor-text">Google 翻译</code> 加一个快捷键，这样就不用每次点图标了。</li>
    </ul>
    <ul class="MarkdownContainer_contains-task-list__5pRp9">
      <li>还粗略了解了 Chrome Extensions 的开发
        <ul>
            <li>schema: <a rel="noreferrer" class="link" target="_blank" href="https://json.schemastore.org/chrome-manifest">https://json.schemastore.org/chrome-manifest</a></li>
        </ul>
      </li>
    </ul>
    <table class="table">
      <thead>
        <tr>
          <th>name</th>
          <th>type</th>
          <th>description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>name</td>
          <td>string</td>
          <td>name</td>
        </tr>
        <tr>
          <td>version</td>
          <td>string</td>
          <td>version</td>
        </tr>
      </tbody>
    </table>
    `;
    const md = await html2md(html);
    expect(md)
      .toBe(`+ [ ] Chrome Extensions 可以进入 \`chrome://extensions/shortcuts\` 地址设置快捷键，比如给 \`Google 翻译\` 加一个快捷键，这样就不用每次点图标了。

- 还粗略了解了 Chrome Extensions 的开发

  + schema: [https://json.schemastore.org/chrome-manifest](https://json.schemastore.org/chrome-manifest)

| name    | type   | description |
| ------- | ------ | ----------- |
| name    | string | name        |
| version | string | version     |`);
  });
});
