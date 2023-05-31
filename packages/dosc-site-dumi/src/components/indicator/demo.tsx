import React from 'react';

import { DemoBlock } from '../../demos';
import { Indicator } from 'component-example';

export default () => (
  <>
    <DemoBlock title='基本用法'>
      <Indicator />
    </DemoBlock>

    <DemoBlock title='尺寸'>
      <Indicator size={50} />
    </DemoBlock>

    <DemoBlock title='颜色'>
      <Indicator color='blue' size={50} />
    </DemoBlock>

    <DemoBlock title='背景颜色'>
      <Indicator bgColor='yellow' size={50} />
    </DemoBlock>

    <DemoBlock title='粗细'>
      <Indicator borderWidth={10} size={50} />
    </DemoBlock>
  </>
);
