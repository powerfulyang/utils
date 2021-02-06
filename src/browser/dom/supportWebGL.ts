let result: boolean | null = null;
export const isSupportWebGL = (): boolean => {
  if (result !== null) {
    return result;
  }
  try {
    const canvas = document.createElement('canvas');
    // Get WebGLRenderingContext from canvas element.
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    // Report the result.
    result = !!(gl && gl instanceof WebGLRenderingContext);
    return result;
  } catch {
    return false;
  }
};
