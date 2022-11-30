import qrcode from 'qrcode-generator';
import type { Canvas } from 'canvas';
import { pick } from '@/utils/pick';

type LogoOptions = {
  // logo image
  crossOrigin?: 'anonymous' | 'use-credentials';
  logoOpacity?: number;
  logoImage?: string;
  logoWidth?: number;
  logoHeight?: number;
  logoMargin?: number;
};

type Options = {
  /**
   * @description The error correction level.
   * @default 'M'
   */
  errorCorrectionLevel?: ErrorCorrectionLevel;
  /**
   * @description The margin.
   * @default 13
   */
  padding?: number;
  cellPadding?: number;
  bgColor?: string;
  fgColor?: string;
} & LogoOptions;

export class QRCode {
  private readonly devicePixelRatio = window.devicePixelRatio;

  private readonly errorCorrectionLevel: ErrorCorrectionLevel = 'M';

  private readonly bgColor: string = '#ffffff';

  private readonly fgColor: string = 'rgb(61, 63, 67)';

  private readonly padding: number = 13 * this.devicePixelRatio;

  private readonly logoOptions: LogoOptions;

  private readonly cellPadding: number = 2 * this.devicePixelRatio;

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
    ]);
  }

  static createASCII(data: string, options?: Options) {
    const qrCode = new QRCode(options);
    return qrCode.renderASCII(data);
  }

  static async createCanvas<T extends Canvas>(data: string, canvas: T, options?: Options) {
    const qrCode = new QRCode(options);
    await qrCode.renderCanvas(data, canvas);
    return canvas;
  }

  renderASCII(data: string) {
    const qrCode = qrcode(0, this.errorCorrectionLevel);
    qrCode.addData(data);
    qrCode.make();
    return qrCode.createASCII();
  }

  async renderCanvas<T extends Canvas>(data: string, canvas: T) {
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw new Error('No canvas context');
    }
    const qrCode = qrcode(0, this.errorCorrectionLevel);
    qrCode.addData(data);
    qrCode.make();
    const moduleCount = qrCode.getModuleCount();
    const canvasSize = canvas.width;
    const offset = this.padding;
    const cellSize = (canvasSize - offset * 2) / moduleCount;
    ctx.fillStyle = this.bgColor;
    ctx.fillRect(0, 0, canvasSize, canvasSize);

    ctx.fillStyle = this.fgColor;
    ctx.beginPath();
    const cellPadding = this.cellPadding || 0;
    for (let row = 0; row < moduleCount; row++) {
      for (let col = 0; col < moduleCount; col++) {
        if (qrCode.isDark(row, col)) {
          if (
            this.isInPositionZone(row, col, moduleCount) ||
            this.isInAlignmentZone(row, col, moduleCount)
          ) {
            ctx.rect(offset + col * cellSize, offset + row * cellSize, cellSize, cellSize);
          } else {
            const w = cellSize - cellPadding * 2;
            const h = cellSize - cellPadding * 2;
            const cx = col * cellSize + offset + cellPadding;
            const cy = row * cellSize + offset + cellPadding;
            ctx.rect(cx, cy, w, h);
          }
        }
      }
    }
    ctx.fill();
    await this.drawLogo(cellSize, canvasSize, moduleCount, ctx);
  }

  private async drawLogo(
    cellSize: number,
    canvasSize: number,
    moduleCount: number,
    _ctx: CanvasRenderingContext2D,
  ) {
    const ctx = _ctx;
    let { logoWidth, logoHeight } = this.logoOptions;
    const { logoImage, logoOpacity, crossOrigin, logoMargin } = this.logoOptions;
    if (!logoImage) {
      return Promise.resolve();
    }
    if (!ctx) {
      throw new Error('No canvas context');
    }
    // draw bgColor in logo margin
    const margin = logoMargin || cellSize;
    const logoModuleCount = Math.floor(moduleCount / 4);
    // (moduleCount / 4) is even
    if (logoModuleCount % 2 === 0) {
      logoWidth = logoWidth || cellSize * 5;
      logoHeight = logoHeight || cellSize * 5;
    } else {
      logoWidth = logoWidth || cellSize * 4;
      logoHeight = logoHeight || cellSize * 4;
    }
    const dxLogo = (canvasSize - logoWidth) / 2;
    const dyLogo = (canvasSize - logoHeight) / 2;
    // draw logo background
    ctx.fillStyle = this.bgColor;
    ctx.fillRect(dxLogo - margin, dyLogo - margin, logoWidth + margin * 2, logoHeight + margin * 2);
    // draw logo image
    const logo = new Image();
    if (crossOrigin) {
      logo.crossOrigin = crossOrigin;
    }
    return new Promise((resolve, reject) => {
      logo.onload = async () => {
        ctx.save();
        // eslint-disable-next-line no-param-reassign
        ctx.globalAlpha = logoOpacity || 1;
        await this.drawImage(ctx, logo, dxLogo, dyLogo, logoWidth!, logoHeight!);
        ctx.restore();
        resolve(true);
      };
      logo.onerror = () => {
        reject(new Error('Logo image load error'));
      };
      logo.src = logoImage;
    });
  }

  private async drawImage(
    ctx: CanvasRenderingContext2D,
    image: HTMLImageElement,
    dx: number,
    dy: number,
    dWidth: number,
    dHeight: number,
  ) {
    ctx.drawImage(image, dx, dy, dWidth, dHeight);
    return Promise.resolve();
  }

  private isInPositionZone(row: number, col: number, moduleCount: number) {
    const positioningZones = [
      { row: 0, col: 0 },
      { row: 0, col: moduleCount - 7 },
      { row: moduleCount - 7, col: 0 },
    ];
    return positioningZones.some(
      ({ row: r, col: c }) => row >= r && row < r + 7 && col >= c && col < c + 7,
    );
  }

  private isInAlignmentZone(row: number, col: number, moduleCount: number) {
    const alignmentZones = [
      { row: moduleCount - 10, col: moduleCount - 10 },
      { row: moduleCount - 4, col: moduleCount - 4 },
    ];

    if (row > alignmentZones[0].row && row < alignmentZones[1].row) {
      return col > alignmentZones[0].col && col < alignmentZones[1].col;
    }
    return false;
  }
}
