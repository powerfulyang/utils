import { QRCode } from '@/qrcode/QRCode';
import type { CanvasRenderingContext2D } from 'canvas';
import { Canvas, loadImage } from 'canvas';
import open from 'open';

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

  it('render canvas', async () => {
    const canvas = new Canvas(396 * 2, 396 * 2);
    const mockDrawImage = async function drawImage(
      ctx: CanvasRenderingContext2D,
      _image: HTMLImageElement,
      dx: number,
      dy: number,
      dWidth: number,
      dHeight: number,
    ) {
      const image = await loadImage('https://avatars.githubusercontent.com/u/1061968?v=4');
      ctx.drawImage(image, dx, dy, dWidth, dHeight);
    };

    // @ts-ignore
    jest.spyOn(QRCode.prototype, 'drawImage').mockImplementation(mockDrawImage);

    await QRCode.createCanvas('https://powerfulyang.com', canvas, {
      logoImage: 'https://avatars.githubusercontent.com/u/1061968?v=4',
    });

    const base64 = canvas.toDataURL();

    await open(base64, {
      app: {
        name: open.apps.chrome,
      },
    });

    expect(base64).toBeDefined();
  });
});
