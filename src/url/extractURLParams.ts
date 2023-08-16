interface Options {
  /**
   * @description 递归处理的 key 列表
   * @default []
   */
  recursiveKeys?: string[];
  /**
   * @description 优先排序的 key 列表
   * @default []
   */
  favoriteKeys?: string[];
  /**
   * @description 默认解析包含 & 或者 = 的 value
   * @default false
   */
  recursive?: boolean;
}

/**
 * @description 解析 url 中的参数
 */
export const extractURLParams = (url: string, options?: Options) => {
  const { recursiveKeys = [], favoriteKeys = [], recursive = true } = options || {};
  // 处理 url 中的 search，anchor，或者直接传入的 search
  const search = url.split('?')[1] || url.split('#')[1] || url;
  if (!(search.includes('&') || search.includes('='))) {
    return new Map<string, string>();
  }
  const searchParams = new URLSearchParams(search);
  const params: { [key: string]: string } = {};
  // 递归处理, 使用 stack 模拟递归
  const stack: [string, string][] = Array.from(searchParams.entries()).reverse();
  while (stack.length) {
    const [key, value] = stack.pop()!;
    if (
      recursiveKeys.includes(key) ||
      ((value.includes('&') || value.includes('=')) && recursive)
    ) {
      const _search = value.split('?')[1] || value.split('#')[1] || value;
      const _searchParams = new URLSearchParams(_search);
      stack.push(...Array.from(_searchParams.entries()).reverse());
    }
    params[key] = value;
  }
  // 按照 favoriteKeys 的顺序对 params 进行排序
  const map = new Map<string, string>();
  favoriteKeys.forEach((key) => {
    if (Object.hasOwn(params, key)) {
      map.set(key, params[key]);
    }
  });
  Object.keys(params).forEach((key) => {
    if (!map.has(key)) {
      map.set(key, params[key]);
    }
  });
  return map;
};
