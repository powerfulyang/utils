import { QRCode } from '@/qrcode/QRCode';
import { Canvas } from 'canvas';
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
    const canvas = new Canvas(200, 200);
    QRCode.createCanvas('hello world', canvas);
    const base64 = canvas.toDataURL();

    await open(base64, {
      app: {
        name: open.apps.chrome,
      },
    });

    expect(base64).toBeDefined();
  });
});
