const convertToPng = (blob: Blob) => {
  return new Promise<Blob>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d')!;
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        canvas.toBlob((res) => {
          if (res) {
            resolve(res);
          } else {
            reject(new Error('convert to png error'));
          }
        }, 'image/png');
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(blob);
  });
};

export const copyToClipBoard = async (content: string | Blob) => {
  if (typeof content === 'string') {
    return navigator.clipboard.writeText(content);
  }
  if (content.type.startsWith('image')) {
    let blob = content;
    if (content.type !== 'image/png') {
      // Chrome 不支持非 image/png 的 blob
      blob = await convertToPng(content);
    }
    return navigator.clipboard.write([
      new ClipboardItem({
        'image/png': blob,
      }),
    ]);
  }
  throw new Error('unsupported type!');
};
