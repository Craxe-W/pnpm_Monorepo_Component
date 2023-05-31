import React from 'react';
import { DemoBlock } from '../../demos';
import finger from '@/assets/icon_finger.png';
import './index.less';

export default () => {
  return (
    <React.Fragment>
      <DemoBlock title='手势点击效果'>
        <div className='container'>
          <div className='card'>1</div>
          <div className='card'>2</div>
          <div className='card'>3</div>
          <div className='animationClick'>
            <img src={finger} alt='手势' />
          </div>
        </div>
      </DemoBlock>
    </React.Fragment>
  );
};
