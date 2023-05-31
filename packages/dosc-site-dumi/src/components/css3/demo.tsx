import React from 'react';
import { DemoBlock } from '../../demos';

import './index.less';

export default () => {
  return (
    <React.Fragment>
      <DemoBlock title='券豁口效果'>
        <div className='coupon-box'></div>
      </DemoBlock>
      <DemoBlock title='图片豁口效果'>
        <div className='coupon'>
          <div className='coupon-box2'></div>
        </div>
      </DemoBlock>
    </React.Fragment>
  );
};
