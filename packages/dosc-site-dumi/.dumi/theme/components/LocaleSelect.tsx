import type { FC } from 'react';
import { useContext, useEffect } from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { history } from 'dumi';
import { context } from 'dumi/theme';
import './LocaleSelect.less';

const LocaleSelect: FC<{ location: any }> = ({ location }) => {
  const { locale, config } = useContext(context);

  useEffect(() => {
    const currPath = window.location.hash.split('#')[1];
    const pathList = [];
    const menus = config.menus[locale];
    for (const attr in menus) {
      const v = menus[attr];
      for (let i = 0; i < v.length; i++) {
        if (v[i].path) {
          pathList.push(v[i].path);
        } else {
          const children = v[i].children;
          if (children.length) {
            for (let j = 0; j < children.length; j++) {
              pathList.push(children[j].path);
            }
          }
        }
      }
    }
    pathList.includes(currPath) ? history.replace(currPath) : history.replace('/components/animation_click');
  }, []);

  return null;
};

export default LocaleSelect;
