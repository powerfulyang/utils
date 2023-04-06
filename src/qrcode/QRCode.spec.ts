import { QRCode } from '@/qrcode/QRCode';
import type { CanvasRenderingContext2D } from 'canvas';
import { Canvas, loadImage } from 'canvas';
import open from 'open';
import fs from 'fs';
import path from 'path';

describe('QRCode', () => {
  it('render ascii', () => {
    const result = QRCode.createASCII('hello world');
    expect(result).toBe(
      '' +
        '█████████████████████████\n' +
        '██ ▄▄▄▄▄ ██▄▀▄▄█ ▄▄▄▄▄ ██\n' +
        '██ █   █ █   ▄▀█ █   █ ██\n' +
        '██ █▄▄▄█ █ █▄▀▄█ █▄▄▄█ ██\n' +
        '██▄▄▄▄▄▄▄█ █ █▄█▄▄▄▄▄▄▄██\n' +
        '██▄▀ ▄  ▄▀█ █ ▀▀     █▀██\n' +
        '██ █ █▄ ▄▄█ ▄▀  ▄█▀  ▄███\n' +
        '█████▄█▄▄▄ ▄▀█ ▄▄█▀▀██ ██\n' +
        '██ ▄▄▄▄▄ █▀██▄█▀▄▀█▀  ▀██\n' +
        '██ █   █ █ ▀█▄▀▀  ▀▀██▄██\n' +
        '██ █▄▄▄█ █▄ ▀█ ▀█▄▀▀ ████\n' +
        '██▄▄▄▄▄▄▄█▄▄█▄▄█▄█▄██▄███\n' +
        '▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀',
    );
  });

  it('render canvas', (done) => {
    jest.setTimeout(100000);
    const canvas = new Canvas(396 * 2, 396 * 2, 'image');
    const logoImageUrl = 'https://wx2.sinaimg.cn/orj360/006lidWCgy1hbud8ew5svj30hs0hs75e.jpg';
    const mockDrawImage = async function drawImage(
      ctx: CanvasRenderingContext2D,
      _image: HTMLImageElement,
      dx: number,
      dy: number,
      dWidth: number,
      dHeight: number,
    ) {
      const image = await loadImage('assets/1061968.png');
      ctx.drawImage(image, dx, dy, dWidth, dHeight);
    };

    // @ts-ignore
    jest.spyOn(QRCode.prototype, 'drawImage').mockImplementation(mockDrawImage);

    QRCode.createCanvas('https://powerfulyang.com', canvas, {
      logoImage: logoImageUrl,
    }).then((_canvas) => {
      const _targetFile = path.join(process.cwd(), 'test.png');
      const out = fs.createWriteStream(_targetFile);
      _canvas.createJPEGStream().pipe(out);
      out.on('finish', () => {
        open(_targetFile, {
          app: {
            name: open.apps.chrome,
          },
        }).then(() => {
          done();
        });
      });
    });
  });
});
