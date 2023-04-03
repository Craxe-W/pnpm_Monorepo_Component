import React, { useEffect, useState } from 'react';
import { DemoBlock } from 'demos';
import { ActivityRule } from 'component-example';

export default () => {
  const [visible, setVisible] = useState(false);
  const [visible1, setVisible1] = useState(false);
  const rule =
    '1、活动仅限永辉超市线上永辉生活APP渠道内的红标、绿标、到家、仓储业态所有门店皆可参与；\n2、选择希望参与的活动奖励，发起任务邀请好友助力，助力人数达到要求后，发起人即可获得对应奖励；\n3、每位用户发起同一个助力活动的上限为1次，每个助力券活动一个用户只能助力1次，活动期间内最多可为好友助力3次；\n4、在规定时间完成活动，奖励将以券的形式由系统自动发放参与的';
  return (
    <>
      <DemoBlock title='基本用法'>
        <ActivityRule
          visible={visible}
          ruleTitle='活动规则'
          activityRule={rule}
          onClick={() => setVisible(true)}
          onClickButton={() => setVisible(false)}
          onMaskClick={() => setVisible(false)}
        />
      </DemoBlock>
      <DemoBlock title='两行规则'>
        <ActivityRule
          visible={visible1}
          position='twoLine'
          ruleTitle='活动规则'
          activityRule={rule}
          onClick={() => setVisible1(true)}
          onClickButton={() => setVisible1(false)}
          onMaskClick={() => setVisible1(false)}
        />
      </DemoBlock>
      <DemoBlock title='一列规则'>
        <ActivityRule
          visible={visible1}
          position='oneList'
          ruleTitle='活动规则'
          activityRule={rule}
          onClick={() => setVisible1(true)}
          onClickButton={() => setVisible1(false)}
          onMaskClick={() => setVisible1(false)}
        />
      </DemoBlock>
    </>
  );
};
