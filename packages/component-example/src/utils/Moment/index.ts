/**
 *
 * @param time 时间
 * @param rule 格式化规则
 * @returns 返回处理后时间
 */
export function formatTime(time = Date.now(), rule = 'YYYY-MM-DD HH:mm:ss') {
  const date: Date = String(time)?.length === 10 ? new Date(Number(time) * 1000) : new Date(Number(time));
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  return rule.replace(/Y{2,4}|M{1,2}|D{1,2}|d{1,4}|H{1,2}|m{1,2}|s{1,2}/g, (match) => {
    switch (match) {
      case 'YY':
        return String(year).slice(-2);
      case 'YYYY':
        return String(year);
      case 'M':
        return String(month);
      case 'MM':
        return String(month).padStart(2, '0');
      case 'D':
        return String(day);
      case 'DD':
        return String(day).padStart(2, '0');
      case 'H':
        return String(hour);
      case 'HH':
        return String(hour).padStart(2, '0');
      case 'm':
        return String(minute);
      case 'mm':
        return String(minute).padStart(2, '0');
      case 's':
        return String(second);
      case 'ss':
        return String(second).padStart(2, '0');
      default:
        return match;
    }
  });
}

/**
 *
 * @param surplus 倒计时(毫秒)
 * @param rule 格式化规则, 支持格式DD:HH:mm:ss, DD-天数 HH-小时 mm-分钟 ss-秒数
 * @returns 返回处理后倒计时对象
 */
export function countDownTimeToObject(surplus: number, rule = 'HH:mm:ss') {
  let result: any = {};
  const day = 86_400_000;
  const hour = 3_600_000;
  const minute = 60_000;
  const second = 1000;
  const timeUnitArray = rule.split(':');

  for (const unit of timeUnitArray) {
    // eslint-disable-next-line default-case
    switch (unit) {
      case 'DD': {
        result = { ...result, DD: String(Math.floor(surplus / day)).padStart(2, '0') };
        break;
      }
      case 'HH': {
        const dd = Object.prototype.hasOwnProperty.call(result, 'DD') ? Number(result.DD) : 0;
        result = { ...result, HH: String(Math.floor((surplus - day * dd) / hour)).padStart(2, '0') };
        break;
      }
      case 'mm': {
        const dd = Object.prototype.hasOwnProperty.call(result, 'DD') ? Number(result.DD) : 0;
        const hh = Object.prototype.hasOwnProperty.call(result, 'HH') ? Number(result.HH) : 0;
        result = { ...result, mm: String(Math.floor((surplus - day * dd - hour * hh) / minute)).padStart(2, '0') };
        break;
      }
      case 'ss': {
        const dd = Object.prototype.hasOwnProperty.call(result, 'DD') ? Number(result.DD) : 0;
        const hh = Object.prototype.hasOwnProperty.call(result, 'HH') ? Number(result.HH) : 0;
        const mm = Object.prototype.hasOwnProperty.call(result, 'mm') ? Number(result.mm) : 0;
        result = {
          ...result,
          ss: String(Math.floor((surplus - day * dd - hour * hh - minute * mm) / second)).padStart(2, '0'),
        };
        break;
      }
    }
  }

  return result;
}
