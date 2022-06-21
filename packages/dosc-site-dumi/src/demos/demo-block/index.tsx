import React, { FC } from 'react';

import './index.less';

interface Props {
  title: string;
  padding?: string;
  border?: string;
  background?: string;
  children?: any;
}

const classPrefix = 'market-demo-block';

export const DemoBlock: FC<Props> = (props) => {
  return (
    <div className={classPrefix}>
      <div className={`${classPrefix}-title`}>{props.title}</div>
      <div
        className={`${classPrefix}-main`}
        style={{
          padding: props.padding,
          background: props.background,
          border: props.border,
        }}
      >
        {props.children}
      </div>
    </div>
  );
};

DemoBlock.defaultProps = {
  padding: '12px 12px',
  background: '#ffffff',
};
