/**
 *
 * @returns 滚动条在Y轴上的滚动距离
 */
export function getScrollTop(): number {
  return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
}

/**
 *
 * @returns 文档的总高度
 */
export function getScrollHeight(): number {
  return document.documentElement.scrollHeight || document.body.scrollHeight;
}

/**
 * 浏览器视口的高度
 * @returns
 */
export function getWindowHeight(): number {
  return window.innerHeight || document.documentElement.clientHeight;
}
