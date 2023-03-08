import { QRCode } from '@/qrcode/QRCode';
import type { CanvasRenderingContext2D } from 'canvas';
import { Canvas, loadImage } from 'canvas';
import open from 'open';
import fs from 'fs';

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
    const logoImageUrl =
      'https://lh3.googleusercontent.com/a/AEdFTp594x_TQ1fTF1FbP6p7wDSici10pOZc5PKwaShKBA=s96-c';
    const mockDrawImage = async function drawImage(
      ctx: CanvasRenderingContext2D,
      _image: HTMLImageElement,
      dx: number,
      dy: number,
      dWidth: number,
      dHeight: number,
    ) {
      const image = await loadImage(logoImageUrl);
      ctx.drawImage(image, dx, dy, dWidth, dHeight);
    };

    // @ts-ignore
    jest.spyOn(QRCode.prototype, 'drawImage').mockImplementation(mockDrawImage);

    QRCode.createCanvas('https://powerfulyang.com', canvas, {
      logoImage: logoImageUrl,
    }).then((_canvas) => {
      const _targetFile = 'test.png';
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
