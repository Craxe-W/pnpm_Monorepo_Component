/**
 * 将A方法的内容 拷贝到B方法上
 * @param component
 * @param properties
 * @returns
 */
export function attachPropertiesToComponent<C, P extends Record<string, any>>(component: C, properties: P): C & P {
  const ret = component as any;
  for (const key in properties) {
    // eslint-disable-next-line no-prototype-builtins
    if (properties.hasOwnProperty(key)) {
      ret[key] = properties[key];
    }
  }
  return ret;
}
