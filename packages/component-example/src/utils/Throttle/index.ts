interface Options {
  /**
   * 指定调用在节流开始前
   */
  leading?: boolean;
  /**
   * 指定调用在节流结束后
   */
  trailing?: boolean;
}

const Throttle = <T = any, P = any>(func: (any: any) => void, wait: number, options?: Options) => {
  let timeout: null | NodeJS.Timeout;
  let context: any;
  let args: any;
  let previous = 0;
  const option = options || {};
  const later = () => {
    previous = option.leading === false ? 0 : Date.now();
    timeout = null;
    func.apply(context, args);
    if (!timeout) {
      args = null;
      context = args;
    }
  };

  function throttled(this: T, ...params: P[]) {
    const now = Date.now();
    if (!previous && option.leading === false) {
      previous = now;
    }
    const remaining = wait - (now - previous);
    // eslint-disable-next-line unicorn/no-this-assignment
    context = this;
    // eslint-disable-next-line prefer-rest-params
    args = params;
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      func.apply(context, args);
      if (!timeout) {
        args = null;
        context = args;
      }
    } else if (!timeout && option.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
  }
  return throttled;
};

export default Throttle;
