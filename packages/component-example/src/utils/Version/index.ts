/*
 APP版本好比较
 * @param {String} v1 getApp().systemInfo.SDKVersion
 * @param {String} v2 版本号
 * @returns number  1:大于 v2 版本号，0:等于 v2 版本号，-1:小于 v2 版本号
 */
export function compareVersion(v11: string, v22: string): 1 | 0 | -1 {
  const v1 = v11.split('.');
  const v2 = v22.split('.');
  const len = Math.max(v1.length, v2.length);

  while (v1.length < len) {
    v1.push('0');
  }
  while (v2.length < len) {
    v2.push('0');
  }

  for (let i = 0; i < len; i++) {
    const num1 = Number.parseInt(v1[i], 10);
    const num2 = Number.parseInt(v2[i], 10);

    if (num1 > num2) {
      return 1;
    }
    if (num1 < num2) {
      return -1;
    }
  }

  return 0;
}
