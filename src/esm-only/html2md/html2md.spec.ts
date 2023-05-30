import { describe, expect, it } from '@jest/globals';
import clipboard from '@powerfulyang/clipboardy';
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

  it('should convert pre to markdown(pre+code+~)', async () => {
    const html = `
    <pre>
        <div>Copy code</div>
        <div>
        <code class="!whitespace-pre hljs language-javascript">console.log('hello world')
        </code>
        </div>
    </pre>
    `;
    const md = await html2md(html);
    expect(md).toBe(
      `\`\`\`javascript
console.log('hello world')
\`\`\``,
    );
  });

  it('should convert pre to markdown(pre+~)', async () => {
    const html = `
    <pre>
pip install -i https://mirrors.cloud.tencent.com/pypi/simple &lt;some-package&gt;
</pre>
    `;
    const md = await html2md(html);
    expect(md).toBe(`\`\`\`
pip install -i https://mirrors.cloud.tencent.com/pypi/simple <some-package>
\`\`\``);
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

  it('should convert math to markdown', async () => {
    const html = `<p>x= <span class="math math-inline"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo stretchy="false">(</mo><mo>−</mo><mn>1</mn><msup><mo stretchy="false">)</mo><mi>S</mi></msup></mrow><annotation encoding="application/x-tex">(-1)^ {S}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0913em;vertical-align:-0.25em"></span><span class="mopen">(</span><span class="mord">−</span><span class="mord">1</span><span class="mclose"><span class="mclose">)</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8413em"><span style="top:-3.063em;margin-right:0.05em"><span class="pstrut" style="height:2.7em"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight" style="margin-right:0.05764em">S</span></span></span></span></span></span></span></span></span></span></span></span></span> <span class="math math-inline"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo>×</mo></mrow><annotation encoding="application/x-tex">\\times</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6667em;vertical-align:-0.0833em"></span><span class="mord">×</span></span></span></span></span> (1.M) <span class="math math-inline"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo>×</mo></mrow><annotation encoding="application/x-tex">\\times</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6667em;vertical-align:-0.0833em"></span><span class="mord">×</span></span></span></span></span> <span class="math math-inline"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msup><mn>2</mn><mi>e</mi></msup></mrow><annotation encoding="application/x-tex">2^ {e}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6644em"></span><span class="mord"><span class="mord">2</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.6644em"><span style="top:-3.063em;margin-right:0.05em"><span class="pstrut" style="height:2.7em"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight">e</span></span></span></span></span></span></span></span></span></span></span></span></span><br>
<!-- -->e=E-1023</p>`;
    const md = await html2md(html);
    clipboard.writeSync(md);
    const res = clipboard.readSync();
    expect(res).toBe(`x= $ (-1)^ {S} $ $ \\times $ (1.M) $ \\times $ $ 2^ {e} $\\
e=E-1023`);
  });
});
