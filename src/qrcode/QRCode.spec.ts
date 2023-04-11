import { QRCode } from '@/qrcode/QRCode';
import type { CanvasRenderingContext2D } from 'canvas';
import { Canvas, loadImage } from 'canvas';
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
    const canvas = new Canvas(396 * 2, 396 * 2, 'image');
    const logoImageUrl = '__tests__/assets/1061968.png';
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
        done();
      });
    });
  });
});
