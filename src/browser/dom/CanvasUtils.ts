export class CanvasUtils {
  static getMinFontSize() {
    const ctx = document.createElement('canvas').getContext('2d')!;
    // start from 20
    let size = 20;
    // two sizes to measure
    let hanWidth = null;
    let mWidth = null;

    while (size) {
      ctx.font = `${size}px sans-serif`;
      if (ctx.measureText('\uFF37').width === hanWidth && ctx.measureText('m').width === mWidth) {
        return size + 1;
      }
      hanWidth = ctx.measureText('\uFF37').width;
      mWidth = ctx.measureText('m').width;
      size--;
    }
    return 0;
  }
}
