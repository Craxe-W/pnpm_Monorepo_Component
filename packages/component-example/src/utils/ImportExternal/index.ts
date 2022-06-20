/* eslint-disable no-useless-escape */
/* eslint-disable max-len */
/**
 * getJS 加载 js
 * @param url js链接
 * @param id 唯一id
 * @param options script attribute
 * @param retry 加载失败重试，默认3次，0关闭
 */

export function importJs(
  src: string,
  id: string,
  options?: Partial<Omit<HTMLScriptElement, 'id' | 'src' | 'type'>>,
  retry = 3,
): any {
  return new Promise(function (resolve, reject) {
    const scriptList = document.scripts as any;

    for (const v of scriptList) {
      if (v.getAttribute('id') === id) {
        resolve(`loaded: ${src}`);
        return;
      }
    }

    // 这里 script 上存在其他属性 但是暂时不知道是啥  所以临时用any进行替代
    const script = document.createElement('script') as any;
    script.type = 'text/javascript';
    script.id = id;

    if (options) {
      for (const key of Object.keys(options)) {
        script.setAttribute(key, options[key]);
      }
    }

    if (script.readyState) {
      // IE
      script.addEventListener('readystatechange', function () {
        if (script.readyState === 'loaded' || script.readyState === 'complete') {
          script.addEventListener('readystatechange', () => {});
          resolve(`success: ${src}`);
        }
      });
    } else {
      // Others
      script.addEventListener('load', function () {
        resolve(`success: ${src}`);
      });
    }

    script.addEventListener('error', function () {
      reject(new Error(`${src} load error!`));
    });

    script.src = src;
    document.head.append(script);
  }).catch((error) => {
    // eslint-disable-next-line unicorn/prefer-query-selector
    const script = document.getElementById(id);
    if (retry > 0 && script) {
      script.remove();
      return importJs(src, id, options, retry - 1);
    }
    throw error;
  });
}
/**
 * getCSS 加载 css
 * @param href css 链接
 * @param options link attribute
 * @param retry 加载失败重试，默认3次，0关闭
 */
export function importCss(href: string, id: string, options?: Omit<HTMLLinkElement, 'href'>, retry = 3): any {
  return new Promise(function (resolve, reject) {
    let useOnload = true;
    const link: HTMLLinkElement = document.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.id = id;

    if (options) {
      for (const key of Object.keys(options)) {
        link.setAttribute(key, options[key]);
      }
    }

    const engine =
      window.navigator.userAgent.match(
        /Trident\/([^ ;]*)|AppleWebKit\/([^ ;]*)|Opera\/([^ ;]*)|rv:([^ ;]*)(.*?)Gecko\/([^ ;]*)|MSIE\s([^ ;]*)|AndroidWebKit\/([^ ;]*)/,
      ) || 0;
    if (engine[2] || engine[8] || 'WebkitAppearance' in document.documentElement.style) {
      useOnload = false;
    }

    link.addEventListener('error', function () {
      reject(new Error(`${href} load error!`));
    });

    if (useOnload) {
      link.addEventListener('load', function () {
        resolve(`success: ${href}`);
      });
    } else {
      const loadInterval = setInterval(function () {
        for (let i = 0; i < document.styleSheets.length; i++) {
          const sheet = document.styleSheets[i];
          if (sheet.href === link.href) {
            clearInterval(loadInterval);
            resolve(`success: ${href}`);
          }
        }
      }, 10);
    }
    link.href = href;
    document.head.append(link);
  }).catch((error) => {
    // eslint-disable-next-line unicorn/prefer-query-selector
    const link = document.getElementById(id);
    if (retry > 0 && link) {
      link.remove();
      return importCss(href, id, options, retry - 1);
    }
    throw error;
  });
}
