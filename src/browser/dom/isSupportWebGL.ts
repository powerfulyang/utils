export const isSupportWebGL: { (): boolean; value: null | boolean } = (): boolean => {
  if (isSupportWebGL.value !== null) {
    return isSupportWebGL.value;
  }
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    isSupportWebGL.value = gl && gl instanceof WebGLRenderingContext;
    return Boolean(isSupportWebGL.value);
  } catch {
    return false;
  }
};

isSupportWebGL.value = null;
