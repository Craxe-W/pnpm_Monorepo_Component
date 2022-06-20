/**
 *
 * @param size 尺寸
 * @param designWidth 设计图宽度
 * @returns 换算成rem单位
 */
export function pxTransform(size: any, designWidth: number) {
  // eslint-disable-next-line radix
  return `${Math.ceil((((Number.parseFloat(size) / 32) * 750) / designWidth) * 10_000) / 10_000}rem`;
}

/**
 *
 * @param size 尺寸
 * @param designWidth 设计图宽度
 * @returns 根据可视区宽度换算成px单位
 */
export function ratioTransform(size: number, designWidth: number) {
  const ratio = window.screen.width / designWidth;
  return size * ratio;
}
