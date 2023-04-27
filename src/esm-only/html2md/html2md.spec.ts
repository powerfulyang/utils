import { describe, expect, it } from '@jest/globals';
import { html2md } from './html2md';

describe('html2md', () => {
  it('should convert table to markdown', async () => {
    const html = `
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
    expect(md).toBe(
      `| name    | type   | description |
| ------- | ------ | ----------- |
| name    | string | name        |
| version | string | version     |`,
    );
  });

  it('should convert ul to markdown', async () => {
    const html = `
    <ul>
      <li>name</li>
      <li>version</li>
    </ul>
    `;
    const md = await html2md(html);
    expect(md).toBe(
      `+ name
+ version`,
    );
  });

  it('should convert ol to markdown', async () => {
    const html = `
    <ol>
      <li>name</li>
      <li>version</li>
    </ol>
    `;
    const md = await html2md(html);
    expect(md).toBe(
      `1. name
2. version`,
    );
  });

  it('should convert pre to markdown', async () => {
    const html = `
    <pre>
        <div>Copy code</div>
        <code class="!whitespace-pre hljs language-javascript">console.log('hello world')
        </code>
    </pre>
    `;
    const md = await html2md(html);
    expect(md).toBe(
      `\`\`\`javascript
console.log('hello world')
\`\`\``,
    );
  });

  it('should convert p to markdown', async () => {
    const html = `
    <p>hello world</p>
    `;
    const md = await html2md(html);
    expect(md).toBe(`hello world`);
  });

  it('should convert checkbox to markdown', async () => {
    const html = `
    <ul>
      <li><input type="checkbox" checked="checked">name</li>
      <li><input type="checkbox">version</li>
    </ul>
    `;
    const md = await html2md(html);
    expect(md).toBe(
      `+ [x] name
+ [ ] version`,
    );
  });
});
