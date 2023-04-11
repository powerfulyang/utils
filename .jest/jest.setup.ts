// ---------------------------------------------------------------------
// mock Image
const _Image = jest.fn(
  () =>
    ({
      set src(src: string) {
        this.onload?.();
      },
    } as unknown as HTMLImageElement),
);

globalThis.Image = _Image;
