import qrcode from 'qrcode-generator';
import type { Canvas } from 'canvas';
import { pick } from '@/utils/pick';

type LogoOptions = {
  // logo image
  crossOrigin?: string;
  logoOpacity?: number;
  logoImage?: string;
  logoWidth?: number;
  logoHeight?: number;
  logoMargin?: number;
  logoCornerRadius?: number;
};

type Options = {
  /**
   * @description The error correction level.
   * @default 'M'
   */
  errorCorrectionLevel?: ErrorCorrectionLevel;
  /**
   * @description The margin.
   * @default 10
   */
  padding?: number;
  bgColor?: string;
  fgColor?: string;
} & LogoOptions;

export class QRCode {
  private readonly errorCorrectionLevel: ErrorCorrectionLevel = 'M';

  private readonly bgColor: string = '#ffffff';

  private readonly fgColor: string = '#000000';

  private readonly padding: number = 10;

  private readonly logoOptions: LogoOptions;

  constructor(options: Options = {}) {
    this.errorCorrectionLevel = options.errorCorrectionLevel || this.errorCorrectionLevel;
    this.bgColor = options.bgColor || this.bgColor;
    this.fgColor = options.fgColor || this.fgColor;
    this.padding = options.padding || this.padding;
    this.logoOptions = pick(options, [
      'crossOrigin',
      'logoOpacity',
      'logoImage',
      'logoWidth',
      'logoHeight',
      'logoMargin',
      'logoCornerRadius',
    ]);
  }

  static createASCII(data: string, options?: Options) {
    const qrCode = new QRCode(options);
    return qrCode.renderASCII(data);
  }

  static createCanvas<T extends Canvas>(data: string, canvas: T, options?: Options) {
    const qrCode = new QRCode(options);
    qrCode.renderCanvas(data, canvas);
    return canvas;
  }

  renderASCII(data: string) {
    const qrCode = qrcode(0, this.errorCorrectionLevel);
    qrCode.addData(data);
    qrCode.make();
    return qrCode.createASCII();
  }

  renderCanvas<T extends Canvas>(data: string, canvas: T) {
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw new Error('No canvas context');
    }
    const qrCode = qrcode(0, this.errorCorrectionLevel);
    qrCode.addData(data);
    qrCode.make();
    const length = qrCode.getModuleCount();
    const canvasSize = canvas.width;
    const offset = this.padding;
    const cellSize = (canvasSize - offset * 2) / length;
    ctx.fillStyle = this.bgColor;
    ctx.fillRect(0, 0, canvasSize, canvasSize);

    ctx.strokeStyle = this.fgColor;
    ctx.lineWidth = 1;
    ctx.fillStyle = this.fgColor;
    ctx.beginPath();
    for (let row = 0; row < length; row++) {
      for (let col = 0; col < length; col++) {
        if (qrCode.isDark(row, col)) {
          const w = cellSize;
          const h = cellSize;
          const x = col * w + offset;
          const y = row * h + offset;
          ctx.rect(x, y, w, h);
        }
      }
    }
    ctx.fill();
    ctx.stroke();
    // todo logo
    console.log(this.logoOptions);
  }
}
