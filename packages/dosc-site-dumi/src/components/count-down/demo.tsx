import React, { useRef } from 'react';

import { DemoBlock } from 'demos';
import { Space, Button, Toast } from 'antd-mobile';
import { PlayOutline, StopOutline, UndoOutline } from 'antd-mobile-icons';
import { CountDown } from 'component-example';
import { CountDownRef } from 'component-example/es/components/count-down/count-down';
import { CurrentTime } from 'component-example/es/hooks/useCountDown';

import './index.less';

export default () => {
  const countDown = useRef<CountDownRef>(null);

  const start = () => {
    console.log('start', start);

    countDown.current?.start();
  };

  const pause = () => {
    console.log('pause', pause);

    countDown.current?.pause();
  };

  const reset = () => {
    console.log('reset: ', reset);

    countDown.current?.reset();
  };

  return (
    <>
      <DemoBlock title='基本用法'>
        <CountDown time={30 * 60 * 60 * 1000} />
      </DemoBlock>

      <DemoBlock title='自定义格式'>
        <CountDown time={30 * 60 * 60 * 1000} format='DD 天 HH 时 mm 分 ss 秒' />
      </DemoBlock>

      <DemoBlock title='毫秒级渲染'>
        <CountDown millisecond time={30 * 60 * 60 * 1000} format='HH:mm:ss:SS' />
      </DemoBlock>

      <DemoBlock title='自定义样式'>
        <CountDown
          time={30 * 60 * 60 * 1000}
          render={(props: CurrentTime) => {
            return (
              <>
                <span className='block'>{props.hours}</span>
                <span className='colon'>:</span>
                <span className='block'>{props.minutes}</span>
                <span className='colon'>:</span>
                <span className='block'>{props.seconds}</span>
              </>
            );
          }}
        />
      </DemoBlock>

      <DemoBlock title='手动控制'>
        <CountDown
          ref={countDown}
          millisecond
          time={3 * 1000}
          autoStart={false}
          format='ss:SSS'
          finish={() => Toast.show('倒计时结束')}
        />
        <Space style={{ marginTop: '10px' }}>
          <Button color='primary' size='mini' onClick={start}>
            <Space>
              <PlayOutline />
              <span>开始</span>
            </Space>
          </Button>
          <Button color='primary' size='mini' onClick={pause}>
            <Space>
              <StopOutline />
              <span>暂停</span>
            </Space>
          </Button>
          <Button color='primary' size='mini' onClick={reset}>
            <Space>
              <UndoOutline />
              <span>重置</span>
            </Space>
          </Button>
        </Space>
      </DemoBlock>
    </>
  );
};
