/* eslint-disable no-return-assign */
/**
 * 获取我URL上指定的某个key的值
 * @param name string 指定Key的内容
 * @param url string  要查找的URL
 * @returns string
 */
export const getUrlQuery = (name: string, url?: string) => {
  let selfUrl = url;

  let selfName = name;

  if (!selfUrl) {
    selfUrl = window.location.href;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  selfName = selfName.replace(/[[\\\]]/g, '\\$&');

  const regex = new RegExp(`[?&]${selfName}(=([^&#]*)|&|#|$)`);
  const results = regex.exec(selfUrl);

  if (!results) return null;

  if (!results[2]) return '';

  return decodeURIComponent(results[2].replace(/\+/g, ' '));
};

/**
 * 获取url上qury参数
 * @param urlStr string
 * @returns object
 */

export const getUrlVars = (urlStr: string) => {
  const vars: any = {};
  const reg = /[&?]+([^&=]+)=([^&]*)/gi;
  urlStr.replace(reg, (m, key, value) => {
    return (vars[key] = decodeURIComponent(value));
  });
  return vars;
};

/**
 * json格式转为query字符串
 * @param json json格式
 */
export const jsonToQueryString = (json: { [x: string]: any }) => {
  const obj = Object.keys(json);
  if (obj.length === 0) {
    return '';
  }
  return Object.keys(json)
    .map((key) => {
      const value = json[key];
      if (Object.prototype.toString.call(value) === '[object Object]') {
        return `${key}=${JSON.stringify(value)}`;
      }
      return `${key}=${value}`;
    })
    .join('&');
};
